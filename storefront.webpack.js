const path = require('path')
console.log(path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'))
module.exports = () => ({
  resolve: {
    alias: {
      './js/ShippingLine.js': path.resolve(__dirname, 'template/js/custom-js/js/ShippingLine.js'),
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/components/APrices.html'),
      './html/DiscountApplier.html': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.html'),
      './js/DiscountApplier.js': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.js'),
      './html/PointsApplier.html': path.resolve(__dirname, 'template/js/custom-js/html/PointsApplier.html'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.html'),
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
