var forEachEls=require("./foreach-els"),defaultSwitches=require("./switches");module.exports=function(e,t,h,l,o,i){var n=[];h.forEach((function(h){var s=l.querySelectorAll(h),r=o.querySelectorAll(h);if(this.log&&this.log("Pjax switch",h,s,r),s.length!==r.length)throw"DOM doesn’t look the same on new loaded page: ’"+h+"’ - new "+s.length+", old "+r.length;forEachEls(s,(function(l,o){var s=r[o];this.log&&this.log("newEl",l,"oldEl",s);var a=e[h]?e[h].bind(this,s,l,i,t[h]):defaultSwitches.outerHTML.bind(this,s,l,i);n.push(a)}),this)}),this),this.state.numPendingSwitches=n.length,n.forEach((function(e){e()}))};