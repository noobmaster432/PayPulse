const User = require("../models/userModal.js");
const Account = require("../models/accountsModal.js");
const z = require("zod");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../utils");

// -------------------------------- Sign In --------------------------------
const register = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const signUpBody = z.object({
    username: z.string().min(3).max(30).email(),
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
  });

  const { success } = signUpBody.safeParse(req.body);
  if (!success) {
    return res.status(401).json({ message: "Incorrect inputs" });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(401).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    // -------------------------------- Create new Account --------------------------------
    await Account.create({
      userId: newUser._id,
      balance: 1 + Math.random() * 10000,
    });
    // ------------------------------------------------------------------------------------

    const token = jwtSign({ id: newUser._id });

    res
      .status(200)
      .json({ message: "User created successfully!", token: token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------------- Sign Up --------------------------------
const login = async (req, res) => {
  const { username, password } = req.body;
  const loginBody = z.object({
    username: z.string().min(3).max(30).email(),
    password: z.string().min(6),
  });

  const { success } = loginBody.safeParse(req.body);
  if (!success) {
    return res.status(401).json({ message: "Incorrect inputs" });
  }

  try {
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwtSign({ id: userExists._id });

    res.status(200).json({ message: "Logged in successfully!", token, user: userExists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------------- Edit User Details --------------------------------
const editUser = async (req, res) => {
  const userId = req.userId;

  const editUserBody = z.object({
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
    password: z.string().min(6).optional(),
  });

  const { success } = editUserBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(411).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------------- Filter User --------------------------------
const searchUser = async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  res.status(200).json({
    users: users
      .filter((user) => user.id !== req.userId) // Exclude the current user
      .map((user) => ({
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
  });
};

module.exports = { register, login, editUser, searchUser };
