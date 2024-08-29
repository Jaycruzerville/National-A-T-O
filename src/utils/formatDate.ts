export function formatDate(timestamp: string): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const dateObj = new Date(timestamp)
  const day = dateObj.getDate()
  const month = dateObj.getMonth() // Months are zero-based, so January is 0 and December is 11
  const year = dateObj.getFullYear()

  const formattedDate = `${day} ${months[month]} ${year}`
  return formattedDate
}
