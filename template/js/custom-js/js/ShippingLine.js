import {
  i19days,
  i19free,
  i19freeShipping,
  // i19pickUpToday,
  i19receiveToday,
  i19untilTomorrow,
  i19upTo,
  i19workingDays
} from '@ecomplus/i18n'
  
import {
  i18n,
  formatMoney
} from '@ecomplus/utils'
  
const i19pickUpToday = 'Retire hoje'
  
export default {
  name: 'ShippingLine',
  
  props: {
    shippingLine: {
      type: Object,
      required: true
    },
    productionDeadline: {
      type: Number,
      default: 0
    }
  },
  
  computed: {
    deadlineStr () {
      const shipping = this.shippingLine
      const isWorkingDays = (shipping.posting_deadline && shipping.posting_deadline.working_days) ||
        (shipping.delivery_time && shipping.delivery_time.working_days)
      let days = shipping.posting_deadline ? shipping.posting_deadline.days : 0
      if (shipping.delivery_time) {
        days += shipping.delivery_time.days
      }
      days += this.productionDeadline
      console.log(days)
      let date = new Date()
      let today = date.getDay()
      date.setDate(date.getDate() + days + (today === 6 ? 2 : +!today) + (Math.floor((days - 1 + (today % 6 || 1)) / 5) * 2));
      return 'Até ' + date.toLocaleDateString();
    },
  
    freightValueStr () {
      const { shippingLine } = this
      const freight = typeof shippingLine.total_price === 'number'
        ? shippingLine.total_price
        : shippingLine.price
      if (freight) {
        return formatMoney(freight)
      } else {
        return i18n(shippingLine.pick_up ? i19free : i19freeShipping)
      }
    }
  }
}