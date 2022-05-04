// Add your custom JavaScript for storefront pages here.
!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);

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



// if($('#page-products').length){
//     $('.shipping-calculator').insertAfter('#product-actions .product__buy');
// }


// ALPIX - SEARCH BY VOICE
const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

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
  info.textContent = "Your Browser does not support Speech Recognition";
}