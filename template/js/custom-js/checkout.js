// Add your custom JavaScript for checkout here.
const routerToLink = window.storefrontApp && window.storefrontApp.router
routerToLink.afterEach(({ name }) => {
  if(name === 'order') {
    const appendLink = () => {
      const pedido = document.getElementById('order') || false
      const statusOrderPaid = document.querySelector('.order-info__financial-status--paid') || false
      if (pedido && statusOrderPaid) {
        const timeShipping = document.querySelector('.shipping-line')
        const shippingtTracking = document.querySelector('.order-info__shipping-tracking')
        //const htmlLink = '<br><a href="/acompanhar-pedido" target="blank">Acompanhar Pedido</a>'
        if (timeShipping && shippingtTracking) {
          shippingtTracking.insertAdjacentHTML('afterend', htmlLink)   
        } else {
          timeShipping.insertAdjacentHTML('afterend', htmlLink)
        }        
        clearInterval(tryAppendInterval)
        
      }
    }
    const tryAppendInterval = setInterval(appendLink, 200)
  }
})

/* BEE VIRAL*/
<div id="app_cw_widget"></div>
import ecomPassport from '@ecomplus/passport-client'
function initbvWidgetShared() {
    const router = window.storefrontApp && window.storefrontApp.router
    const addConfirmationBanner = ({name, params}) => { 
        if (name === "confirmation" && params.json) {
            let order
            const orderJson = decodeURIComponent(params.json)
            if (orderJson) {
                try {
                    order = JSON.parse(orderJson)
                } catch (e) {
                }
            }
            if (order) {
                const customer = ecomPassport.getCustomer()
                const customerName = `${customer.name.given_name} ${customer.name.family_name}`
                const $confirmDiv = document.querySelector('#confirmation')
                $confirmDiv.insertAdjacentHTML('afterbegin','<div id="app_cw_widget"></div>')
                var bvWidgetShared = new window.bvWidgetShared();
                bvWidgetShared.Init({
                    host: "https://account.beeviral.app",
                    element: "app_cw_widget",
                    campaign_token: "UU9Ka1NqZTVYanhudjc5SnhQVVhLZz09",
                    name: customerName,
                    email: customer.main_email,
                    phone: "",
                    valorconversao: `${order.amount.total}`,
                    sendreferralrequest: "N",
                    content: "",
                    status: "Convertido"
                });
            }
        }
    }
    if (router.currentRoute) {
      addConfirmationBanner(router.currentRoute)
    }
      router.afterEach(addConfirmationBanner)
}
function initializebvWidgetShared(i, t) {
  var e;
  i.getElementById(t) ? initbvWidgetShared() : ((
      e = i.createElement("script")).id = t
      , e.async = !0
      , e.src = "https://account.beeviral.app/Scripts/app/widget_sharing.js"
      , e.onload = initbvWidgetShared
      , i.head.appendChild(e))
}
function initiateCallbvWidgetShared() {
  initializebvWidgetShared(document, "bvWidgetShared-js-sdk")
}
window.addEventListener ? window.addEventListener("load", initiateCallbvWidgetShared, !1) : window.attachEvent("load", initiateCallbvWidgetShared, !1);
