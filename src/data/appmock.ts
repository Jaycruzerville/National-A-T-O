// mockData.js
import { faker } from "@faker-js/faker"

const generateMockAgents = (count: any) => {
  const statusOptions = ["ACTIVE", "INACTIVE"]
  return Array.from({ length: count }, () => ({
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    agentCode: `A-${faker.datatype.number({ min: 1000, max: 9999 })}`,
    phoneNumber: faker.phone.number("+1-###-###-####"),
    businessAddress: faker.address.streetAddress(),
    registeredUsers: `${faker.datatype.number({ min: 0, max: 1000 })}`,
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    lastActiveDate: faker.date.past().toISOString(),
    dateCreated: faker.date.past().toISOString(),
    createdAt: faker.date.past().toISOString(),
  }))
}

const mockAgents = generateMockAgents(50)

export default mockAgents
