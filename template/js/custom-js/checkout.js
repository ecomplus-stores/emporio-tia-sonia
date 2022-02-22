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
        const htmlLink = '<br><a href="/acompanhar-pedido" target="blank">Acompanhar Pedido</a>'
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

storefront.on('widget:@ecomplus/widget-tag-manager', () => {
    setTimeout(() => {
        if((window.innerWidth < 767) && $('#cart').length) {
            $('.cart__discount').after($('.recommended-items'))
        }
        const $points = document.querySelector('.prices__points')
        const points = document.querySelector('.prices__points span').innerText.replace('+', '').trim()
        const transformToMoney = (Number(points) * 0.05).toFixed(2)
        const $money =  `<div id="dinheiro-volta"><span><strong>Ganhe</strong> <span class="dinheiro">R$ ${transformToMoney}</span> <br> de cashback em sua próxima compra</span></div>`
        const $div = document.createElement('div')
        $div.id = 'cashback'
        $div.insertAdjacentElement('afterbegin', $points)
        $div.insertAdjacentHTML('afterbegin', $money)
        $('.cart__list').after($div)
        
    }, 800);
  });
