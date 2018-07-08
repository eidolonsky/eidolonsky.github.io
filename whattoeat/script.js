/*whattoeat*/
var foods = [
"BBQ","Hot Pot","Sushi","泉鲤", "新加坡鱼酿", 
"Dumpling","乐凯撒","Burger King", "Fried Rice", 
"Ramen", "Ice Cream", "螺蛳粉", "汤饭", "凉皮", 
 "Crab Cake", "煲仔饭", "Rum Milk Shake",
 "Bamboo", "Kiwi", "烧腊", "Fried Shrimp", 
 "Peking Duck", "KFC", "McDonald", "冒菜", "焖饭",
 "Poke Bowl", "Steak House", "Salad", "Rice Noodle",
 "Pork Feet", "拌饭", "麻辣香锅", "麻辣烫", "本帮菜", 
 "串串香", "川", "鲁", "粤", "淮", "扬", "汤包", "湘", "京"
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