const {
  register,
  login,
  getUsersByQuery,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", getUsersByQuery);

module.exports = router;
