import {
  i19addToFavorites,
  i19buy,
  i19connectionErrorProductMsg,
  i19outOfStock,
  i19unavailable
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  inStock as checkInStock,
  onPromotion as checkOnPromotion,
  price as getPrice,
  randomObjectId as genRandomObjectId,
} from '@ecomplus/utils'

import Vue from 'vue'
import { store } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import ALink from '@ecomplus/storefront-components/src/ALink.vue'
import APicture from '@ecomplus/storefront-components/src/APicture.vue'
import APrices from '@ecomplus/storefront-components/src/APrices.vue'
import ecomPassport from '@ecomplus/passport-client'
import { toggleFavorite, checkFavorite } from '@ecomplus/storefront-components/src/js/helpers/favorite-products'
import EcomSearch from '@ecomplus/search-engine'

// const sanitizeProductBody = body => {
//   const product = Object.assign({}, body)
//   delete product.body_html
//   delete product.body_text
//   delete product.specifications
//   delete product.inventory_records
//   delete product.price_change_records
//   return product
// }

const getExternalHtml = (varName, product) => {
  if (typeof window === 'object') {
    varName = `productCard${varName}Html`
    const html = typeof window[varName] === 'function'
      ? window[varName](product)
      : window[varName]
    if (typeof html === 'string') {
      return html
    }
  }
  return undefined
}

export default {
  name: 'ProductCard',

  components: {
    ALink,
    APicture,
    APrices
  },

  props: {
    product: Object,
    productId: String,
    isSmall: Boolean,
    headingTag: {
      type: String,
      default: 'h3'
    },
    buyText: String,
    transitionClass: {
      type: String,
      default: 'animated fadeIn'
    },
    canAddToCart: {
      type: Boolean,
      default: true
    },
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    },
    accountUrl: {
      type: String,
      default: '/app/#/account/'
    },
    isLoaded: Boolean,
    installmentsOption: Object,
    discountOption: Object
  },

  data () {
    return {
      body: {},
      isLoading: false,
      isWaitingBuy: false,
      isHovered: false,
      isFavorite: false,
      error: '',
      kitItems: []
    }
  },

  computed: {
    i19addToFavorites: () => i18n(i19addToFavorites),
    i19outOfStock: () => i18n(i19outOfStock),
    i19unavailable: () => i18n(i19unavailable),

    ratingHtml () {
      return getExternalHtml('Rating', this.body)
    },

    buyHtml () {
      return getExternalHtml('Buy', this.body)
    },

    footerHtml () {
      return getExternalHtml('Footer', this.body)
    },

    name () {
      return getName(this.body)
    },

    strBuy () {
      return this.buyText ||
        (typeof window === 'object' && window.productCardBuyText) ||
        i18n(i19buy)
    },

    isInStock () {
      return checkInStock(this.body)
    },

    isActive () {
      return this.body.available && this.body.visible && this.isInStock
    },

    isLogged () {
      return ecomPassport.checkAuthorization()
    },

    discount () {
      const { body } = this
      return checkOnPromotion(body)
        ? Math.round(((body.base_price - getPrice(body)) * 100) / body.base_price)
        : 0
    },

    stamps () {
      const allStamps = (typeof window === 'object' && window.productCardStamps)
      if (Array.isArray(allStamps)) {
        return allStamps.filter(({ skus }) => {
          return skus && skus.includes(this.body.sku)
        })
      }
      return []
    }
  },

  methods: {
    setBody (data) {
      this.body = Object.assign({}, data)
      delete this.body.body_html
      delete this.body.body_text
      delete this.body.inventory_records
      delete this.body.price_change_records
      this.isFavorite = checkFavorite(this.body._id, this.ecomPassport)
    },

    fetchItem () {
      if (this.productId) {
        this.isLoading = true
        store({ url: `/products/${this.productId}.json` })
          .then(({ data }) => {
            this.$emit('update:product', data)
            this.setBody(data)
            this.$emit('update:is-loaded', true)
          })
          .catch(err => {
            console.error(err)
            if (!this.body.name || !this.body.slug || !this.body.pictures) {
              this.error = i18n(i19connectionErrorProductMsg)
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },

    toggleFavorite () {
      if (this.isLogged) {
        this.isFavorite = toggleFavorite(this.body._id, this.ecomPassport)
      }
    },
    qtd (el,quantity) { 
      const { body } = this     
      let me = $("[product_quantity='"+ el +"']");
      let atual = parseInt(me.closest('label').find('input').val());
      atual = atual + parseInt(quantity);

      if(atual < 1){atual = 1}
      me.closest('label').find('input').val(atual);
    
    },

    buy () {
      const product = this.body
      this.$emit('buy', { product })
      if (this.canAddToCart) {
        this.isWaitingBuy = true
        store({ url: `/products/${product._id}.json` })
          .then(({ data }) => {
            const selectFields = ['variations', 'customizations']
            for (let i = 0; i < selectFields.length; i++) {
              const selectOptions = data[selectFields[i]]
              if (selectOptions && selectOptions.length) {
                return import('@ecomplus/storefront-components/src/ProductQuickview.vue')
                  .then(quickview => {
                    new Vue({
                      render: h => h(quickview.default, {
                        props: {
                          product: data
                        }
                      })
                    }).$mount(this.$refs.quickview)
                  })
              }
            }
            if (data['kit_composition']) {
              const kitComposition = data.kit_composition
              console.log(window.location.pathname)
              const ecomSearch = new EcomSearch()
              ecomSearch
                .setPageSize(kitComposition.length)
                .setProductIds(kitComposition.map(({ _id }) => _id))
                .fetch(true)
                .then(() => {
                  ecomSearch.getItems().forEach(product => {
                    const { quantity } = kitComposition.find(({ _id }) => _id === product._id)
                    const item = ecomCart.parseProduct(product, undefined, quantity)
                    if (quantity) {
                      item.min_quantity = item.max_quantity = quantity
                    } else {
                      item.quantity = 0
                    }
                    this.kitItems.push({
                      ...item,
                      _id: genRandomObjectId()
                    })
                  })
                  if (this.kitItems && this.kitItems.length) {
                    const composition = this.kitItems.map(item => ({
                      _id: item.product_id,
                      variation_id: item.variation_id,
                      quantity: item.max_quantity || item.quantity
                    }))
                    this.kitItems.forEach(item => {
                      const quantity = item.max_quantity || item.quantity
                      if (quantity > 0) {
                        const newItem = { ...item, quantity }
                        delete newItem.customizations
                        if (this.product && this.product._id) {
                          newItem.kit_product = {
                            _id: this.product._id,
                            name: this.product.name,
                            pack_quantity: this.kitItems.length,
                            price: this.product.price,
                            composition
                          }
                        }
                        if (this.slug) {
                          newItem.slug = this.slug
                        }
                        if (this.canAddToCart) {
                          const repeat = parseInt(document.querySelector("[product_quantity='"+ product._id +"']").value)
                          for (let index = 0; index < repeat; index++) {
                            ecomCart.addItem(newItem) 
                          }
                        }
                      }
                    })
                  }
                })
                .catch(err => {
                  window.location = '/' + this.product.slug
                  /* return import('@ecomplus/storefront-components/src/ProductQuickview.vue')
                    .then(quickview => {
                      new Vue({
                        render: h => h(quickview.default, {
                          props: {
                            product: data
                          }
                        })
                      }).$mount(this.$refs.quickview)
                    }) */
                })
            } else {
              const { quantity, price } = data
              //ecomCart.addProduct({ ...product, quantity : parseInt($("[product_quantity='"+ product._id +"']")), price })
              ecomCart.addProduct({ ...product }, '', parseInt(document.querySelector("[product_quantity='"+ product._id +"']").value))
            }
          })
          .catch(err => {
            console.error(err)
            window.location = `/${product.slug}`
          })
          .finally(() => {
            this.isWaitingBuy = false
          })
      }
    }
  },

    // buy () {
    //   let product = sanitizeProductBody(this.body)
    //   product.quantity = $("[product_quantity='"+ product._id +"']");
    //   console.log(product)
    //   this.$emit('buy', { product })
    //   if (this.canAddToCart) {
    //     this.isWaitingBuy = true
    //     store({ url: `/products/${product._id}.json` })
    //       .then(({ data }) => {
    //         const selectFields = ['variations', 'customizations', 'kit_composition']
    //         for (let i = 0; i < selectFields.length; i++) {
    //           const selectOptions = data[selectFields[i]]
    //           if (selectOptions && selectOptions.length) {
    //             return import('@ecomplus/storefront-components/src/ProductQuickview.vue')
    //               .then(quickview => {
    //                 new Vue({
    //                   render: h => h(quickview.default, {
    //                     props: {
    //                       product: data
    //                     }
    //                   })
    //                 }).$mount(this.$refs.quickview)
    //               })
    //           }
    //         }
    //         const { price } = data
    //         //console.log({ ...product, price })
    //         ecomCart.addProduct({ ...product, price})
    //         //ecomCart.addItem({ ...product, price })
    //       })
    //       .catch(err => {
    //         console.error(err)
    //         window.location = `/${product.slug}`
    //       })
    //       .finally(() => {
    //         this.isWaitingBuy = false
    //       })
    //   }
    // }
  // },
  
  created () {
    if (this.product) {
      this.setBody(this.product)
      if (this.product.available === undefined) {
        this.body.available = true
      }
      if (this.product.visible === undefined) {
        this.body.visible = true
      }
    }
    if (!this.isLoaded) {
      this.fetchItem()
    }
  }
}
