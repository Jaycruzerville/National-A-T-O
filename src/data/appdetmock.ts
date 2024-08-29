// mockData.js
import { faker } from "@faker-js/faker"

const generateMockAgents = (count: any) => {
  const statusOptions = ["ACTIVE", "INACTIVE"]
  return Array.from({ length: count }, () => ({
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    customerCode: `C-${faker.datatype.number({ min: 1000, max: 9999 })}`,
    phoneNumber: faker.phone.number("+1-###-###-####"),
    location: faker.address.streetAddress(),
    noOfPlans: `${faker.datatype.number({ min: 1, max: 10 })}`,
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    lastDateActive: faker.date.past().toISOString(),
    dateCreated: faker.date.past().toISOString(),
    lastPaymentDate: faker.date.past().toISOString(),
  }))
}

const mockAgents = generateMockAgents(50)

export default mockAgents
