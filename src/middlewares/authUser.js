import jwt from "jsonwebtoken";
import * as returnResponse from "../helpers/response.js";
import config from "../configs/config.js";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const token = header?.split(" ")[1];

    if (!token)
      return res.status(401).send("Access Denied: No Token Provided!");

    const verified = jwt.verify(token, config.JWT_SECRET);
    let user = await User.findOne({ email: verified.email });
    req.profile = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};

export default auth;
