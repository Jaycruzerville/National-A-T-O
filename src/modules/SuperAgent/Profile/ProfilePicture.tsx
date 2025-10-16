import React, { useRef } from "react"
import { Box, Flex, Image, Input, Icon } from "@chakra-ui/react"
import ProfilePhoto from "@/assets/profilePic.svg"
import { ReactComponent as editImage } from "@/assets/editImage.svg"

const ProfilePicture = ({
  image,
  setImage,
  defaultImage,
}: {
  image: File | null
  setImage: React.Dispatch<React.SetStateAction<File | null>>
  defaultImage?: string
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <Flex align="start" gap="20px">
      <Input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageChange}
        sx={{ display: "none" }}
      />
      <Box position="relative">
        <Image
          objectFit="cover"
          boxSize="120px"
          borderRadius="50%"
          src={
            image ? URL.createObjectURL(image) : defaultImage ?? ProfilePhoto
          }
        />
        <Icon
          as={editImage}
          sx={{
            position: "absolute",
            right: "-10%",
            bottom: "1px",
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current?.click()}
        />
      </Box>
      {/* <Box>
        <Flex gap="8px" mb="16px">
          <Button
            variant="outline"
            sx={{
              width: "120px",
              border: "1px solid #E35044",
              color: "#E35044 ",
            }}
            onClick={() => setImage(null)}
          >
            Remove
          </Button>
        </Flex>
      </Box> */}
    </Flex>
  )
}

export default ProfilePicture
