import Contact from "../models/contact.model.js";
import * as returnResponse from "../helpers/response.js";

export const getContacts = async (req, res) => {
  try {
    const { _id } = req.profile;
    const contacts = await Contact.find({ user_id: _id });
    console.log(contacts);
    res.status(200).json(returnResponse.success(contacts));
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};
export const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const contact = await Contact.findById(id);
    res.status(200).json(returnResponse.success(contact));
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};

export const createContact = async (req, res) => {
  try {
    const { _id } = req.profile;
    const { first_name, last_name, email, contact_no } = req.body;
    if (!first_name || !last_name || !contact_no)
      return res
        .status(400)
        .json(returnResponse.error("Enter all required fields!! "));
    await Contact.create({
      first_name,
      last_name,
      email,
      contact_no,
      user_id: _id,
    });
    res.status(200).json(returnResponse.success("created successfully!"));
  } catch (e) {
    res.status(400).json(returnResponse.error(e));
  }
};
