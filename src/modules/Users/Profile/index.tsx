import React from "react"
import QRCode from "react-qr-code"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  Divider,
  useDisclosure,
} from "@chakra-ui/react"
import { FaUserEdit, FaRegIdBadge, FaCar, FaQrcode } from "react-icons/fa"
import { IoMdCall, IoMdCalendar } from "react-icons/io"
import { useFormik } from "formik"
import * as Yup from "yup"
import PasswordResetModal from "./PasswordResetModal"
import EditAgentModal from "@/reusables/EditAgentModal"
import agentImage from "@/assets/agentImage.svg"
import { colors } from "@/theme/colors"

const ProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()

  const textColor = colors.brand.textPrimary
  const bgProfile = colors.brand.bgLight
  const borderProfileColor = colors.gray[200]
  const cardBgColor = colors.white.text
  const cardBorderColor = colors.gray[300]

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "Bilikisu Faderera",
      dateOfBirth: "1990-01-01",
      gender: "Female",
      phoneNumber: "0802000000",
      emailAddress: "shadeblade@gmail.com",
      address: "123 Main St, Lagos",
      idNumber: "A123456789",
      driverLicense: "DL123456789",
      vehicleType: "Sedan",
      vehicleMake: "Toyota",
      vehicleModel: "Camry",
      vehicleYear: "2019",
      vehicleRegistration: "ABC-1234",
      vin: "1HGBH41JXMN109186",
      licensePlate: "LAG-1234",
      gpsTrackerId: "GPS-12345",
      qrCodeValue: "QR-1234567890",
      complianceStatus: "Compliant",
      employmentStatus: "Active",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      emailAddress: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Flex direction="column" pt={{ base: "100px", md: "75px", lg: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb="24px"
        maxH="300px"
        justifyContent={{ sm: "center", md: "space-between" }}
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
      >
        <Flex
          align="center"
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}
        >
          <Avatar
            me={{ md: "22px" }}
            src={agentImage}
            w="80px"
            h="80px"
            borderRadius="15px"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {formik.values.fullName}
            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={colors.gray[400]}
              fontWeight="semibold"
            >
              {formik.values.emailAddress}
            </Text>
          </Flex>
        </Flex>
        <Button
          p="0px"
          bg="transparent"
          variant="no-effects"
          onClick={onOpenEdit}
        >
          <Flex
            align="center"
            bg={colors.brand.bgLight}
            borderRadius="8px"
            justifyContent="center"
            py="10px"
            px="20px"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
            cursor="pointer"
          >
            <Icon as={FaUserEdit} color={colors.white} me="6px" />
            <Text fontSize="xs" color={colors.white} fontWeight="bold">
              Edit Profile
            </Text>
          </Flex>
        </Button>
      </Flex>

      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
        <ProfileCard
          icon={FaRegIdBadge}
          title="Personal Information"
          items={[
            { label: "Full Name", value: formik.values.fullName },
            { label: "Date of Birth", value: formik.values.dateOfBirth },
            { label: "Gender", value: formik.values.gender },
            { label: "Phone Number", value: formik.values.phoneNumber },
            { label: "Address", value: formik.values.address },
          ]}
          bgColor={cardBgColor}
          borderColor={cardBorderColor}
        />
        <ProfileCard
          icon={FaCar}
          title="Vehicle Information"
          items={[
            { label: "Vehicle Type", value: formik.values.vehicleType },
            {
              label: "Vehicle Make & Model",
              value: `${formik.values.vehicleMake} ${formik.values.vehicleModel}`,
            },
            { label: "Registration", value: formik.values.vehicleRegistration },
            { label: "VIN", value: formik.values.vin },
            { label: "License Plate", value: formik.values.licensePlate },
          ]}
          bgColor={cardBgColor}
          borderColor={cardBorderColor}
        />
        <ProfileCard
          icon={FaQrcode}
          title="Driver Verification"
          items={[
            { label: "Unique ID", value: formik.values.gpsTrackerId },
            { label: "QR Code", value: "" },
          ]}
          qrCodeValue={formik.values.qrCodeValue}
          bgColor={cardBgColor}
          borderColor={cardBorderColor}
        />
        <ProfileCard
          icon={IoMdCalendar}
          title="Employment Status"
          items={[{ label: "Status", value: formik.values.employmentStatus }]}
          bgColor={cardBgColor}
          borderColor={cardBorderColor}
        />
      </Grid>

      <Divider my="40px" />

      <Button
        onClick={onOpen}
        size="lg"
        bg={colors.danger[800]}
        color="white"
        _hover={{ bg: colors.danger[800] }}
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
        leftIcon={<Icon as={IoMdCall} />}
      >
        Change Password
      </Button>

      <PasswordResetModal
        isOpen={isOpen}
        onClose={onClose}
        email={formik.values.emailAddress}
      />
      <EditAgentModal
        data={{ firstName: "Bilikisu", lastName: "Faderera" }}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        userType="Agent"
      />
    </Flex>
  )
}

const ProfileCard = ({
  icon,
  title,
  items,
  qrCodeValue,
  bgColor,
  borderColor,
}: {
  icon: any
  title: string
  items: { label: string; value: string }[]
  qrCodeValue?: string
  bgColor: string
  borderColor: string
}) => {
  const textColor = colors.brand.textPrimary

  return (
    <Box
      p="16px"
      bg={bgColor}
      borderRadius="15px"
      boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.1)"
      border={`1px solid ${borderColor}`}
    >
      <Flex mb="12px" align="center">
        <Icon as={icon} color={textColor} w={6} h={6} me="10px" />
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </Flex>
      {items.map((item, index) => (
        <Flex key={index} align="center" mb="12px">
          <Text fontSize="md" color={textColor} fontWeight="bold" w="150px">
            {item.label}:
          </Text>
          {item.label === "QR Code" && qrCodeValue ? (
            <QRCode value={qrCodeValue} size={64} />
          ) : (
            <Text fontSize="md" color={colors.gray[400]}>
              {item.value}
            </Text>
          )}
        </Flex>
      ))}
    </Box>
  )
}

export default ProfilePage
