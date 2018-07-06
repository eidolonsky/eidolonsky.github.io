/*whattoeat*/
var foods = [
"BBQ","Hot Pot","Sushi","Noodle","Pasta","Pizza","Burger"
]; 

var food;
var index = -1;
var time;  

function begindraw(){  
  document.getElementById("btnBegin").disabled = true;  
  drawfood();  
}  
function drawfood(){
  if(foods.length > 0){
    index = Math.floor(Math.random()*1000 % foods.length);  
    food = foods[index];  
    document.getElementById("result").innerHTML = food;  

    time = window.setTimeout(drawfood,2);  
  }
  else{
      document.getElementById("result").innerHTML = "Nah";  
  }
}  
function enddraw(){  
  window.clearTimeout(time);  
  document.getElementById("btnBegin").disabled = false;  
  foods.splice(index, 1);
} 