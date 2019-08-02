(function(){
	function xys(){
		var html = document.querySelector('html')
		html.style.fontSize = innerWidth/7.5 + 'px'
		var userAgent = navigator.userAgent
		//父字符串.indexOf(字符串)：可以查找父字符串是否有查找的内容，返回字符串在父字符串中的索引位置
		var result = userAgent.indexOf('Android')
		if(userAgent.indexOf('Android')!=-1||userAgent.indexOf('iPad')!=-1||userAgent.indexOf('iPhone')!=-1){
			html.className = 'mobile'
		}else{
			html.className = 'pc'
		}
		if(innerWidth<320){
			html.className += ' lt320 lt640 lt960 lt1280'
		}else if(innerWidth<640){
			html.className += ' gt320 lt640 lt960 lt1280'
		}else if(innerWidth<960){
			html.className += ' gt320 gt640 lt960 lt1280'
		}else if(innerWidth<1280){
			html.className += ' gt320 gt640 gt960 lt1280'
		}else if(innerWidth>1280){
			html.className += ' gt320 gt640 gt960 gt1280'
		}				
	}
	
	window.onresize = function(){
		xys()
	}
	xys()
})()
