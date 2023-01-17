const User = require("../models/userModel");
const brcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    // console.log("@@@@@@@", req.body);
    const { password, userName, email } = req.body;

    const usernameCheck = await User.findOne({ userName });
    // console.log("finddddd", usernameCheck);
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await brcrypt.hash(password, 10);
    let user = await User.create({
      email,
      userName: userName,
      password: hashedPassword,
    });
    delete user.password;
    // console.log("sending user", user);
    return res.json({
      status: true,
      user: {
        email: user.email,
        userName: user.userName,
        isAvatarImageSet: user.isAvatarImageSet,
        _id: user._id,
        avatarImage: user.avatarImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // console.log("@@@@@@@", req.body);
    const { password, userName } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    const isPasswordValid = brcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }

    return res.json({
      status: true,
      user: {
        email: user.email,
        userName: user.userName,
        isAvatarImageSet: user.isAvatarImageSet,
        _id: user._id,
        avatarImage: user.avatarImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsersByQuery = async (req, res, next) => {
  try {
    const searchedQuery = req.query.name;
    // console.log(searchedQuery);
    const users = await User.find({
      userName: { $regex: searchedQuery, $options: "$i" },
    }).select("-password");

    if (!users) {
      return res.json({ msg: "User doesn't exist", status: false });
    }

    return res.json({
      status: true,
      users: [...users],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
