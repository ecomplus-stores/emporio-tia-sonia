import waitStorefrontInfo from '@ecomplus/storefront-components/src/js/helpers/wait-storefront-info'

waitStorefrontInfo('list_payments', 'loyalty_points_programs')
  .then(data => {
    if (!data) return
    const { pontostiasonia } = data
    if (!pontostiasonia) return
    document.querySelectorAll('[data-points-percentage]').forEach(el => {
      el.innerHTML = pontostiasonia.earn_percentage
    })
  })
