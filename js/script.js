var mapDiv = document.querySelector('.map')
var startBtn = document.querySelector('.startGame')
var pauseBtn = document.querySelector('.pause')
var reloadBtn = document.querySelector('.reload')
var html = document.querySelector('html')
var intervalId 
var foodDiv = null
var snakeList = []
var MapSizeX = 0
var MapSizeY = 0
var direction = {x:-1,y:0}
var score = 0
var scoreNum = document.querySelector('.scoreNum')


//循环出地图
function renderMap(x,y){
	MapSizeX = x
	MapSizeY = y
	mapDiv.style.height = MapSizeY*30+'px'
	mapDiv.style.width = MapSizeX*30+'px'
	for(var i=0;i<y;i++){
		for(var j=0;j<x;j++){
			var newDiv = document.createElement('div')
			mapDiv.appendChild(newDiv)
			newDiv.className = 'mapItem'
			newDiv.id = 'x'+j+'y'+i
		}
	}
}

//随机出蛇
function randomSnake(start,end){
	var x = parseInt(Math.random()*(end-start))+start
	var y = parseInt(Math.random()*(end-start))+start
	snakeList.push({x:x,y:y})
	snakeList.push({x:x+1,y:y})
	snakeList.push({x:x+2,y:y})
}


//渲染出蛇
function renderSnake(){
	snakeList.forEach(function(item,index){
		var selector = '#x'+item.x+'y'+item.y
		var snakeDiv = document.querySelector(selector);
		snakeDiv.className = "mapItem snake"
	})
}

//渲染出食物
function renderFood(){
	do{
		var x = parseInt(Math.random()*MapSizeX)
		var y = parseInt(Math.random()*MapSizeY)
		var selector = '#x'+x+'y'+y
		foodDiv = document.querySelector(selector)
		if(Math.random()<0.1&&snakeList.length>5){
			foodDiv.dataset.food = 'redStar'
		}
	}while(foodDiv.className!="mapItem")
	foodDiv.className = 'mapItem food'
}

//判断食物是否在该坐标上
function isFood(x,y){
	var selector = '#x'+x+'y'+y
	var selectorDiv =document.querySelector(selector)
	if(selectorDiv.className=='mapItem food'){
		return true
	}else{
		return false
	}
}
//判断蛇是否在该坐标上
function isSnake(x,y){
	var selector = '#x'+x+'y'+y
	var selectorDiv =document.querySelector(selector)
	if(selectorDiv.className=='mapItem snake'){
		return true
	}else{
		return false
	}
}

function gaming(){
	//设置蛇的运动
	intervalId = setInterval(function(){
		//自动前进
		var x = snakeList[0].x + direction.x
		if(x>MapSizeX-1){
			x = 0
		}else if(x<0){
			x = MapSizeX-1
		}
		var y = snakeList[0].y + direction.y
		if(y>MapSizeY-1){
			y = 0
		}else if(y<0){
			y = MapSizeY-1
		}
		
		//得到蛇头坐标
		var snakeHeader = {x:x,y:y}
		
		//条件分流，撞上食物，撞上自己和其他
		if(isFood(snakeHeader.x,snakeHeader.y)){
			var selector = '#x'+snakeHeader.x+'y'+snakeHeader.y
			var selectorDiv = document.querySelector(selector)
			selectorDiv.className = 'mapItem'
			snakeList.unshift(snakeHeader)
			if(selectorDiv.dataset.food=='redStar'){
				//去除data-food标记
				delete selectorDiv.dataset.food
				//去掉两个尾巴，总体减一
				delSnake =  snakeList.pop()
				var delSnakeDiv = document.querySelector('#x'+delSnake.x+'y'+delSnake.y)
				delSnakeDiv.className = 'mapItem'
				delSnake =  snakeList.pop()
				var delSnakeDiv = document.querySelector('#x'+delSnake.x+'y'+delSnake.y)
				delSnakeDiv.className = 'mapItem'
			}
			renderFood()
			score++
			scoreNum.innerHTML = score
		}else if(isSnake(snakeHeader.x,snakeHeader.y)){
			if(localStorage.score==undefined){
				localStorage.score = score
				AlertWin('<h2>撞到身体啦！</h2><h1>Game over!</h1><h2>你第一次玩就得到了'+score+'分!</h2>')
			}else if(localStorage.score<score){
				AlertWin('<h2>撞到身体啦！</h2><h1>Game over!</h1><h2>恭喜你创造了新纪录！得到了'+score+'分!</h2>')
			}else if(localStorage.score>=score){
				AlertWin('<h2>撞到身体啦！</h2><h1>Game over!</h1><h2>恭喜你得到了'+score+'分!</h2><h2>最高纪录是'+localStorage.score+'分哦!</h2>')
			}
			
			
			clearInterval(intervalId)
		}else{
			snakeList.unshift(snakeHeader)
			delSnake =  snakeList.pop()
			var delSnakeDiv = document.querySelector('#x'+delSnake.x+'y'+delSnake.y)
			delSnakeDiv.className = 'mapItem'
			
		}
		renderSnake()
	},100)
}



//渲染页面
renderMap(25,18) 
//点击开始
startBtn.onclick = function(){
	//蛇的创建和渲染
	randomSnake(5,10)
	renderSnake()
	renderFood()
	gaming()
	
	//增加上下左右空格按键事件
	html.onkeydown = function(e){
		
		//阻止默认事件
		e.preventDefault()
		
		if(e.key=='ArrowRight'&&direction.x!=-1){
			direction = {x:1,y:0}
		}
		if(e.key=='ArrowLeft'&&direction.x!=1){
			direction = {x:-1,y:0}
		}
		if(e.key=='ArrowUp'&&direction.y!=1){
			direction = {x:0,y:-1}
		}
		if(e.key=='ArrowDown'&&direction.y!=-1){
			direction = {x:0,y:1}
		}
		if(e.key==' '){
			if(pauseBtn.innerHTML=='暂停游戏'){
				clearInterval(intervalId)
				pauseBtn.innerHTML = '继续游戏'
			}else{
				gaming()
				pauseBtn.innerHTML = '暂停游戏'
			}
		}
	}
	
	//暂停继续事件
	pauseBtn.onclick = function(e){
		//阻止默认事件
		e.preventDefault()
		
		if(pauseBtn.innerHTML=='暂停游戏'){
			clearInterval(intervalId)
			pauseBtn.innerHTML = '继续游戏'
		}else{
			gaming()
			pauseBtn.innerHTML = '暂停游戏'
		}
	}	
	reloadBtn.onclick = function(){
		location.reload()
	}
}

