const path = require('path')
console.log(path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'))
module.exports = () => ({
  resolve: {
    alias: {
      './js/ShippingLine.js': path.resolve(__dirname, 'template/js/custom-js/js/ShippingLine.js'),
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/components/APrices.html'),
      './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/components/TheCart.html'),
      './html/DiscountApplier.html': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.html'),
      './js/DiscountApplier.js': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.js'),
      './html/PointsApplier.html': path.resolve(__dirname, 'template/js/custom-js/html/PointsApplier.html'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.html'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/html/ProductCard.js'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.js'),
      './html/EcOrderInfo.html': path.resolve(__dirname, 'template/js/custom-js/components/EcOrderInfo.html')
      //'./js/LoginBlock.js': path.resolve(__dirname, 'template/js/custom-js/js/LoginBlock.js')
    }
  }
})
