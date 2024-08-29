import { useRef } from "react"
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"
import { FaUserCheck, FaUserSlash } from "react-icons/fa"

type Props = {
  status: "ACTIVE" | "BLOCKED"
  ActionButton: React.ReactNode
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
const AgentStatusPopover = ({
  status,
  ActionButton,
  isOpen,
  onOpen,
  onClose,
}: Props) => {
  const initialFocusRef = useRef(null)

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="left"
      closeOnBlur={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          variant={status === "ACTIVE" ? "app-danger" : "app-safety"}
          rightIcon={status === "ACTIVE" ? <FaUserSlash /> : <FaUserCheck />}
          size="sm"
        >
          {status === "ACTIVE" ? "Deactivate" : "Activate"} Agent
        </Button>
      </PopoverTrigger>
      <PopoverContent
        color="brand.primary"
        background={status === "ACTIVE" ? "red.50" : "#EEF1FD"}
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          {status === "ACTIVE" ? "Deactivate" : "Activate"} Agent
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{`Are you sure you want to ${
          status === "ACTIVE" ? "deactivate" : "activate"
        } this agent?`}</PopoverBody>
        <PopoverFooter
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            {ActionButton}
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default AgentStatusPopover
