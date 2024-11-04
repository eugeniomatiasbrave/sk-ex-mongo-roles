import mongoose from "mongoose";

export const ROLES = ["user", "admin", "moderator"];

const collection = "Role";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const roleModel = mongoose.model(collection, schema);

export default roleModel;
