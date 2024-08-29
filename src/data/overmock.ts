// mockData.js
import { faker } from "@faker-js/faker"

const generateMockAgents = (count: any) => {
  const statusOptions = ["ACTIVE", "INACTIVE"]
  return Array.from({ length: count }, () => ({
    id: faker.datatype.uuid(),
    property: faker.company.name(),
    state: faker.address.state(),
    address: faker.address.streetAddress(),
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    amountDue: faker.finance.amount(100, 10000, 2, "₦"),
    lastActiveDate: faker.date.past().toISOString(),
    notify: "Click to Notify",
  }))
}

const mockAgents = generateMockAgents(20)

export default mockAgents
