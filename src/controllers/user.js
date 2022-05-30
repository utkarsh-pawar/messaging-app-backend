import * as returnResponse from "../helpers/response.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";
import validator from "validator";

export const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const isAlreadyUser = await User.findOne({ email });
    if (isAlreadyUser)
      return res
        .status(400)
        .json(
          returnResponse.error(
            "An account with the entered email address already exists.!!"
          )
        );

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashedPassword, email });
    res.status(200).json(returnResponse.success(user));
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json(returnResponse.error("Enter all the required fields"));
    if (!validator.isEmail(email))
      return res.status(400).json(returnResponse.error("Enter valid email address"));
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json(
          returnResponse.error("No User with entered email address exists")
        );

    //compared hashed password without decrypting
    const isCompared = await bcrypt.compare(password, user.password);
    if (!isCompared)
      return res
        .status(400)
        .json(returnResponse.error("Invalid Credentials!!"));

    //generating token for later API authorization
    const token = jwt.sign({ email: user.email }, config.JWT_SECRET);
    res.status(200).json(
      returnResponse.success({
        email: user.email,
        username: user.name,
        token,
      })
    );
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};
