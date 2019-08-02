var gesture = {
	
	//设置可调用的event属性
	event:{
		right:[],
		left:[],
		up:[],
		down:[]
	},
	
	//设置监听函数
	listen:function(direction,Fn){
		var isHas = gesture.event.hasOwnProperty(direction)
		if(isHas){
			gesture.event[direction].push(Fn)
		}else(
			console.log('请输入正确的事件名称')
		)
		
	},
	
	init:function(){
		var html = document.querySelector('html')
		//变量用于记录触摸起始点的位置
		var xStart = 0
		var yStart = 0
		var xEnd = 0
		var yEnd = 0
		//滑动的距离坐标
		var x = 0
		var y = 0
		var direction = null
		
		//触摸开始
		html.addEventListener('touchstart',function(e){
			xStart = e.touches[0].pageX
			yStart = e.touches[0].pageY
		})
		//触摸移动
		html.addEventListener('touchmove',function(e){
			xEnd = e.touches[0].pageX
			yEnd = e.touches[0].pageY
		})
		//触摸结束
		html.addEventListener('touchend',function(e){
			//计算滑动距离
			x = xEnd - xStart
			y = yEnd - yStart
			
			//条件筛选滑动距离大于某个值，条件分流x和y绝对值之间的大小
			//条件分流x,y是否大于0
			var xAbs = Math.abs(x)
			var yAbs = Math.abs(y)
			if(xAbs>yAbs&&xAbs>100){
				if(x>0){
					direction = 'right'
					gesture.event[direction].forEach(function(item,index){
						item(direction)
					})
				}else{
					direction = 'left'
					gesture.event[direction].forEach(function(item,index){
						item(direction)
					})
				}
			}else if(yAbs>100){
				if(y>0){
					direction = 'down'
					gesture.event[direction].forEach(function(item,index){
						item(direction)
					})
				}else{
					direction = 'up'
					gesture.event[direction].forEach(function(item,index){
						item(direction)
					})
				}
			}
		})
	}
	
}
gesture.init()