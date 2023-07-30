!(() => {
  document.addEventListener('DOMContentLoaded', function () {
    toggleTheme();
    toggleSearch();
  });
})();
function toggleTheme() {
  const root=document.documentElement;
  const btn=HM.$("sw-th");
  const dark=()=>{
    root.classList.add("dark");
    localStorage.setItem("theme","dark");
    btn.innerText="开灯";
  };
  const light=()=> {
    root.classList.remove("dark");
    localStorage.removeItem("theme");
    btn.innerText="关灯";
  };
  (()=>{
    const theme= localStorage.getItem("theme")||"";
    theme?dark():light();
  })();
  btn.onclick=()=>{
    const theme=localStorage.getItem("theme")||"";
    theme?light():dark();
  }
}
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