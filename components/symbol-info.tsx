// https://rapidapi.com/apidojo/api/yh-finance
import useSWR, { mutate } from "swr";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import React, { ReactNode, useEffect } from "react";
import { fetcher, stocksApiUrl } from "../lib/axios";
import { Diff, HStack } from "./widgets";
import { SymbolChart } from "./symbol-chart";

export function SymbolInfo({
  symbol,
  stocks,
  mySort,
}: {
  symbol: string;
  stocks: string[];
  mySort: (symbol: string, sort: number) => void;
}) {
  const { data, error } = useSWR(`/api/get-quotes?symbol=${symbol}`, fetcher);
  const result = data?.quoteResponse?.result[0];

  const del = async (delSymbol: string) => {
    stocks = stocks.filter((x) => x !== delSymbol);
    const res = await axios.post(stocksApiUrl, stocks);
    await mutate(stocksApiUrl);
  };

  const range = result?.fiftyTwoWeekHigh - result?.fiftyTwoWeekLow;
  const currentPos =
    (result?.regularMarketPrice - result?.fiftyTwoWeekLow) / range;

  useEffect(() => {
    if (currentPos) {
      mySort(symbol, currentPos);
    }
  }, [currentPos]);

  return (
    <Card
      className="my-3"
      style={{ minWidth: 500, minHeight: 200, maxWidth: 1050 }}
    >
      <Card.Header>
        <HStack>
          <div>
            <h3>{symbol}</h3>
          </div>
          <div>
            <Money left="⤒">{result?.fiftyTwoWeekHigh.toFixed(2)}</Money>{" "}
            <Diff
              now={result?.regularMarketPrice}
              vs={result?.fiftyTwoWeekHigh}
            />
            <div className="fw-bold">
              <Money left="⇢">{result?.regularMarketPrice.toFixed(2)}</Money>
            </div>
            <Money left="⤓">{result?.fiftyTwoWeekLow.toFixed(2)}</Money>{" "}
            <Diff
              now={result?.regularMarketPrice}
              vs={result?.fiftyTwoWeekLow}
            />
          </div>
          <div>{(currentPos * 100).toFixed(2)}%</div>
          <div>
            <Button onClick={() => del(symbol)} variant="outline-danger">
              Del
            </Button>
          </div>
        </HStack>
        <h6>
          {result?.shortName} ${result?.regularMarketPrice}
        </h6>
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

export function Money({
  left,
  children,
}: {
  left: string;
  children: ReactNode;
}) {
  return (
    <span style={{ display: "inline-block", width: "7em", textAlign: "right" }}>
      <HStack>
        <div>{left}</div>
        <div>${children}</div>
      </HStack>
    </span>
  );
}
