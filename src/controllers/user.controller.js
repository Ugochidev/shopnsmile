const User = require("../models/user.model");



//  getting all Users
const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().select(
      "userId firstName lastName email phoneNumber dateCreated"
    );
    return res.status(200).json({
      message: "Get Users sucessfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await User.findOne({ userId });
    console.log(user);
    return res.status(200).json({
      message: "Fetched sucessfully",
      // user,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      Email: user.email,
      Phonenumber: user.phoneNumber,
      Date_joined: user.createdAt,
      Role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  counting all registered user
const countUsers = async (req, res, next) => {
  try {
    const usercount = await User.countDocuments();
    return res.status(200).json({ message: "Users counted", usercount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSingleUser,
  getAllUsers,
  countUsers,
};
