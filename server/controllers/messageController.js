const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfuly." });
    return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};

// module.exports.getMyConversations = async (req, res, next) => {
//   try {
//     const { from, tos } = req.body;
//     const conversations = [];
//     tos.map(async (to) => {
//       // const convertation = await messageModel
//       // .find({
//       //   sender: {
//       //     $all: [from, to],
//       //   },
//       // })
//       // .sort({ updatedAt: 1 })
//       // .limit(1);

//       const convertation = await messageModel
//       .aggregate([
//         {
//           $lookup:
//           {
//             from: 'messages',
//             localField: 'users',
//             foreignField: '_id',
//             as: 'users_info'
//           }
//         },
//         {
//           $project: {
//             users_info.username: 1,

//           }
//         }
//       ]);

//       conversations = [...conversations, convertation];
//     })
//     res.json(conversations);
//   } catch (error) {
//     next(error);
//   }
// };
