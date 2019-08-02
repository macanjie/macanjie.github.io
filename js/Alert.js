function AlertWin(content){
	var body = document.querySelector('body')
	var head = document.querySelector('head')
	var btn = document.querySelector('.btn')
	var alertWin = document.createElement('div')
	body.appendChild(alertWin)
	alertWin.className = 'alertWin'
	alertWin.innerHTML = `
	<div class='alertItem'>
		<h1 class='top'>温馨提示</h1>
		<div class='content'>${content}</div>
		<button class='confirm'>确认</button>
	</div>
	`
	var alertStyle = document.createElement('style') 
	head.appendChild(alertStyle)
	alertStyle.innerHTML = `
		.alertWin{
			background:rgba(0,0,0,0.6);
			height:100vh;
			width: 100vw;
			position:fixed;
			left:0;
			top:0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.alertItem{
			height:300px;
			width: 400px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;	
			background: #fff;	
			border: 1px solid #999;	
			border-radius: 10px;
			overflow: hidden;	
			box-shadow: 0 5px 5px #999;			
			font-size: 15px;
			line-height: 45px;
		}
		.top{

			text-align: center;
			color: white;
			background: skyblue;
			margin: 0 auto;
			height: 25%;
			width: 100%;
			line-height: 2;
			border-bottom: 1px solid #999;
		}
		.content{
			font-size: 12px;
			margin:0 auto;
			height: 60%;
			width:100%;
			text-align: center;
			border-bottom: 1px solid #999;
			display:flex;
			flex-direction:column;
			justify-content:space-around;
		}
		.confirm{
			height: 15%;
			width: 35%;
			margin: 10px auto;
			border-radius: 10px;
			border: 1px solid #999;
			border-radius: 10px;
		}
	`
	var confirm = document.querySelector('.confirm')
	confirm.onclick = function(){
		body.removeChild(alertWin)
	}

}
