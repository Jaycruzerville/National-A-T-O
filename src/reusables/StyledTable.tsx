import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Spinner,
  Image,
  Select,
} from "@chakra-ui/react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table"
import EmptyStateImg from "@/assets/tableEmptyState.svg"

type Props = {
  data: object[]
  columns: any // eslint-disable-line @typescript-eslint/no-explicit-any
  onRowClick?: (row: Record<string, string | number>) => void
  paddingBottom?: string
  height?: string
  loading?: boolean
  pagination?: {
    pageSize: number
    currentPage: number
    totalPages: number
    updateFn: (args: any) => void // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

const EmptyState = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100%"
    flexDirection="column"
    gap="20px"
  >
    <Image src={EmptyStateImg} alt="empty-table" />
    <Text fontSize="md">No data</Text>
  </Flex>
)

const StyledTable = ({
  data,
  columns,
  onRowClick,
  paddingBottom,
  height,
  loading = false,
  pagination,
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const [_pagination, setPagination] = useState({
    pageIndex: pagination ? pagination.currentPage - 1 : 0,
    pageSize: pagination ? pagination.pageSize : 10,
  })

  useEffect(() => {
    if (pagination) {
      const paginationUpdate = {
        pageSize: _pagination.pageSize,
        page: _pagination.pageIndex + 1,
      }
      pagination?.updateFn({ filterValues: paginationUpdate })
    }
  }, [_pagination])

  const table = useReactTable({
    data,
    columns,
    pageCount: pagination?.totalPages ?? 1,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, pagination: _pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return (
    <Box overflowX="auto" padding="10px">
      <TableContainer minH={height && height}>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    fontSize="14px"
                    fontWeight={700}
                    color="brand.primary"
                    p="0.5rem"
                    textTransform="capitalize"
                    letterSpacing="0px"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          {data?.length > 0 ? (
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  cursor="pointer"
                  _hover={{ background: "gray.500" }}
                  onClick={() =>
                    onRowClick?.(
                      row.original as unknown as Record<string, string | number>
                    )
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      color="#2D4875"
                      fontSize="12px"
                      textTransform="capitalize"
                      px="0.5rem"
                      pt="12px"
                      pb={paddingBottom ? paddingBottom : "9px"}
                      borderBottom="#C0C9D8 1px solid"
                    >
                      {cell.getValue() ? (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : (
                        <Text fontSize="18px">-</Text>
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              <Tr height="50vh">
                <Td colSpan={columns.length} textAlign="center">
                  {loading ? (
                    <Box display="inline-block">
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="brand.primary"
                        size="lg"
                      />
                    </Box>
                  ) : (
                    <EmptyState />
                  )}
                </Td>
              </Tr>
            </Tbody>
          )}
        </Table>
      </TableContainer>
      {pagination && (
        <Flex
          justifyContent={{ base: "center", md: "end" }}
          gap={{ base: "8px", md: "12px" }}
          alignItems="center"
          margin={{ base: "12px 20px 18px", md: "12px 40px 18px" }}
          flexWrap="wrap"
        >
          <Text color="#2d4875" fontSize={{ base: "12px", md: "14px" }}>
            Show
          </Text>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            width={{ base: "60px", md: "70px" }}
            color="#2d4875"
            fontSize={{ base: "12px", md: "14px" }}
            size={{ base: "sm", md: "md" }}
          >
            {[10, 20, 30, 40].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Text
            fontSize={{ base: "12px", md: "14px" }}
            fontWeight="400"
            color="#2d4875"
          >
            Results
          </Text>
          <Flex
            gap={{ base: "4px", md: "8px" }}
            pl={{ base: "8px", md: "38px" }}
            alignItems="baseline"
            flexWrap="wrap"
          >
            <Button
              variant="outline"
              fontWeight="normal"
              fontSize={{ base: "12px", md: "14px" }}
              width={{ base: "50px", md: "65px" }}
              height={{ base: "32px", md: "38px" }}
              color="#2d4875"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size={{ base: "xs", md: "sm" }}
            >
              Prev
            </Button>
            <Box
              border="1px solid #EBEBF2"
              height={{ base: "32px", md: "38px" }}
              minWidth={{ base: "32px", md: "38px" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="400"
                color="#2d4875"
              >
                {table.getState().pagination.pageIndex + 1}
              </Text>
            </Box>
            <Text
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight="400"
              color="#2d4875"
            >
              ...
            </Text>
            <Box
              border="1px solid #EBEBF2"
              height={{ base: "32px", md: "38px" }}
              minWidth={{ base: "32px", md: "38px" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="400"
                color="#2d4875"
              >
                {table.getPageCount()}
              </Text>
            </Box>
            <Button
              variant="outline"
              fontWeight="normal"
              fontSize={{ base: "12px", md: "14px" }}
              width={{ base: "50px", md: "65px" }}
              height={{ base: "32px", md: "38px" }}
              color="#2d4875"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size={{ base: "xs", md: "sm" }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default StyledTable
