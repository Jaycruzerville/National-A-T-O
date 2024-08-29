// Updated mockClaimsData
const mockClaimsData = [
  {
    id: "1",
    customerName: "John Doe",
    claimCode: "CLM001",
    amount: "1500",
    initiatedBy: "Jane Smith",
    planType: "Commercial",
    status: "Approved",
    documents: [
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://spshabitat.org/wp-content/uploads/2016/05/House-Floor-Plans.pdf",
      },
    ],
    createdAt: "2023-01-01",
    reason: "Property damage due to flood",
  },
  {
    id: "2",
    customerName: "Alice Johnson",
    claimCode: "CLM002",
    amount: "2000",
    initiatedBy: "John Smith",
    planType: "Residential",
    status: "Processing",
    documents: [
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://spshabitat.org/wp-content/uploads/2016/05/House-Floor-Plans.pdf",
      },
    ],
    createdAt: "2023-02-15",
    reason: "Roof repair",
  },
  {
    id: "3",
    customerName: "Bob Brown",
    claimCode: "CLM003",
    amount: "1000",
    initiatedBy: "Mary Davis",
    planType: "Free land",
    status: "Rejected",
    documents: [
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://spshabitat.org/wp-content/uploads/2016/05/House-Floor-Plans.pdf",
      },
    ],
    createdAt: "2023-03-10",
    reason: "Land dispute settlement",
  },
  {
    id: "4",
    customerName: "Charlie White",
    claimCode: "CLM004",
    amount: "2500",
    initiatedBy: "James Wilson",
    planType: "NGO",
    status: "Approved",
    documents: [
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://spshabitat.org/wp-content/uploads/2016/05/House-Floor-Plans.pdf",
      },
    ],
    createdAt: "2023-04-20",
    reason: "Funding for NGO activities",
  },
  {
    id: "5",
    customerName: "David Green",
    claimCode: "CLM005",
    amount: "3000",
    initiatedBy: "Patricia Martinez",
    planType: "Residential",
    status: "Processing",
    documents: [
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://spshabitat.org/wp-content/uploads/2016/05/House-Floor-Plans.pdf",
      },
    ],
    createdAt: "2023-05-05",
    reason: "Home renovation",
  },
]

// claimsDetails mock data
const mockClaimsDetails = {
  data: {
    id: "1",
    customerDetails: {
      customerName: "John Doe",
      customerCode: "CUST001",
      id: "1",
    },
    planInformation: "Commercial",
    claimAmount: "1500",
    totalClaim: "5000",
    totalRemittance: "2000",
    lastPaymentDate: "2023-01-01",
    supportingDocuments: [
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
      {
        url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
      },
    ],
    status: "Processing",
    reason: "Claim for commercial property damages",
    claimHistory: [
      {
        id: "h1",
        event: "Initiated",
        message: "Claim initiated by user",
        createdAt: "2023-01-01",
      },
      {
        id: "h2",
        event: "InReview",
        message: "Claim under review by admin",
        createdAt: "2023-01-02",
      },
      {
        id: "h3",
        event: "Processing",
        message: "Claim being processed",
        createdAt: "2023-01-03",
      },
    ],
  },
}

// claimsList mock data
const mockClaimsList = {
  data: [
    {
      id: "2",
      customerName: "John Doe",
      planInformation: "Commercial",
      amount: "2500",
      status: "Approved",
      reason: "Commercial property renovation",
      supportingDocuments: [
        {
          url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
        },
        {
          url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
        },
      ],
      createdAt: "2023-02-15",
    },
    {
      id: "3",
      customerName: "John Doe",
      planInformation: "Residential",
      amount: "1000",
      status: "Rejected",
      reason: "Home repair",
      supportingDocuments: [
        {
          url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920bac729-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
        },
        {
          url: "https://images.nigeriapropertycentre.com/properties/images/2014779/0655f920e387a1-uncompleted-building-5-bedroom-fully-detached-duplex-with-2room-bq-detached-duplexes-for-sale-asokoro-district-abuja.jpg",
        },
      ],
      createdAt: "2023-03-10",
    },
  ],
  pagination: {
    numberOfPages: 1,
  },
}

// mockData.js

const mockProperties = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    agentCode: "A123",
    phoneNumber: "1234567890",
    businessAddress: "123 Main St",
    registeredUsers: "10",
    status: "ACTIVE",
    lastActiveDate: "2023-05-01",
    dateCreated: "2023-04-01",
    createdAt: "2023-04-01",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    agentCode: "B456",
    phoneNumber: "0987654321",
    businessAddress: "456 Elm St",
    registeredUsers: "20",
    status: "INACTIVE",
    lastActiveDate: "2023-04-15",
    dateCreated: "2023-03-15",
    createdAt: "2023-03-15",
  },
  // Add more mock data as needed
]
export { mockClaimsData, mockClaimsDetails, mockClaimsList, mockProperties }
