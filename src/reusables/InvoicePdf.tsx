// src/components/InvoicePDF.tsx
import React from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import moment from "moment"
import PropTypes from "prop-types"

// Define the interface for the details object
interface Details {
  PropertyID: string
  LocalGovernment: string
  DistrictArea: string
  Street: string
  HouseNumber: string
  PropertyUsage: string
  LandArea: string
  TotalBuildingFootprint: string
  AssessedValue: string
  LandUseCharge: string
  BalanceCarriedForward: string
  TotalAmountDue: string
  DiscountedAmountDue: string
  PaymentCode: string
  State: string
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#3A3A3A",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#3A3A3A",
    borderBottom: "1px solid #E8E8E8",
    paddingBottom: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #E8E8E8",
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    color: "#3A3A3A",
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1px solid #E8E8E8",
    textAlign: "center",
  },
})

const InvoicePDF: React.FC<{ details: Details }> = ({ details }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Property Invoice</Text>
      <Text style={styles.text}>Date: {moment().format("MMMM Do YYYY")}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Property ID:</Text>
          <Text style={styles.text}>{details.PropertyID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Full Address:</Text>
          <Text style={styles.text}>
            {`${details.HouseNumber}, ${details.Street}, ${details.DistrictArea}, ${details.LocalGovernment}, ${details.State}`}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Balance Carried Forward:</Text>
          <Text style={styles.text}>₦{details.BalanceCarriedForward}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Amount Due:</Text>
          <Text style={styles.text}>₦{details.TotalAmountDue}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Discounted Amount Due:</Text>
          <Text style={styles.text}>₦{details.DiscountedAmountDue}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Code:</Text>
          <Text style={styles.text}>{details.PaymentCode}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>Thank you for your prompt payment.</Text>
      </View>
    </Page>
  </Document>
)

// Define PropTypes for the InvoicePDF component
InvoicePDF.propTypes = {
  details: PropTypes.shape({
    PropertyID: PropTypes.string.isRequired,
    LocalGovernment: PropTypes.string.isRequired,
    DistrictArea: PropTypes.string.isRequired,
    Street: PropTypes.string.isRequired,
    HouseNumber: PropTypes.string.isRequired,
    PropertyUsage: PropTypes.string.isRequired,
    LandArea: PropTypes.string.isRequired,
    TotalBuildingFootprint: PropTypes.string.isRequired,
    AssessedValue: PropTypes.string.isRequired,
    LandUseCharge: PropTypes.string.isRequired,
    BalanceCarriedForward: PropTypes.string.isRequired,
    TotalAmountDue: PropTypes.string.isRequired,
    DiscountedAmountDue: PropTypes.string.isRequired,
    PaymentCode: PropTypes.string.isRequired,
    State: PropTypes.string.isRequired,
  }).isRequired,
}

export default InvoicePDF
