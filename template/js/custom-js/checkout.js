// Add your custom JavaScript for checkout here.
import {
  $ecomConfig,
  name as getName,
  price as getPrice,
  nickname as getNickname
} from '@ecomplus/utils'

const urlParams = new URLSearchParams(window.location.search)
const fbclid = urlParams.get('fbclid') || window.sessionStorage.getItem('fb_cookie')
const sentMetafield = Number(window.sessionStorage.getItem('sent_metafield'))
window.sessionStorage.setItem('fb_cookie', fbclid)
const currencyCode = $ecomConfig.get('currency') || 'BRL'

const getProductData = item => {
  const [name, ...variants] = getName(item).split(' / ')
  const productData = {
    name,
    id: item.sku,
    price: getPrice(item).toFixed(2)
  }
  if (variants && variants.length) {
    productData.variant = variants.join(' / ')
  } else if (item.variation_id) {
    productData.name = name.replace(window.__customGTMVariantRegex || /\s[^\s]+$/, '')
    productData.variant = name.replace(productData.name, '').trim()
  }
  if (item.quantity) {
    productData.quantity = item.quantity
  }
  return productData
}

const getCartProductsList = () => {
  const products = []
  if (ecomCart.data && Array.isArray(ecomCart.data.items)) {
    ecomCart.data.items.forEach(item => {
      products.push(getProductData(item))
    })
  }
  return products
}

const routerToLink = window.storefrontApp && window.storefrontApp.router
routerToLink.afterEach(({ name }) => {
  if(name === 'order') {
    const appendLink = () => {
      const pedido = document.getElementById('order') || false
      const statusOrderPaid = document.querySelector('.order-info__financial-status--paid') || false
      if (pedido && statusOrderPaid) {
        const timeShipping = document.querySelector('.shipping-line')
        const shippingtTracking = document.querySelector('.order-info__shipping-tracking')
        const htmlLink = '<br><a href="https://www.emporiotiasonia.com.br/pages/rastreio-seu-pedido" target="blank">Acompanhar Pedido</a>'
        if (timeShipping && shippingtTracking) {
          shippingtTracking.insertAdjacentHTML('afterend', htmlLink)   
        } else {
          timeShipping.insertAdjacentHTML('afterend', htmlLink)
        }        
        clearInterval(tryAppendInterval)
        
      }
    }
    const tryAppendInterval = setInterval(appendLink, 200)
  } else if (name === 'checkout') {
    console.log('chegamos')
    const tryCustomerInterval = setInterval(() => {
      const customer = {
        ...JSON.parse(window.sessionStorage.getItem('ecomCustomerAccount')),
        ...storefrontApp.customer
      }
      if (customer.main_email) {
        const customerPurchaseData = {}
        if (customer) {
          customerPurchaseData.customerDisplayName = getNickname(customer )
          if (customer.name) {
            customerPurchaseData.customerGivenName = customer.name.given_name
            customerPurchaseData.customerFamilyName = customer.name.family_name
          }
          customerPurchaseData.customerEmail = customer.main_email
          customerPurchaseData.customerPhone = window.ecomUtils.phone(customer)
          window.dataLayer.push({
            event: 'customerExtraDataCheckout',
            ...customerPurchaseData,
            ecommerce: {
              currencyCode,
              checkout: {
                products: getCartProductsList()
              }
            }
          })
          clearInterval(tryCustomerInterval)
        }
      }
    }, 500)
  } else if (name === 'confirmation') {
    const orderId = routerToLink.currentRoute &&  routerToLink.currentRoute.params && routerToLink.currentRoute.params.id
    console.log('enviado metafield', sentMetafield)
    if (orderId && fbclid && !sentMetafield) {
      console.log('cookie', fbclid, orderId)
      window.ecomPassport.requestApi(`/orders/${orderId}/metafields.json`, 'POST', {
        namespace: 'fb_cookie',
        field: 'pixel:cookie',
        value: fbclid
      }).then(() => {
        window.sessionStorage.setItem('sent_metafield', 1)
      })
    }
  }
})

