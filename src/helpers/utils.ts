export function formatAMPM(date: Date | ''): string {
  if (!date) {
    return '-'
  }

  // hour
  let hours = date.getHours()
  // am, pm
  let ampm = hours >= 12 ? 'pm' : 'am'

  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  // min
  let minutes = date.getMinutes()
  const minutesStr = minutes < 10 ? '0' + minutes : minutes

  const strTime = hours + ':' + minutesStr + ' ' + ampm
  return strTime
}
