import fetch from "isomorphic-unfetch";

export default async (req, res) => {
  const { url } = req.query;

  const response = await fetch(
    `https://opengraph.io/api/1.1/site/${url}?app_id=${process.env.OG_KEY}`
  );

  console.log(response);

  if (response.ok) {
    res.json(await response.json());
  }

  res.status(400).end();
};
