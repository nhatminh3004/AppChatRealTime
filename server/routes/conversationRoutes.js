const {
  sendMessage,
  getAllMessage,
  getMyConversations,
  createConversation,
} = require("../controllers/conversationController");

const router = require("express").Router();

router.post("/sendMessage/", sendMessage);
router.get("/myConversations/:id", getMyConversations);
router.post("/createConversation/", createConversation);
router.post("/getmsg", getAllMessage);

module.exports = router;
