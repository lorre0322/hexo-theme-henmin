
// function toggleTheme() {
//   const root=document.documentElement;
//   const btn=HM.$("sw-th");
//   const light=()=>{
//     root.classList.add("light");
//     localStorage.setItem("theme","light");
//     btn.innerText="开灯";
//   };
//   const dark=()=> {
//     root.classList.remove("light");
//     localStorage.removeItem("theme");
//     btn.innerText="关灯";
//   };
//   (()=>{
//     const theme= localStorage.getItem("theme")||"";
//     theme?light():dark();
//   })();
//   btn.onclick=()=>{
//     const theme=localStorage.getItem("theme")||"";
//     theme?dark():light();
//   }
// }

function toggleSearch() {
  const btn=HM.$("search");
  const showSearch=()=>{
    if (HM.hasClass(document.body,'search')) {
			document.body.classList.remove('search')
    }else{
			document.body.classList.add('search')
      setTimeout(()=>{
        HM.$("s-txt").focus();
      },300)
    }
  }
  btn.onclick=()=>{
    showSearch()
  }
  window.addEventListener("keydown",e=>{
    if (e.ctrlKey && (e.code==="Slash"||e.keyCode===191)) {
      showSearch()
    }
  })
}


const root=document.documentElement;
const btn=HM.$("sw-th");
const light=()=>{
  root.classList.add("light");
  localStorage.setItem("theme","light");
}
const dark=()=>{
  root.classList.remove("light");
  localStorage.removeItem("theme");
  HM.$("sw-th").innerText="开灯"
}
function toggleTheme() {
  HM.$('sw-th').onclick=()=>{
    const theme = localStorage.getItem("theme");
    if(theme){
      dark()
    }else{
      light()
      HM.$("sw-th").innerText="关灯"
    }
  }
}
!(() => {
  const theme= localStorage.getItem("theme");
  if (document.readyState === "loading") {
    if(theme) light()
  }
  document.addEventListener('DOMContentLoaded', function () {
    if(theme) HM.$("sw-th").innerText="关灯";
    toggleTheme();
    toggleSearch();
  });
})();