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
