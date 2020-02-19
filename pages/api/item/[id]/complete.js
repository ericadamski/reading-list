import connectToDatabase from "../../../../services/connect-to-database";
import Item from "../../../../models/Item";

export default async (req, res) => {
  connectToDatabase();

  const { complete } = req.body;

  const item = await Item.findOne({ _id: req.query.id });

  item.complete = complete;

  await item.save();

  res.json(item);
};
