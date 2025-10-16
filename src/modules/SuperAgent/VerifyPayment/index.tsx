import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import usersServices from "@/services/usersServices" // Ensure correct import

const VerifyPayment: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const reference = queryParams.get("reference")
    const gateway = queryParams.get("gateway") || "paystack" // Default to Paystack

    const verifyPayment = async () => {
      try {
        // Call the verifyFundingTransaction function from usersServices
        const data = await usersServices.verifyFundingTransaction({
          reference: reference || "",
          gateway,
        })
        console.log("Payment Verified:", data)
        // Handle successful verification, e.g., update the agent's wallet
      } catch (error) {
        console.error("Payment verification failed:", error)
      }
    }

    if (reference && gateway) {
      verifyPayment()
    }
  }, [location.search])

  return <div>Verifying payment...</div>
}

export default VerifyPayment
