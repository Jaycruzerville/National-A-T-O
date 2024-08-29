import React from "react"
import {
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  PaginationState,
  // PaginationState,
} from "@tanstack/react-table"
import {
  Box,
  Button,
  Flex,
  Image,
  // Progress,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import EmptyStateImg from "@/assets/tableEmptyState.svg"

type Props = {
  data: object[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any
  onRowClick?: (arg0: Record<string, string | number>) => void
  paddingBottom?: string
  height?: string
  loading?: boolean
  pagination?: {
    pageSize: number
    currentPage: number
    totalPages: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateFn: (args0: any) => void
  }
}

const EmptyState = () => {
  return (
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
}

const StyledTable = ({
  data,
  columns,
  onRowClick,
  paddingBottom,
  height,
  loading = false,
  pagination,
}: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [_pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: pagination ? pagination.currentPage - 1 : 0,
    pageSize: pagination ? pagination.pageSize : 10,
  })

  React.useEffect(() => {
    if (pagination) {
      const paginationUpdate = {
        pageSize: _pagination.pageSize,
        page: _pagination.pageIndex + 1,
      }
      pagination?.updateFn({ filterValues: paginationUpdate })
    }
  }, [_pagination])

  const TableLoader = () => {
    return (
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
              <EmptyState /> // This already exists in your table for when data is empty
            )}
          </Td>
        </Tr>
      </Tbody>
    )
  }

  const table = useReactTable({
    data,
    columns,
    pageCount: pagination?.totalPages ?? 1,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: _pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return (
    <Box>
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
                  _hover={{
                    background: "gray.500",
                  }}
                  onClick={() => {
                    onRowClick?.(
                      row.original as unknown as Record<string, string | number>
                    )
                  }}
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
            <TableLoader /> // This will handle both loading and empty states
          )}
        </Table>
      </TableContainer>
      {pagination && (
        <Box
          display="flex"
          justifyContent="end"
          gap="12px"
          alignItems="center"
          margin="12px 40px 18px"
        >
          <Text color="#2d4875" fontSize="14px">
            Show
          </Text>

          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            width="70px"
            color="#2d4875"
            fontSize="14px"
          >
            {[10, 20, 30, 40].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Text fontSize="14px" fontWeight="400" color="#2d4875">
            Results
          </Text>
          <Box display="flex" gap="8px" pl="38px" alignItems="baseline">
            <Button
              variant="outline"
              fontWeight="normal"
              fontSize="14px"
              width="65px"
              height="38px"
              color="#2d4875"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
            <Box
              border="1px solid #EBEBF2"
              height="38px"
              minWidth="38px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="14px" fontWeight="400" color="#2d4875">
                {table.getState().pagination.pageIndex + 1}
              </Text>
            </Box>
            ...
            <Box
              border="1px solid #EBEBF2"
              height="38px"
              minWidth="38px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="14px" fontWeight="400" color="#2d4875">
                {table.getPageCount()}
              </Text>
            </Box>
            <Button
              variant="outline"
              fontWeight="normal"
              fontSize="14px"
              width="65px"
              height="38px"
              color="#2d4875"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default StyledTable
