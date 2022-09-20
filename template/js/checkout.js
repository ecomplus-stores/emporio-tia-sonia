import '#template/js/checkout'
import './custom-js/checkout'
import ecomCart from '@ecomplus/shopping-cart'
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
      if((window.innerWidth < 767) && $('#cart').length) {
          $('.cart__discount').after($('.recommended-items'))
          const $points = document.querySelector('.prices__points')
          let points = document.querySelector('.prices__points span').innerText.replace('+', '').trim()
          let transformToMoney = (Number(points) * 0.05).toFixed(2)
          const $money =  `<div id="dinheiro-volta"><span><strong>Ganhe</strong> <span class="dinheiro"> <strong id="changeMoney">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transformToMoney)}</strong></span> / <span class="pontos"><strong> (<span id="pontoschange">${points}</span> Pontos)</strong></span> <br> em cashback na sua próxima compra</span></div>`
          const $div = document.createElement('div')
          $div.id = 'cashback'
          $div.insertAdjacentElement('afterbegin', $points)
          $div.insertAdjacentHTML('afterbegin', $money)
          $('.cart__list').after($div)
          ecomCart.on('change', ({ data }) => {
            setTimeout(() => {
              points = document.querySelector('.prices__points span').innerText.replace('+', '').trim()
              transformToMoney = (Number(points) * 0.05).toFixed(2)
              document.getElementById('changeMoney').innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transformToMoney)
              document.getElementById('pontoschange').innerText = points
            }, 800)
          })
      }
    if (document.getElementById('account').length) {
      document.getElementById('account').insertAdjacentHTML('beforebegin', '<center>Em função de alterações em nosso processo logístico, alguns pedidos de setembro estão sofrendo atrasos na entrega.<br>Pedimos desculpa pelo transtorno. Nossa equipe está trabalhando para ajustar todas as entregas.<br>Estamos avaliando cada pedido com esse problema para dar um retorno sobre a nova data de entrega.</center>')
    }
  }, 800);
});
