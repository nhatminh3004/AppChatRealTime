const mongoose = require("mongoose");
const { listenerCount } = require("../model/conversationModel");
const conversationModel = require("../model/conversationModel");
const messageModel = require("../model/messageModel");
const userModel = require("../model/userModel");
const User = require("../model/userModel");

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { from, message, conversationId } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      sender: from,
    });
    if (data) {
      let newConversation = await conversationModel.findByIdAndUpdate(
        conversationId,
        {
          lastMessageId: data._id,
          $push: { messages: data._id },
        }
      );
      if (newConversation) {
        let users_info = [];
        for (var j = 0; j < newConversation.members.length; j++) {
          const user = await userModel.findOne({
            _id: newConversation.members[j].userId,
          });
          users_info = [...users_info, user];
        }
        const lastMessage = await messageModel.findOne({
          _id: newConversation.lastMessageId,
        });
        newConversation = {
          conversation: newConversation,
          users_info,
          lastMessage,
        };
        return res.json(newConversation);
      } else {
        return res.json({
          msg: "Create conversation fail",
        });
      }
    }
    return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { conversationId, userId } = req.body;
    const conversation = await conversationModel.findOne({
      _id: conversationId,
    });
    if (conversation) {
      let projectMessages = [];
      for (var i = 0; i < conversation.messages.length; i++) {
        const message = await messageModel.findOne({
          _id: conversation.messages[i],
        });
        projectMessages = [
          ...projectMessages,
          {
            fromSelf: message.sender.toString() === userId,
            message: message.message.text,
          },
        ];
      }
      return res.json(projectMessages);
    }
    return res.json([]);
  } catch (error) {
    next(error);
  }
};

module.exports.getMyConversations = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const conversations = await conversationModel
      .find({ "members.userId": userId })
      .sort({ updatedAt: -1 });
    // console.log(conversations);
    let newConversations = [];
    if (conversations.length > 0) {
      // newConversations = [];

      for (var i = 0; i < conversations.length; i++) {
        let users_info = [];
        let lastMessage = {};
        // console.log(conversation.members);

        for (var j = 0; j < conversations[i].members.length; j++) {
          if (!conversations[i].members[j].userId.equals(userId)) {
            const user = await userModel.findOne({
              _id: conversations[i].members[j].userId,
            });
            users_info = [...users_info, user];
          }
        }
        const message = await messageModel.findOne({
          _id: conversations[i].lastMessageId,
        });
        lastMessage = { ...lastMessage, message };
        if (lastMessage.message) {
          newConversations = [
            ...newConversations,
            { conversation: conversations[i], users_info, lastMessage },
          ];
        }
      }
    }
    console.log(newConversations);

    res.json(newConversations);
  } catch (error) {
    next(error);
  }
};

module.exports.createConversation = async (req, res, next) => {
  try {
    const { searchResultId, myId } = req.body;
    let conversation = await conversationModel
      .findOne({ "members.userId": searchResultId, "members.userId": myId })
      .sort({ updatedAt: -1 });
    if (conversation) {
      let users_info = [];
      for (var j = 0; j < conversation.members.length; j++) {
        if (conversation.members[j].userId !== myId) {
          const user = await userModel.findOne({
            _id: conversation.members[j].userId,
          });
          users_info = [...users_info, user];
        }
      }
      const lastMessage = await messageModel.findOne({
        _id: conversation.lastMessageId,
      });
      conversation = {
        conversation,
        users_info,
        lastMessage,
      };
      return res.json(conversation);
    } else {
      let newConversation = await conversationModel.create({
        members: [
          { userId: myId, lastView: Date.now() },
          { userId: searchResultId },
        ],
      });
      if (newConversation) {
        let users_info = [];
        for (var j = 0; j < newConversation.members.length; j++) {
          if (newConversation.members[j].userId !== myId) {
            const user = await userModel.findOne({
              _id: newConversation.members[j].userId,
            });
            users_info = [...users_info, user];
          }
        }
        newConversation = {
          conversation: newConversation,
          users_info,
        };
        return res.json(newConversation);
      } else {
        return res.json({
          msg: "Create conversation fail",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
