import { Box, Text, Flex } from "@chakra-ui/react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

type ChartType = {
  width?: string | null
  chartHeader?: string | null
  customLegend?: { title: string; count: number; color: string }[]
  data: number[]
  labels: string[]
}

const PieChart = ({
  chartHeader = null,
  data = [],
  labels = [],
  customLegend,
}: ChartType) => {
  const dataConfig = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#2FD0C6", "#304676", "#D02F44"],
        borderColor: ["#FFF", "#FFF"],
        hoverBorderColor: ["#FFF", "#FFF"],
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const fontFamily = "'Cabinet Grotesk', sans-serif"

  const centerFlex = {
    alignItems: "center",
  }

  const chartHeaderStyles = {
    fontFamily: fontFamily,
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "32px",
    textAlign: "left",
  }
  const chartTagStyles = {
    fontFamily: fontFamily,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "10px",
    lineHeight: "12px",
    textAlign: "center",
    color: "#FFF",
    px: "8px",
    py: "4px",
    borderRadius: "4px",
    width: "fit-content",
    margin: "auto",
  }
  const chartAmountStyles = {
    fontFamily: fontFamily,
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "10px",
    lineHeight: "12px",
    textAlign: "center",
    color: "#000",
    px: "8px",
    py: "4px",
    borderRadius: "4px",
  }
  const chartContainer = {
    // mt: "22px",
  }

  return (
    <Box background="#FFF" borderRadius="12px" p="20px">
      <Flex sx={centerFlex} w="100%">
        {chartHeader !== null && (
          <Text sx={chartHeaderStyles} mb="22px">
            {chartHeader}
          </Text>
        )}
      </Flex>
      <Box sx={chartContainer} w="186px" h="186px" m="auto">
        <Doughnut data={dataConfig} options={options}></Doughnut>
      </Box>
      {customLegend && (
        <Flex mt="24px" justifyContent="center" gap="16px">
          {customLegend?.map(({ title, count, color }) => (
            <Box key="title">
              <Text sx={chartTagStyles} background={color}>
                {title}
              </Text>
              <Text sx={chartAmountStyles}>
                {new Intl.NumberFormat("en-GB").format(count ?? 0)}
              </Text>
            </Box>
          ))}
        </Flex>
      )}
      <Flex
        gap="0px"
        width="100%"
        justifyContent="space-between"
        pl="35px"
        mt="-20px"
      ></Flex>
    </Box>
  )
}

export default PieChart
