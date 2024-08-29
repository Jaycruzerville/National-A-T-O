export function getYearsList(years: number): string[] {
  const currentYear: number = new Date().getFullYear()
  const yearsList: number[] = []

  for (let i = 0; i <= years; i++) {
    const year: number = currentYear - i
    yearsList.push(year)
  }

  const stringYearsList: string[] = yearsList.map((year: number) =>
    year.toString()
  )
  return stringYearsList
}

export const getMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
