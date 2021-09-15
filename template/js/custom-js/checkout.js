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
               
        timeShipping.insertAdjacentHTML('afterend', htmlLink)
        clearInterval(tryAppendInterval)
        const htmlLink = '<br><a href="/acompanhar-pedido" target="blank">Acompanhar Pedido</a>'
      }
    }
    const tryAppendInterval = setInterval(appendLink, 200)
  }
})

storefront.on('widget:@ecomplus/widget-tag-manager', () => {
    setTimeout(() => {
        if((window.innerWidth < 767) && $('#cart').length) {
            $('.cart__discount').after($('.recommended-items'))
        }
    }, 800);
  });
