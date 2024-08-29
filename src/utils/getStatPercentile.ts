type PercentChange = {
  percentageChange: number
  changeType: "INCREASE" | "DECREASE"
}

export function getPercentageChange(
  current: number,
  previous: number
): PercentChange {
  let percentageChange = 0
  if (previous === 0 && current > 0) {
    percentageChange = 100
  } else if (previous === 0 && current == 0) {
    percentageChange = 0
  } else {
    percentageChange = ((current - previous) / previous) * 100
  }
  const _percentageChange = isNaN(percentageChange) ? 0 : percentageChange
  const changeType: "INCREASE" | "DECREASE" =
    _percentageChange >= 0 ? "INCREASE" : "DECREASE"

  return {
    percentageChange: Math.round(_percentageChange),
    changeType,
  }
}
