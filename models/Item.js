import Mongoose from "mongoose";

const Item =
  Mongoose.models.Item ||
  Mongoose.model("Item", {
    title: String,
    complete: Boolean,
    reading: Boolean,
    link: String
  });

export default Item;
