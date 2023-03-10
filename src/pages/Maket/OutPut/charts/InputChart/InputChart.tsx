import { TooltipOptions } from "chart.js";
// eslint-disable-next-line import/no-unresolved
import { _DeepPartialObject } from "chart.js/types/utils";
import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { IAnalogSignalData } from "../../../../../modules/signal/signal";

interface IInputChartProps {
  signalCoords: IAnalogSignalData;
}

export const tooltip: _DeepPartialObject<TooltipOptions<"line">> = {
  callbacks: {
    title(data) {
      return `Временная точка: ${data[0].label} мкс`;
    },
    label() {
      return "";
    },
    footer(tooltipItems) {
      return `Напряжение в точке: ${tooltipItems[0].formattedValue.replace(
        ",",
        "."
      )} В`;
    },
  },
};

export const tooltipDig: _DeepPartialObject<TooltipOptions<"line">> = {
  callbacks: {
    title() {
      return ``;
    },
    label() {
      return "";
    },
    footer(tooltipItems) {
      return parseFloat(tooltipItems[0].formattedValue) === 0
        ? "Логический 0"
        : "Логическая 1";
    },
  },
};

export const InputChart = ({
  signalCoords,
}: IInputChartProps): ReactElement => {
  const dataSignal = {
    labels: signalCoords.x,
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.y,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: true,
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
            position: "center" as const,
          },
          tooltip,
        },
      }}
      data={dataSignal}
    />
  );
};
