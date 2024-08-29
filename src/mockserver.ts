import { createServer } from "miragejs"
export function makeServer() {
  const server = createServer({
    environment: "development",
    routes() {
      this.passthrough("https://apil-me-api.herokuapp.com/api/v1/**")
      this.get(
        "/mock/agents/:id/user-summary/",
        () => {
          return {}
        },
        { timing: 2000 }
      )
      this.get(
        "/mock/agents/:id/transaction-summary",
        () => {
          return {
            data: {
              remittances: [
                {
                  dayNumber: 1,
                  totalTransactionCount: 100,
                },
                {
                  dayNumber: 2,
                  totalTransactionCount: 100,
                },
                {
                  dayNumber: 3,
                  totalTransactionCount: 100,
                },
                {
                  dayNumber: 4,
                  totalTransactionCount: 100,
                },
              ],
            },
          }
        },
        { timing: 2000 }
      )
      this.get(
        "mock/agents/:id",
        () => {
          return {
            data: {
              id: "lsjfisf",
              firstName: "first name",
              lastName: "last name",
              agentCode: "hsyru4756",
              phoneNumber: "+234908762534",
              emailAddress: "agent@address.com",
              status: "Active",
              lastActiveDate: "2023-01-02",
              dateCreated: "2023-01-01",
              agentAddress: {
                location: "futa junction",
                lga: "futa south",
                state: "Ondo",
                country: "Nigeria",
              },
              registeredUsers: {
                currentMonth: 100,
                previousMonth: 100,
              },
              transactionValue: {
                currentMonth: 100,
                previousMonth: 100,
              },
              recentClaims: [
                {
                  id: "sjdfoiskf-sdfjsidfjosdf-sdfjlsdf",
                  type: "Car Insurance",
                  amount: 1000,
                  status: "Approved",
                  createdAt: "2023-05-05T12:00:00",
                },
                {
                  id: "sjdfoiskf-sdfjsidfjosdf-sdfjlsdf",
                  type: "Car Insurance",
                  amount: 1000,
                  status: "Approved",
                  createdAt: "2023-05-05T12:00:00",
                },
                {
                  id: "sjdfoiskf-sdfjsidfjosdf-sdfjlsdf",
                  type: "Car Insurance",
                  amount: 1000,
                  status: "Approved",
                  createdAt: "2023-05-05T12:00:00",
                },
                {
                  id: "sjdfoiskf-sdfjsidfjosdf-sdfjlsdf",
                  type: "Car Insurance",
                  amount: 1000,
                  status: "Approved",
                  createdAt: "2023-05-05T12:00:00",
                },
                {
                  id: "sjdfoiskf-sdfjsidfjosdf-sdfjlsdf",
                  type: "Car Insurance",
                  amount: 1000,
                  status: "Approved",
                  createdAt: "2023-05-05T12:00:00",
                },
              ],
            },
          }
        },
        { timing: 2000 }
      )
      //   this.passthrough()
    },
  })
  return server
}
