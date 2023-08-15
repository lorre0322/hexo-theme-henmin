
const _$=(dom)=>{
	return document.getElementById(dom)
}
const HC=(ele, cls)=>{
	return (ele.className).indexOf(cls) > -1;
 }


function toggleSearch() {
  const btn=_$("search");
  const showSearch=()=>{
    if (HC(document.body,'search')) {
			document.body.classList.remove('search')
    }else{
			document.body.classList.add('search')
      setTimeout(()=>{
        _$("s-txt").focus();
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
const light=()=>{
  root.classList.add("light");
  localStorage.setItem("theme","light");
}
const dark=()=>{
  root.classList.remove("light");
  localStorage.removeItem("theme");
  _$("sw-th").innerText="开灯"
}
function toggleTheme() {
  _$('sw-th').onclick=()=>{
    const theme = localStorage.getItem("theme");
    if(theme){
      dark()
    }else{
      light()
      _$("sw-th").innerText="关灯"
    }
  }
}
const toggleMusic=()=>{
  const btn=_$('sw-au'),ctl=_$('ch-au'),audio=_$('bg-au')
  audio.src=play_list[0]
  var play_num=0
  btn.onclick=()=>{
    if(HC(audio,'play')) {
      audio.classList.remove('play')
      btn.innerText='播放'
      audio.pause()
    }else{
      audio.classList.add('play')
      btn.innerText='暂停'
      audio.play()
    }
  }
  audio.addEventListener('ended',()=>{
    if(!audio.loop){
      if(play_num===play_list.length-1){
        play_num=0
      }else{
        play_num++
      }
      audio.src=play_list[play_num]
      audio.play()
    }
  })
  ctl.onclick=()=>{ audio.loop=!audio.loop }
  ctl.ontouchstart=(a)=>{
    if(HC(_$('bg-au'),'play')){
      const statx= a.targetTouches[0].clientX;
      ctl.ontouchend=(b)=>{
        const endx=b.changedTouches[0].clientX;
        const sta=endx-statx
        if(sta>0 && play_num<=play_list.length){
          play_num++
          if(play_num===play_list.length) play_num=0
          audio.src=play_list[play_num]
        }
        if(sta<0 && play_num>=0){
          if(play_num===0) play_num=play_list.length
          play_num--
          audio.src=play_list[play_num]
        }
        audio.play()
      }
    }
  }
}

const toTop=()=>{
  _$('load').onclick=()=>{
    window.scrollTo(0,0)
  }
}

!(() => {
  const theme= localStorage.getItem("theme");
  if (document.readyState === "loading") {
    if(theme) light()
  }
  document.addEventListener('DOMContentLoaded', function () {
    if(theme) _$("sw-th").innerText="关灯";
    toggleTheme();
    toggleSearch();
    toggleMusic();
    toTop()
  });
})();