<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
	  var that = this;
      (function(doc,win){
		  let fn = () =>{
		  	let docEl = doc.documentElement,
		  	clientWidth = docEl.clientWidth;
		  	if(!clientWidth) return ;
		  	docEl.style.fontSize = 16 * (clientWidth/1920) + 'px'
		  	that.navHeight = 16 * (clientWidth/1920);
		  }
		  if(!doc.addEventListener) return
		  win.addEventListener('resize',fn)
		  doc.addEventListener('DOMContentLoaded',fn)
		  })(document,window);
  }
}
</script>

<style>
html,body,#app{
		width: 100%;
		height: 100%;
	}
</style>
