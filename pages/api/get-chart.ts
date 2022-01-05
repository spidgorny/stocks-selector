import type { NextApiRequest, NextApiResponse } from "next";
import { getAxios } from "../../lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let symbol = req.query.symbol;
  let options = {
    method: "GET",
    // url: "https://yh-finance.p.rapidapi.com/stock/v3/get-chart",
    url: `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
    params: {
      interval: "1d",
      symbol: symbol,
      range: "6mo",
      region: "US",
      includePrePost: "false",
      useYfid: "true",
      includeAdjustedClose: "true",
      events: "capitalGain,div,split",
    },
    headers: {
      // "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      // "x-rapidapi-key": "mkHMPf7Y6Gmsh7LJWjD21A9JCcOcp1oi3UEjsn6lIO6msTUt0C",
    },
  };

  // @ts-ignore
  const response = await getAxios().request(options);
  res.status(200).json({
    ...response.data,
    fromCache: !!response.request.fromCache,
  });
}
