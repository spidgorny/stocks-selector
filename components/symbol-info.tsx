// https://rapidapi.com/apidojo/api/yh-finance
import useSWR, { mutate } from "swr";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import React from "react";
import { fetcher, stocksApiUrl } from "../lib/axios";
import { Diff, HStack } from "./widgets";
import { SymbolChart } from "./symbol-chart";

export function SymbolInfo({
  symbol,
  stocks,
}: {
  symbol: string;
  stocks: string[];
}) {
  const { data, error } = useSWR(`/api/get-quotes?symbol=${symbol}`, fetcher);
  const result = data?.quoteResponse?.result[0];

  const del = async (delSymbol: string) => {
    stocks = stocks.filter((x) => x !== delSymbol);
    const res = await axios.post(stocksApiUrl, stocks);
    await mutate(stocksApiUrl);
  };

  return (
    <Card className="my-3" style={{ maxWidth: 1050 }}>
      <Card.Header>
        <HStack>
          <div>
            <h3>{symbol}</h3>
            <h6>
              {result?.shortName} ${result?.regularMarketPrice} (low: $
              {result?.fiftyTwoWeekLow}{" "}
              <Diff
                now={result?.regularMarketPrice}
                vs={result?.fiftyTwoWeekLow}
              />
              , high: ${result?.fiftyTwoWeekHigh}{" "}
              <Diff
                now={result?.regularMarketPrice}
                vs={result?.fiftyTwoWeekHigh}
              />
              )
            </h6>
          </div>
          <Button onClick={() => del(symbol)} variant="outline-danger">
            Del
          </Button>
        </HStack>
      </Card.Header>
      <Card.Body>
        <SymbolChart symbol={symbol} />
        {/*<details>*/}
        {/*  <summary>JSON</summary>*/}
        {/*  <pre>{JSON.stringify(result, null, 2)}</pre>*/}
        {/*</details>*/}
      </Card.Body>
    </Card>
  );
}
