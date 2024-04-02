import Vue from 'vue'
import EcomSearch from '@ecomplus/search-engine'
import ecomCart from '@ecomplus/shopping-cart'
import './tags'

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('lpcid') || window.sessionStorage.getItem('_lpcid')) {
  // livelo
  setTimeout(() => {
    window.ecomCart.on('addItem', () => {
      if (window.confirm('Finalizar pedido?\nClique em "cancelar" para continuar comprando.')) {
        window.location = '/app/'
      }
    })
  }, 1000)
  window.sessionStorage.setItem('_lpcid', urlParams.get('lpcid'))
}

const affiliateLinkDiv = document.getElementById('affiliate-link')
if (affiliateLinkDiv) {
  import('./components/AffiliateLink.vue').then(({ default: AffiliateLink }) => {
    new Vue(AffiliateLink).$mount(affiliateLinkDiv)
  })
}

const freeShippingProgress = document.getElementById('free-shipping-progress')
if (freeShippingProgress) {
  const freeShippingFrom = Number(freeShippingProgress.innerHTML.replace(/.*R\$\s?(\d+).*/, '$1'))
  if (freeShippingFrom) {
    const updateFreeShippingProgress = ({ data }) => {
      const freeFromPercentage = Math.round(data.subtotal * 100 / freeShippingFrom)
      freeShippingProgress.innerHTML = String.raw`
      <div class="free-shipping-progress">
        <div>
          ${data.subtotal >= freeShippingFrom
            ? 'VOCÊ GANHOU FRETE GRÁTIS!'
            : `Faltam <b>R$ ${Math.round(freeShippingFrom - data.subtotal)}</b> para frete grátis`}
        </div>
        ${freeFromPercentage < 100
            ? String.raw`
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: ${freeFromPercentage}%"
                aria-valuenow="${freeFromPercentage}"
                aria-valuemin="0"
                aria-valuemax="100"
              >
              </div>
            </div>`
            : String.raw`
            <div>
              <i class="i-shipping-fast mr-1"></i>
              <i class="i-check" style="color: #18a662"></i>
            </div>`}
      </div>`
    }
    ecomCart.on('change', updateFreeShippingProgress)
    setTimeout(() => {
      const { data } = ecomCart
      if (data.subtotal) {
        updateFreeShippingProgress({ data })
      }
    }, 1000)
  }
}

if (window.location.pathname === '/pages/ofertas') {
  const timestamp = Date.now()
  EcomSearch.dslMiddlewares.push((dsl) => {
    dsl.query.bool.filter.push({
      script: {
        script: {
          lang: 'painless',
          source: "doc['price'].value > 0 && doc['base_price'].value > 0" +
            " && (doc['price_effective_date.start'].empty || " +
              `doc['price_effective_date.start'].date.millis <= ${timestamp}L)` +
            " && (doc['price_effective_date.end'].empty || " +
              `doc['price_effective_date.end'].date.millis >= ${timestamp}L)` +
            " ? doc['base_price'].value > doc['price'].value : false"
        }
      }
    })
  })
}

// Add your custom JavaScript for storefront pages here.
if (window.storefront && window.storefront.context && window.storefront.context.resource === 'products') {
  storefront.on('widget:@ecomplus/widget-tag-manager', function () {
    setTimeout(function () {
      const $points = document.querySelector('.product__prices .prices__points')
      let points = document.querySelector('.product__prices .prices__points span').innerText.replace('+', '').trim()
      let transformToMoney = (Number(points) * 0.05).toFixed(2)
      const $money =  `<div id="dinheiro-volta"><a href="https://www.emporiotiasonia.com.br/pages/programa-de-fidelidade"><span>Ganhe <span class="dinheiro"><strong nid="changeMoney">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transformToMoney)}</strong></span> na próxima compra</span></a></div>`
      $('.product__buy').after($money)
      if ($('.product__kit').length) {
        $('.product__kit').after($money)
      }
      if (storefront && storefront.context && storefront.context.resource === 'products') {
        const aggregate = document.querySelector('#trustvox-rating').innerText.split(' ')[0]
        const totalReview = document.querySelector('#trustvox-rating').innerText.split(' ')[4].replace('(', '').replace(')', '').replace('\n', '').replace('Ver', '')
        console.log(aggregate)
        console.log(totalReview)
        let jsonLdScript = document.getElementById('product-info');
        let jsonld = JSON.parse(jsonLdScript.innerText); 
        jsonld.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": aggregate,
          "ratingCount": totalReview
        }
        let newJson = JSON.stringify(jsonld)
        jsonLdScript.innerText = newJson
        const reviewList = document.querySelectorAll('.ts-product-reviews-list-item')
        console.log(reviewList)
        const bodyProduct = storefront.context.body
        if (reviewList.length) {
          reviewList.forEach(review => {
            review.insertAdjacentHTML('afterbegin', `<meta itemprop="itemReviewed" content="${bodyProduct.name}">`)
          })
        }
      }
    }, 500);
  });
}

!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);
//jquery
$('.header__search-input').keyup(function(){
    $('body .search__input').val($(this).val())[0].dispatchEvent(new Event('input'));
});
$(document).ready(function(){
    $('.product-card__name').equalHeights();
});
$('body').click(function(e){
    if($(e.target).closest('.header__search').length == 0){
        $('#instant-search .search__status .close').click();
    }
});

$('.header__toggler.new, .menu__ .menu-trigger').click(function(){
    $('.menu__').toggleClass('isVisible');
});
$('.dropdown-menu-trigger').click(function(){
    $(this).closest('li').toggleClass('dropdown-mobile-active')
})

$('.ppts-faq-list button').click(function(){
  $(this).toggleClass('active');
  $(this).closest('li').find('.response').toggle();
})



// if($('#page-products').length){
//     $('.shipping-calculator').insertAfter('#product-actions .product__buy');
// }


// ALPIX - SEARCH BY VOICE
const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || false; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "pt-BR";

  searchForm.insertAdjacentHTML("afterbegin", '<button type="button"><svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 10C13 13.3137 10.3137 16 7 16M7 16C3.68629 16 1 13.3137 1 10M7 16V19M7 19H10M7 19H4M7 13C5.34315 13 4 11.6569 4 10V4C4 2.34315 5.34315 1 7 1C8.65685 1 10 2.34315 10 4V10C10 11.6569 8.65685 13 7 13Z" stroke="#4698ca" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
    function micBtnClick() {
    //if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    //}
    //else {
//      recognition.stop();
    //}
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
    $('.header__search-input').trigger('keyup')
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="stop recording") {
      recognition.stop();
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="go") {
        searchForm.submit();
      }
      else if(transcript.toLowerCase().trim()==="reset input") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
  //info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
  //info.textContent = "Your Browser does not support Speech Recognition";
}

if (window.ecomPassport.checkLogin()) {
  const customer = ecomPassport.getCustomer()
  const customerPurchaseData = {}
  let shippingAddr
  if (customer) {
    customerPurchaseData.customerDisplayName = window.ecomUtils.nickname(customer)
    if (customer.name) {
      customerPurchaseData.customerGivenName = customer.name.given_name
      customerPurchaseData.customerFamilyName = customer.name.family_name
    }
    customerPurchaseData.customerEmail = customer.main_email
    customerPurchaseData.customerPhone = window.ecomUtils.phone(customer)
    shippingAddr = customer.addresses && customer.addresses[0]
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
}
