import { LegendItem } from "chart.js";
import { ReactElement, useMemo } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { useMaketContext } from "../../../../../context";
import { ISignalCoords } from "../../../../../modules/signal/signal";
import { tooltip } from "../InputChart";

interface IInputChartProps {
  signalCoords: ISignalCoords;
}

export const OutputChart = ({
  signalCoords,
}: IInputChartProps): ReactElement => {
  const { signal } = useMaketContext();

  const datasets = useMemo(() => {
    if (signal.type === "digital") {
      const logZero = signal.ampl * 0.25;
      const max = signal.ampl;
      const min = signal.ampl - signal.ampl * 0.25;
      return [
        {
          label: "Логический 0",
          data: signalCoords.y.map(() => logZero),
          borderColor: "#e2e61763",
          backgroundColor: "#e2e61763",
          fill: false,
        },
        {
          label: "Логический 0",
          data: signalCoords.y.map(() => 0),
          borderColor: "#e2e61763",
          backgroundColor: "#e2e61763",
          fill: "-1",
        },
        {
          label: "Логическая 1",
          data: signalCoords.y.map(() => max),
          borderColor: "#01c40063",
          backgroundColor: "#01c40063",
          fill: "+1",
        },
        {
          label: "Логическая 1",
          data: signalCoords.y.map(() => min),
          borderColor: "#01c40063",
          backgroundColor: "#01c40063",
          fill: false,
        },
      ];
    }
    return [];
  }, [signal, signalCoords]);

  const dataSignal = {
    labels: signalCoords.x,
    datasets: [
      {
        label: "Сигнал с учетом помехи",
        data: signalCoords.y,
        borderColor: "rgb(255, 79, 132)",
        backgroundColor: "rgba(255, 79, 132, 0.5)",
      },
      ...datasets,
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
        interaction: {
          intersect: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "U, В",
              align: "center",
              font() {
                return {
                  weight: "600",
                };
              },
            },
          },
          x: {
            display: signal.type !== 'digital',
            title: {
              display: true,
              text: "t, мкс",
              align: "center",
              font() {
                return {
                  weight: "600",
                };
              },
            },
          },
        },
        plugins: {
          tooltip: tooltip,
          legend: {
            display: signal.type === "digital",
            position: "top" as const,
            labels: {
              generateLabels: (chart) =>
                chart.data.datasets
                  .filter(
                    (value, i, arr) =>
                      i === arr.findIndex((el) => value.label === el.label)
                  )
                  .map(
                    (item, i): LegendItem => ({
                      datasetIndex: i,
                      text: item.label || "",
                      fillStyle:
                        item?.backgroundColor?.toString() ||
                        "rgba(255, 79, 132, 0.5)",
                      strokeStyle:
                        item?.backgroundColor?.toString() ||
                        "rgba(255, 79, 132, 0.5)",
                      hidden: chart.getDatasetMeta(i).hidden,
                    })
                  ),
            },
          },
          title: {
            display: true,
            text: "Сигнал после действия помех",
            font: {
              size() {
                return 24;
              },
            },
          },
        },
      }}
      data={dataSignal}
    />
  );
};
