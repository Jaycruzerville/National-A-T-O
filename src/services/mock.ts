// mockService.ts

import { mockProperties } from "@/data/claims"

type Driver = {
  firstName: string
  lastName: string
  status: string
  // Add any other fields that exist in the mockProperties objects
}

type GetDriverParams = {
  pageSize: number
  page: number
  searchQuery?: string
  status?: string
}

type GetDriverResponse = {
  data: Driver[]
  pagination: {
    numberOfPages: number
  }
}

const mock = {
  getDriver: async ({
    pageSize,
    page,
    searchQuery,
    status,
  }: GetDriverParams): Promise<GetDriverResponse> => {
    let filteredProperties: Driver[] = mockProperties

    if (searchQuery) {
      filteredProperties = filteredProperties.filter((Driver) =>
        `${Driver.firstName} ${Driver.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    }

    if (status) {
      filteredProperties = filteredProperties.filter(
        (Driver) => Driver.status === status
      )
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedProperties = filteredProperties.slice(start, end)

    return {
      data: paginatedProperties,
      pagination: {
        numberOfPages: Math.ceil(filteredProperties.length / pageSize),
      },
    }
  },
}

export default mock
