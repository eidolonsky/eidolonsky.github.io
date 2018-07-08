/*whattoeat*/
var foods = [
"BBQ","Hot Pot","Sushi","Noodle",
"Pasta","Pizza","Burger", "Fried Rice", 
"Ramen", "Ice Cream", "Steak", "Fish",
 "Crab Cake", "Cheese Cake", "Milk Shake",
 "Bamboo", "Kiwi", "Lobster", "Shrimp Toast", 
 "Peking Duck", "Taco", "Kebab"
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