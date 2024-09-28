const path = require('path')
module.exports = () => ({
  resolve: {
    alias: {
      './js/ShippingCalculator.js': path.resolve(__dirname, 'template/js/custom-js/components/ShippingCalculator.js'),
      './html/ShippingCalculator.html': path.resolve(__dirname, 'template/js/custom-js/components/ShippingCalculator.html'),
      './js/QuantitySelector.js': path.resolve(__dirname, 'template/js/custom-js/js/QuantitySelector.js'),
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/components/APrices.html'),
      './html/DiscountApplier.html': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.html'),
      './js/DiscountApplier.js': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.js'),
      './html/PointsApplier.html': path.resolve(__dirname, 'template/js/custom-js/html/PointsApplier.html'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.html'),
      './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/html/CartItem.html'),
      './html/EcSummary.html': path.resolve(__dirname, 'template/js/custom-js/html/EcSummary.html'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.js'),
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/custom-js/components/ProductGallery.html'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.js'),
      './html/EcOrderInfo.html': path.resolve(__dirname, 'template/js/custom-js/components/EcOrderInfo.html'),
      './html/EcCheckout.html': path.resolve(__dirname, 'template/js/custom-js/components/EcCheckout.html'),
      './js/EcCheckout.js': path.resolve(__dirname, 'template/js/custom-js/components/EcCheckout.js')
      // './js/LoginBlock.js': path.resolve(__dirname, 'template/js/custom-js/js/LoginBlock.js')
    }
  }
})
