const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const register = async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    countryCode: req.body.countryCode,
    mobNumber: req.body.mobNumber,
    birthDate: new Date(req.body.birthDate),
    role: req.body.role,
  });

  try {
    const users = await User.find({ email: req.body.email });

    if (users.length == 0) {
      const data = await user.save();
      const token = await user.generateToken();
      return res.status(200).json({ data, token });
    }

    res.status(400).send("email address already exist");
  } catch (err) {
    res.status(err.status || 500).json({
      message: err?.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user?.email) {
      const passwordMatched = await bcrypt.compare(req.body.password, user.password);
      if (passwordMatched) {
        const token = await user.generateToken();
        return res.status(200).json({ message: "successfully login !!", token });
      }
      return res.status(400).json({ message: "password not matched" });
    }
    return res.status(400).json({ message: "email not found" });
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const status = async (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const reGenerateToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (user) {
      user.tokens = user.tokens.filter((token) => token.token !== refresh_token);
      await user.save();
    }
    const token = await user.generateToken();

    res.status(201).json({ token });
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.user.save()
      res.status(200).json({
        message:"logout successfully"
      })
  } catch (e) {
      res.status(500).send()
  }
}

const getAllUsers =  async (req, res) => {
  try {
    const users = await User.find({
      role:"user"
    })  
    res.status(200).json(users)
  } catch (e) {
      res.status(500).json({
        message:"something went wrong"
      })
  }
}

module.exports = {
  register,
  login,
  status,
  reGenerateToken,
  logoutUser,
  getAllUsers
};
