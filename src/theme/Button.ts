import { glass } from "./customStyles"

export const Button = {
  variants: {
    "app-primary": {
      backgroundColor: "brand.primary",
      fontWeight: "bold",
      color: "#FFFFFF",
      borderRadius: "4px",
      _hover: {
        opacity: 0.8,
        backgroundColor: "brand.primary",
        color: "#FFFFFF",
        _disabled: {
          opacity: 0.3,
          backgroundColor: "brand.primary",
          color: "#FFFFFF",
          cursor: "not-allowed",
        },
      },
    },
    "app-secondary": {
      backgroundColor: "#FFFFFF",
      fontWeight: "bold",
      color: "brand.primary",
      borderRadius: "4px",
    },
    "app-danger": {
      backgroundColor: "danger.800",
      fontWeight: "normal",
      color: "#fff",
      _hover: {
        opacity: 0.8,
        backgroundcolor: "danger.800",
        color: "#FFFFFF",
        _disabled: {
          opacity: 0.3,
          backgroundcolor: "danger.800",
          color: "#FFFFFF",
          cursor: "not-allowed",
        },
      },
    },
    "app-safety": {
      backgroundColor: "success.800",
      fontWeight: "normal",
      color: "#FFFFFF",
      _hover: {
        opacity: 0.8,
        backgroundcolor: "success.800",
        color: "#FFFFFF",
        _disabled: {
          opacity: 0.3,
          backgroundcolor: "success.800",
          color: "#FFFFFF",
          cursor: "not-allowed",
        },
      },
    },

    "app-iconButton": glass,
  },
  sizes: {
    xl: {
      h: "66px",
      fontSize: "26px",
      w: "179px",
      fontWeight: "bold",
    },
  },
}
