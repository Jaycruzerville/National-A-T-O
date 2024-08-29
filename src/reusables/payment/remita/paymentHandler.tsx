interface PaymentDetails {
  email: string
  firstName: string
  lastName: string
  amount: string
  narration: string
}

interface PaymentResponse {
  status: string
  message: string
  data?: any // 'data' can be of any type, depending on what the payment gateway returns
}

declare global {
  interface Window {
    RmPaymentEngine: any
  }
}

function makePayment(details: PaymentDetails): void {
  console.log("Initializing payment with details:", details)

  const { email, firstName, lastName, amount, narration } = details

  if (!email || !firstName || !lastName || !amount || !narration) {
    console.error("Missing required payment details:", details)
    alert("Please ensure all payment details are provided.")
    return
  }

  const handler = window.RmPaymentEngine.init({
    key: "QzAwMDAzNTA0Mzh8MTEwMDQxNzg2OTkwfGEwMmU2Mjg1ZmZhY2ZlMTVhNmYzZTVmZTFiMGQzNmMzYThmNDRhZTViZDM4OWMxZDU1YWYwODU1ZjE5YTA4MmYwNjAxZTYyZmRjMzVkMzUyNWI2MjFlYjkxNjZjZmE2NWU5MmUyZTU1MDRjYjJlMGY4ZDBkNjRhOGRmMjBmYjkw", // Ensure this key is valid
    customerId: email,
    transactionId: Math.random().toString(36).substr(2, 9),
    firstName: firstName,
    lastName: lastName,
    email: email,
    amount: amount,
    narration: narration,
    currency: "NGN", // Adding currency if required by Remita
    channel: "CARD,USSD,QR,IBANK",
    extendedData: {
      customFields: [
        {
          name: "rrr",
          value: "340007777362",
        },
      ],
      recurring: [
        {
          endDate: 1561935600000,
          frequency: "MON",
          maxUploadLimit: 0,
          numberOfTimes: 0,
          startDate: 1561478053677,
        },
      ],
    },
    onSuccess: (response: PaymentResponse) => {
      console.log("Callback Successful Response", response)
      alert("Payment successful!")
    },
    onError: (response: PaymentResponse) => {
      console.log("Callback Error Response", response)
      alert("Payment failed! Please try again.")
    },
    onClose: () => {
      console.log("Transaction closed without completion")
      alert("Payment window closed.")
    },
  })

  try {
    handler.openIframe()
    console.log("Iframe opened successfully")
  } catch (error) {
    console.error("Error opening iframe:", error)
    alert("An error occurred while opening the payment window.")
  }
}

export { makePayment }
