// mockService.ts

import { mockProperties } from "@/data/claims"

type Property = {
  firstName: string
  lastName: string
  status: string
  // Add any other fields that exist in the mockProperties objects
}

type GetPropertyParams = {
  pageSize: number
  page: number
  searchQuery?: string
  status?: string
}

type GetPropertyResponse = {
  data: Property[]
  pagination: {
    numberOfPages: number
  }
}

const mock = {
  getProperty: async ({
    pageSize,
    page,
    searchQuery,
    status,
  }: GetPropertyParams): Promise<GetPropertyResponse> => {
    let filteredProperties: Property[] = mockProperties

    if (searchQuery) {
      filteredProperties = filteredProperties.filter((property) =>
        `${property.firstName} ${property.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    }

    if (status) {
      filteredProperties = filteredProperties.filter(
        (property) => property.status === status
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
