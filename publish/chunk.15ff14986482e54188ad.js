(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{208:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n(23),i=n(168);window._info=window._info||{};const s=[],p=[{endpoint:"list_payments"},{endpoint:"calculate_shipping"}];Object.keys(i.a).length&&p.push({endpoint:"apply_discount",reqOptions:{method:"post",data:{utm:i.a}}}),p.forEach((({endpoint:e,reqOptions:t})=>{const n={};window._info[e]=n;const i=new Promise((i=>{Object(a.c)({url:`/${e}.json`,...t,axiosConfig:{timeout:1e4}}).then((({data:t})=>{const{result:a}=t;Array.isArray(a)&&a.forEach((({error:t,response:a})=>{if(!t){let t,o;switch(e){case"calculate_shipping":t="free_shipping_from_value",o=a[t],"number"==typeof o&&(void 0===n[t]||o<n[t])&&(n[t]=o);break;case"list_payments":t="installments_option",o=a[t],o&&(!n[t]||o.monthly_interest<n[t].monthly_interest||o.max_number>n[t].max_number)&&(n[t]=o),t="discount_option",o=a[t],o&&(!n[t]||o.value>n[t].value)&&a.payment_gateways.forEach((({discount:e})=>{e&&"freight"!==e.apply_at&&e.value===o.value&&(n[t]={apply_at:e.apply_at,...o})})),t="loyalty_points_programs",o=a[t],o&&(n[t]={...n[t],...o});break;default:t="available_extra_discount",o=a[t],o&&(!n[t]||o.value>n[t].value)&&(n[t]=o)}}})),o.a.emit(`info:${e}`,n)})).catch((t=>{console.error(t),o.a.emit(`info:${e}`,t)})).finally(i)}));s.push(i)})),Promise.all(s).then((()=>o.a.emit("info",window._info)))}}]);
//# sourceMappingURL=chunk.15ff14986482e54188ad.js.map