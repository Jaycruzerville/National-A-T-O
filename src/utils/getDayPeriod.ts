const now = new Date()

const isMorning = now.getHours() > 5 && now.getHours() <= 12
const isAfternoon = now.getHours() > 12 && now.getHours() <= 17
const isEvening = now.getHours() > 17 && now.getHours() <= 22
const isNight = now.getHours() > 22 || now.getHours() <= 5

export const getDayPeriod = () => {
  if (isMorning) return "Morning"
  if (isAfternoon) return "Afternoon"
  if (isEvening) return "Evening"
  if (isNight) return "Night"
}
