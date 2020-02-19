import connectToDatabase from "../../../services/connect-to-database";
import Item from "../../../models/Item";

export default async (req, res) => {
  connectToDatabase();

  const items = await Item.find();

  res.json(items);
};
