/* eslint-disable quotes, comma-dangle */
const holidays = [
  // https://brasilapi.com.br/api/feriados/v1/2024
  "2024-01-01",
  "2024-02-13",
  "2024-03-29",
  "2024-03-31",
  "2024-04-21",
  "2024-05-01",
  "2024-05-30",
  "2024-09-07",
  "2024-10-12",
  "2024-11-02",
  "2024-11-15",
  "2024-11-20",
  "2024-12-25",
  // SP
  "2024-07-09",
]
const getDateStr = (d) => {
  return `${d.getFullYear()}-` +
    `${(d.getMonth() + 1).toString().padStart(2, '0')}-` +
    `${d.getDate().toString().padStart(2, '0')}`
}
const checkHoliday = (d) => {
  const weekDay = d.getDay()
  if (weekDay === 0 || weekDay === 6) return true
  const dateStr = getDateStr(d)
  return holidays.some((_dateStr) => _dateStr === dateStr)
}

const middShippingDeadline = (shippingLine) => {
  if (shippingLine.delivery_time && shippingLine.delivery_time.days > 1) return null
  if (shippingLine.discount) return null
  if (shippingLine.flags && shippingLine.flags.length) return null
  const date = new Date()
  let deliveryDayStr = ''
  if (date.getHours() < 11 && !checkHoliday(date)) {
    deliveryDayStr = 'hoje'
  } else {
    let daysDiff = 0
    do {
      daysDiff += 1
      date.setDate(date.getDate() + 1)
    } while (checkHoliday(date))
    if (daysDiff === 1) {
      deliveryDayStr = 'amanhã'
    } else {
      switch (date.getDay()) {
        case 1:
          deliveryDayStr = 'segunda'; break
        case 2:
          deliveryDayStr = 'terça'; break
        case 3:
          deliveryDayStr = 'quarta'; break
        case 4:
          deliveryDayStr = 'quinta'; break
        default:
          deliveryDayStr = 'sexta'
      }
    }
  }
  return `Receba ${deliveryDayStr}`
}

window.propsShippingLine = {
  getDeadlineStr: ({ shippingLine }) => {
    return middShippingDeadline(shippingLine)
  }
}
