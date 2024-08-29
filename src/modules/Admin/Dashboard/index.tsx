import { Box, Flex, Link, Tag, Text } from "@chakra-ui/react"
import { Link as RouteLink } from "react-router-dom"
import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import BarChart from "@/reusables/BarChart"
import PieChart from "@/reusables/PieChart"
import { nigerianStates } from "@/data/naijaStates"
import Leaderboard from "./Leaderboard"
import Map from "@/reusables/Map"
import LineChart from "@/reusables/LineChart"
import { getDayPeriod } from "@/utils/getDayPeriod"

const statData = [
  {
    id: 1,
    icon: totalUsers,
    text: "Total Users",
    value: "5,045",
    percentage: 12,
  },
  {
    id: 2,
    icon: totalTransactions,
    text: "Total Remittance",
    value: "₦144,100,583",
    percentage: 12,
  },
  {
    id: 3,
    icon: totalUsers,
    text: "Total Property",
    value: "390,456",
    percentage: 19,
  },
  {
    id: 4,
    icon: totalUsers,
    text: "Total transaction value",
    value: "₦3,008,292",
    percentage: 12,
  },
  {
    id: 5,
    icon: totalTransactions,
    text: "Total transaction value for April",
    value: "₦144,100,583",
    percentage: 12,
  },
  {
    id: 6,
    icon: totalUsers,
    text: "Total claim value for April",
    value: "₦3,008,292",
    percentage: 12,
  },
]

const renderSectionHeader = (title: string) => {
  return (
    <Box mt="30px" mb="10px">
      <Box
        h="50px"
        bg="brand.primary"
        p="12px 40px"
        color="#fff"
        fontSize="20px"
        borderTopRadius="12px"
      >
        {title}
      </Box>
    </Box>
  )
}

const index = () => {
  return (
    <Box py="6" px="5" bg="#F6F6F6" minH="100vh">
      <Flex mb="10px" justifyContent="space-between">
        <Text fontSize="28px" fontWeight={500}>
          Good {getDayPeriod()} Folashade!
        </Text>
      </Flex>
      <Flex gap="20px" justify="start" align="center" wrap="wrap">
        {statData.map(({ id, icon, text, value, percentage }) => (
          <StatCards
            key={id}
            icon={icon}
            text={text}
            value={value}
            percentage={percentage}
          />
        ))}
      </Flex>
      {/* Graphs and claims */}
      <Flex mt="30px" gap="20px">
        <Box width="66%">
          <Box bg="#fff" p="4" borderRadius="12px">
            <LineChart
              width="100%"
              chartHeader={"Remittances"}
              labels={[""]}
              dataSet_1={[
                200, 170, 180, 180, 400, 420, 300, 350, 200, 250, 350, 200,
              ]}
              dataSet_2={[
                150, 120, 280, 180, 300, 320, 200, 220, 280, 290, 200, 300,
              ]}
              xLabel={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
              ]}
              customLegend={[
                {
                  title: "Car Insurance",
                  count: 3000000,
                  color: "#3661EC",
                },
                {
                  title: "Micropension",
                  count: 3000000,
                  color: "#2FD0C6",
                },
              ]}
            />
          </Box>
          <Box bg="#fff" p="4" borderRadius="12px" mt="3">
            <LineChart
              width="100%"
              chartHeader={"Users"}
              labels={[""]}
              dataSet_1={[
                200, 170, 180, 180, 400, 420, 300, 350, 200, 250, 350, 200,
              ]}
              dataSet_2={[
                150, 120, 280, 180, 300, 320, 200, 220, 280, 290, 200, 300,
              ]}
              xLabel={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
              ]}
              customLegend={[
                {
                  title: "Car Insurance",
                  count: 3000000,
                  color: "#3661EC",
                },
                {
                  title: "Micropension",
                  count: 3000000,
                  color: "#2FD0C6",
                },
              ]}
            />
          </Box>
        </Box>
        <Box p="4" borderRadius="12px" bg="#fff" width="32.3%">
          <Flex justify="space-between" align="center" color="#1A1A1A">
            <Text fontWeight={700} fontSize="18px">
              Overdue Charges
            </Text>
            <Link
              fontWeight={700}
              fontSize="18px"
              textDecoration="underline"
              as={RouteLink}
              to="/charges"
            >
              View All
            </Link>
          </Flex>
          <Box mt="1">
            {Array.from(new Array(8)).map((item, index) => (
              <Flex
                key={item}
                mt="15px"
                justify="space-between"
                pb="8px"
                borderBottom="1px solid"
                borderColor="#B8B8B8"
              >
                <Box>
                  <Text fontSize="14px" fontWeight={600} color="#0B1023">
                    Overdue Charges
                  </Text>
                  <Text color="#0B102380" fontSize="14px" fontWeight={200}>
                    May, 10 2024
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="16px" fontWeight={700} color="#0B1023">
                    NGN {new Intl.NumberFormat("en-GB").format(390960 ?? 0)}
                  </Text>
                  <Tag colorScheme={index === 7 ? "pending" : "active"}>
                    {index === 7 ? "Pending" : "Active"}
                  </Tag>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
      </Flex>
      {/* Demographics */}
      {renderSectionHeader("User demographics - Count")}
      <Flex align="center" gap="20px">
        <Box
          width="32.3%"
          height="349px"
          p="20px 15px"
          bg="#fff"
          borderRadius="12px"
        >
          <Text textAlign="center" pb="10px" color="#414D55" fontWeight={700}>
            Occupation of Users
          </Text>
          <BarChart
            orientation="horizontal"
            data={[500, 700, 1000, 800, 700, 800, 600, 900, 100, 1000, 400]}
            labels={[
              "Tailor",
              "Vulcanizer",
              "Hairdresser",
              "Bus Driver",
              "Motorcycle Rider",
              "Barber",
              "Carpentry",
              "Plumber",
              "Electrician",
              "Petty Trader",
              "Mechanic",
            ]}
          />
        </Box>
        <Box
          width="32.3%"
          height="349px"
          p="20px 15px"
          bg="#fff"
          borderRadius="12px"
        >
          <Text textAlign="center" pb="10px" color="#414D55" fontWeight={700}>
            Sign up Channel
          </Text>
          <BarChart
            yGrid={true}
            orientation="vertical"
            data={[100000, 70000, 50000]}
            labels={["Self onboard", "Agent", "Admin"]}
            barThickness={40}
          />
        </Box>
        <Box
          width="32.3%"
          height="349px"
          p="20px 15px"
          bg="#fff"
          borderRadius="12px"
        >
          <Text textAlign="center" pb="10px" color="#414D55" fontWeight={700}>
            Gender
          </Text>
          <PieChart
            data={[600000, 1000000]}
            labels={["Female", "Male"]}
            customLegend={[
              {
                title: "Male",
                count: 1000000,
                color: "#3661EC",
              },
              {
                title: "Female",
                count: 800500,
                color: "#2FD0C6",
              },
            ]}
          />
        </Box>
      </Flex>
      {/* Region */}
      {renderSectionHeader("Region - Transaction Value")}
      <Box p="20px 35px" borderRadius="12px" bg="#fff">
        <BarChart
          yGrid={true}
          orientation="vertical"
          data={Array.from(
            { length: 36 },
            () => Math.floor(Math.random() * 100) + 1
          )}
          labels={nigerianStates}
          barThickness={8}
        />
      </Box>
      {/* Map  & Leaderboard*/}
      <Flex align="center" gap="20px">
        <Box width="60%">
          {renderSectionHeader("Transaction Value - Plans")}
          <Flex justify="center">
            <Map height={556} />
          </Flex>
        </Box>
        <Box width="40%">
          {renderSectionHeader("Region - Top Performing Users")}
          <Leaderboard title="Top Performing Users" />
        </Box>
      </Flex>

      {/* Agent & SuperAgent */}
      {renderSectionHeader("Total Collection Value")}
      <Flex align="center" gap="20px">
        <Box
          width="60%"
          height="349px"
          p="20px 15px"
          bg="#fff"
          borderRadius="12px"
        >
          <Text pb="10px" color="#414D55" fontWeight={700}>
            Total collection Value
          </Text>
          <BarChart
            yGrid={true}
            orientation="vertical"
            data={[100000, 70000, 9000, 50000, 10000, 60000, 50000, 40000]}
            labels={["A", "B", "C", "D", "E", "F", "G", "H"]}
            barThickness={40}
          />
        </Box>
        <Box width="40%">
          <Leaderboard count={3} title="Top Performing States" />
        </Box>
      </Flex>
    </Box>
  )
}

export default index
