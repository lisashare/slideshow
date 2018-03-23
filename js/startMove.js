//获取非行内样式
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] :
	getComputedStyle(obj,1)[attr];
}
//运动框架
function sport(obj,json,fn){
	//清空计时器
	clearInterval(obj.timer);
	//开启新的计时器
	obj.timer = setInterval(()=>{
		//设置开关
		let stop = true;
		//遍历
		for(let attr in json){
			//获取当前值 能强转不要自己转
			var cur = attr === 'opacity'?parseInt(parseFloat(getStyle(obj,attr))*100)
			:parseInt(getStyle(obj,attr));
			//判断速度
			var speed = (json[attr] - cur)/8;
				speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
			if(cur != json[attr]){
				stop = false;
			}
			//针对透明度
			if(attr === 'opacity'){
				obj.style.opacity = (cur + speed)/100;
				obj.style.filter = 'alpha(opacity=' + cur + speed +')';
			}else{
				//其他属性的运动
				obj.style[attr] = cur + speed + "px";
			}
			if(stop){
				clearInterval(obj.timer);
				if(typeof fn === 'function'){
					fn();
				}
			}
		}
	},30)
}
