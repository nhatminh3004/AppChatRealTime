const {
  register,
  setAvatar,
  getAllUsers,
  searchUser,
  addSentInvitation,
  acceptFriend,
  denyAddFriend,
} = require("../controllers/userController");
const { login } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.post("/invite", addSentInvitation);
router.post("/acceptFriend", acceptFriend);
router.post("/denyAddFriend", denyAddFriend);
router.get("/allusers/:id", getAllUsers);
router.post("/search", searchUser);

module.exports = router;
