import { LegendItem } from "chart.js";
import { ReactElement, useMemo } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { useMaketContext } from "../../../../../context";
import { ISignalCoords } from "../../../../../modules/signal/signal";

interface IDigitalInputChartProps {
  signalCoords: ISignalCoords;
}

export const FilterChart = ({
  signalCoords,
}: IDigitalInputChartProps): ReactElement => {
  const { signal } = useMaketContext();

  const datasets = useMemo(() => {
    if (signal.type === "digital") {
      const logZero = signal.ampl * 0.4;
      const max = signal.ampl + logZero;
      const min = signal.ampl - logZero;
      return [
        {
          label: "Логический 0",
          data: signalCoords.y.map(() => logZero),
          borderColor: "#006c7670",
          backgroundColor: "#006c7670",
          fill: false,
        },
        {
          label: "Логический 0",
          data: signalCoords.y.map(() => -logZero),
          borderColor: "#006c7670",
          backgroundColor: "#006c7670",
          fill: "-1",
        },
        {
          label: "Логическая 1",
          data: signalCoords.y.map(() => max),
          borderColor: "#00c9ff80",
          backgroundColor: "#00c9ff80",
          fill: "+1",
        },
        {
          label: "Логическая 1",
          data: signalCoords.y.map(() => min),
          borderColor: "#00c9ff80",
          backgroundColor: "#00c9ff80",
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
        label: "Напряжение",
        fill: false,
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
          legend: {
            display: signal.type === 'digital',
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
                        item?.backgroundColor.toString() ||
                        "rgba(255, 79, 132, 0.5)",
                      strokeStyle:
                        item?.backgroundColor.toString() ||
                        "rgba(255, 79, 132, 0.5)",
                      hidden: chart.getDatasetMeta(i).hidden,
                    })
                  ),
            },
          },
          title: {
            display: true,
            text: "Сигнал после действия фильтра",
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
