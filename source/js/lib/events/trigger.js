var forEachEls=require("../foreach-els");module.exports=function(e,n,t){(n="string"==typeof n?n.split(" "):n).forEach((function(n){var o;(o=document.createEvent("HTMLEvents")).initEvent(n,!0,!0),o.eventName=n,t&&Object.keys(t).forEach((function(e){o[e]=t[e]})),forEachEls(e,(function(e){var n=!1;e.parentNode||e===document||e===window||(n=!0,document.body.appendChild(e)),e.dispatchEvent(o),n&&e.parentNode.removeChild(e)}))}))};