import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type ChartProps = {
  options?: ChartOptions<"bar">
  orientation?: "vertical" | "horizontal"
  xGrid?: boolean
  yGrid?: boolean
  barThickness?: number
  data: number[]
  labels: string[]
  dataLabel?: string
}

const BarChart = ({
  options = {},
  orientation = "vertical",
  barThickness = 8,
  xGrid = false,
  yGrid = false,
  dataLabel = "",
  data = [],
  labels = [],
}: ChartProps) => {
  const config: ChartOptions<"bar"> = {
    indexAxis: orientation === "horizontal" ? ("y" as const) : ("x" as const),
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: xGrid,
        },
      },
      y: {
        grid: {
          display: yGrid,
        },
      },
    },
    ...options,
  }

  const dataConfig = {
    labels,
    datasets: [
      {
        barThickness,
        label: dataLabel,
        data,
        backgroundColor: "#071655",
      },
    ],
  }
  return <Bar options={config} data={dataConfig} />
}

export default BarChart
