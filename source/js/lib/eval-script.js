module.exports=function(e){var t=e.text||e.textContent||e.innerHTML||"",n=e.src||"",c=e.parentNode||document.querySelector("head")||document.documentElement,o=document.createElement("script");if(t.match("document.write"))return console&&console.log,!1;if(o.type="text/javascript",o.id=e.id,""!==n&&(o.src=n,o.async=!1),""!==t)try{o.appendChild(document.createTextNode(t))}catch(e){o.text=t}return c.appendChild(o),(c instanceof HTMLHeadElement||c instanceof HTMLBodyElement)&&c.contains(o)&&c.removeChild(o),!0};