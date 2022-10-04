const {
  register,
  setAvatar,
  getAllUsers,
  searchUser,
  addSentInvitation,
} = require("../controllers/userController");
const { login } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.post("/invite", addSentInvitation);
router.get("/allusers/:id", getAllUsers);
router.get("/search/:keyword", searchUser);

module.exports = router;
