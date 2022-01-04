import type { NextApiRequest, NextApiResponse } from "next";
import { getAxios } from "../../lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/auto-complete",
    params: { q: req.query.q, region: "US" },
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "mkHMPf7Y6Gmsh7LJWjD21A9JCcOcp1oi3UEjsn6lIO6msTUt0C",
    },
  };

  // @ts-ignore
  const response = await getAxios().request(options);
  res.status(200).json({
    ...response.data,
  });
}
