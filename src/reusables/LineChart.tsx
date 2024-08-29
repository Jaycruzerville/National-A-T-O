import { Box, Text, Flex, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartOptions,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

type ChartType = {
  chartHeader?: string | null
  data?: number[][]
  dataSet_1: number[]
  dataSet_2: number[]
  labels: string[]
  width?: string | null
  xLabel: string[] | number[]
  customLegend?: object | null
  filters?: {
    name: string
    default: string
    options: string[]
  }[]
  filterUpdateFn?: (args1: string, args2: string) => void
  loading?: boolean
}

const LineChart = ({
  chartHeader = null,
  dataSet_2,
  xLabel = [],
  width = "",
  filters,
  filterUpdateFn,
}: // loading = false,
ChartType) => {
  const [labelsArray, setLabelsArray] = useState<string[]>([])
  const updateLabelsArray = () => {
    const updatedLabelsArray = xLabel.map(() => "")
    setLabelsArray(updatedLabelsArray)
  }

  useEffect(() => {
    updateLabelsArray()
  }, [dataSet_2])

  const dataConfig = {
    labels: labelsArray,
    datasets: [
      {
        data: [0],
        backgroundColor: "transparent",
        borderColor: "",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.4,
        display: "none",
      },
      {
        data: dataSet_2,
        backgroundColor: "transparent",
        borderColor: "#0085FF",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.4,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
      },
    },
  }

  const spaceFlex = {
    justifyContent: "space-between",
    alignItems: "center",
  }

  const chartHeaderStyles = {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "32px",
    color: "#202020",
  }

  const chartContainer = {
    mt: "22px",
    height: "222px",
    width: "100%",
  }
  const bottomValStyles = {
    listStyle: "none",
    fontSize: "14px",
    lineHeight: "24px",
    color: "#1A1A1A",
    gap: "0px",
  }

  return (
    <Box
      w={{ base: `calc(${width})` }}
      h={{ base: "349px" }}
      background="#FFF"
      borderRadius="12px"
      paddingTop="20px"
      paddingLeft="35px"
      paddingRight="72px"
    >
      <Flex sx={spaceFlex}>
        <Text textStyle="headText" sx={chartHeaderStyles}>
          {chartHeader}
        </Text>
        {filters && (
          <Flex gap="4px">
            {filters?.map(({ name, options, default: def }) => (
              <Select
                key={name}
                width="fit-content"
                onChange={(e) => filterUpdateFn?.(name, e.target.value)}
                defaultValue={def}
              >
                {options?.map((item: string, index: number) => (
                  <option key={index}>{item}</option>
                ))}
              </Select>
            ))}
          </Flex>
        )}
      </Flex>
      <Box sx={chartContainer}>
        <Line data={dataConfig} options={options} />
      </Box>
      <Flex
        gap="0px"
        width="100%"
        justifyContent="space-between"
        pl="35px"
        mt="-20px"
      >
        {xLabel.map((value, index) => (
          <Flex key={index} sx={bottomValStyles}>
            {value}
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default LineChart
