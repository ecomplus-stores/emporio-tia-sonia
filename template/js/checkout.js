import '#template/js/checkout'
import './custom-js/checkout'
import ecomCart from '@ecomplus/shopping-cart'
import {
  nickname as getNickname,
  phone as getPhone
} from '@ecomplus/utils'
const lessUnit = document.getElementById('lessUnit')
const firstphrase = document.getElementById('lessSome')
const lastphrase = document.getElementById('noMore')
const lessQuantity = 199
if(lessUnit) {
  lessUnit.innerHTML = window.ecomUtils.formatMoney(lessQuantity, 'BRL', 'pt_br')
  ecomCart.on('change', ({ data }) => {
    const cartCalc = document.querySelectorAll('#cart')
    if (cartCalc.length) {
      document.getElementById('containerCalc').style.display = 'block'
      let percentBar
      const countQuantity = data.subtotal
      const evalQuantity = lessQuantity - countQuantity
      if (evalQuantity > 0) {
        lessUnit.innerHTML = window.ecomUtils.formatMoney(evalQuantity, 'BRL', 'pt_br')
        percentBar = Math.round(countQuantity / lessQuantity * 100) + '%'
        document.getElementById('lastUnitsBar').style.width = percentBar
        document.getElementById('percentBar').innerHTML = percentBar
        firstphrase.style.display = 'block'
        lastphrase.style.display = 'none'
      } else {
        percentBar = '100%'
        firstphrase.style.display = 'none'
        lastphrase.style.display = 'block'
        document.getElementById('lastUnitsBar').style.width = percentBar
        document.getElementById('percentBar').innerHTML = percentBar
      }
    } else {
      document.getElementById('containerCalc').style.display = 'none'
    }
  })
}

storefront.on('widget:@ecomplus/widget-tag-manager', () => {
  setTimeout(() => {
      if($('#cart').length) {
        const $points = document.querySelector('.prices__points')
        let cashback = document.querySelector('.prices__points span').innerText.trim()
        const $money =  `<div id="dinheiro-volta"><span><strong>Cashback! GANHE </strong> <span class="dinheiro"> <strong id="changeMoney">${cashback}</strong></span> em sua próxima compra!</span></div>`
        const $div = document.createElement('div')
        $div.id = 'cashback'
        $div.insertAdjacentElement('afterbegin', $points)
        $div.insertAdjacentHTML('afterbegin', $money)
        $('.cart__list').after($div)
        ecomCart.on('change', ({ data }) => {
          setTimeout(() => {
            let cashback = document.querySelector('.prices__points span').innerText.trim()
            document.getElementById('changeMoney').innerText = cashback
          }, 800)
        })
        if (window.innerWidth < 767) {
          $('.cart__discount').after($('.recommended-items'))
        }
      }
  }, 800);
});


window.__sendGTMExtraPurchaseData = true

if (window.ecomPassport.checkLogin()) {
  const customer = ecomPassport.getCustomer()
  const customerPurchaseData = {}
  let shippingAddr
  if (customer) {
    customerPurchaseData.customerDisplayName = getNickname(customer)
    if (customer.name) {
      customerPurchaseData.customerGivenName = customer.name.given_name
      customerPurchaseData.customerFamilyName = customer.name.family_name
    }
    customerPurchaseData.customerEmail = customer.main_email
    customerPurchaseData.customerPhone = getPhone(customer)
    shippingAddr = customer.addresses && customer.addresses[0]
  }
  try {
    const sessionShippingAddr = JSON.parse(window.sessionStorage
      .getItem('ecomCustomerAddress'))
    if (typeof shippingAddr === 'object' && shippingAddr) {
      Object.assign(shippingAddr, sessionShippingAddr)
    } else {
      shippingAddr = sessionShippingAddr
    }
  } catch {
  }
  if (shippingAddr && shippingAddr.zip) {
    customerPurchaseData.shippingAddrZip = shippingAddr.zip
    customerPurchaseData.shippingAddrStreet = shippingAddr.street
    customerPurchaseData.shippingAddrNumber = shippingAddr.number
    if (shippingAddr.street && shippingAddr.number) {
      customerPurchaseData.shippingAddrStreet += `, ${shippingAddr.number}`
    }
    customerPurchaseData.shippingAddrCity = shippingAddr.city
    customerPurchaseData.shippingAddrProvinceCode = shippingAddr.province_code
  }
  window.dataLayer.push({
    event: 'customerExtraData',
    ...customerPurchaseData
  })
}
