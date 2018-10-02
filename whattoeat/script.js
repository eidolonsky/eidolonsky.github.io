/*whattoeat*/
var foods = [
"满咖", "MOMO", "Sushi", "Japanese Food", "新加坡鱼酿", 
"Dumpling", "Pizza", "Burger King", "Fried Rice", 
"Ramen", "Ice Cream", "螺蛳粉", "凉皮", 
 "Crab Cake", "烧腊", "新疆菜", "炸鸡", 
 "Bamboo", "Kiwi", "陈光记", "烤鱼", "葱油拌面", 
 "Peking Duck", "KFC", "McDonald", "冒菜", "焖饭",
 "Poke Bowl", "Steak House", "Salad", "Rice Noodle",
 "Pork Feet", "石锅拌饭", "麻辣香锅", "麻辣烫", "本帮菜", 
 "串串香", "汤包", "豆花", "脑花", "卤菜"
]; 

var food;
var index = -1;
var time;  

function startdraw(){  
  document.getElementById("buttonStart").disabled = true;
  document.getElementById("onearmbandit").src = "/assets/img/oneArmBanditDown.png";  
  drawfood();  
}  
function drawfood(){
  if(foods.length > 0){
    index = Math.floor(Math.random()*100 % foods.length);  
    food = foods[index];  
    document.getElementById("result").innerHTML = food;  

    time = window.setTimeout(drawfood, 8.12);  
  }
  else{
      document.getElementById("result").innerHTML = "Nah";  
  }
}  
function enddraw(){  
  window.clearTimeout(time);  
  document.getElementById("buttonStart").disabled = false;
  document.getElementById("onearmbandit").src = "/assets/img/oneArmBandit.png";    
  foods.splice(index, 1);
} 