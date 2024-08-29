import { Box } from "@chakra-ui/react"

type PillTrayType = {
  activePill: string
  setPill: React.Dispatch<React.SetStateAction<string>>
  pills: string[]
}

const PillTray = ({ activePill, setPill, pills }: PillTrayType) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="35px"
      sx={{
        background: "gray.100",
        border: "1px solid",
        borderColor: "gray.200",
        padding: "4px",
        borderRadius: "32px",
      }}
    >
      {pills.map((period) => {
        const active = period === activePill
        return (
          <Box
            as="button"
            key={period}
            onClick={() => setPill(period)}
            sx={{
              all: "unset",
              padding: "4px 20px",
              background: active ? "#fff" : "transparent",
              borderRadius: "24px",
              color: active ? "black" : "#979797",
              lineHeight: "21px",
              cursor: "pointer",
            }}
          >
            {period}
          </Box>
        )
      })}
    </Box>
  )
}

export default PillTray
