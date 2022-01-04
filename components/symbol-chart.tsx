import useSWR from "swr";
import { fetcher } from "../lib/axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";

export function SymbolChart({ symbol }: { symbol: string }) {
  const { data, error } = useSWR(`/api/get-chart?symbol=${symbol}`, fetcher);
  const result = data?.chart?.result?.[0];

  return (
    <>
      {result && result.timestamp && <LineChart data={result} />}
      {/*<details>*/}
      {/*  <summary>JSON</summary>*/}
      {/*  <pre>{JSON.stringify(result, null, 2)}</pre>*/}
      {/*</details>*/}
    </>
  );
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ data }: any) {
  const options = {
    responsive: false,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      xAxis: {
        // The axis for this scale is determined from the first letter of the id as `'x'`
        // It is recommended to specify `position` and / or `axis` explicitly.
        ticks: {
          // Include a dollar sign in the ticks
          // callback: (value, index, ticks) => "$" + value,
        },
      },
    },
  };

  const labels = data.timestamp.map((x) =>
    new Date(x * 1000).toISOString().substring(0, 10)
  );

  const lineChart = {
    labels,
    datasets: [
      {
        label: "6 months by 1 day",
        data: data.indicators.quote[0].close,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return <Line options={options} data={lineChart} width={1024} height={350} />;
}
