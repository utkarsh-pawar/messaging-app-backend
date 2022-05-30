import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message_body: { type: String, required: true },
    sent_date: { type: String },
    otp: { type: Number },
    send_to: { type: String },
    send_from: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

export default Message;
