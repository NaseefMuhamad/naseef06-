/**
 * if statements
 */

//age,child,adult,invalid
let age=20;
if(age<18){
    console.log("child");
}else if(age>=18){
    console.log("adult");
}else{
    console.log("invalid");
}


let number=8;
switch(number){
    case 1:
        console.log("this is sunday");
        break;
    case 2:
        console.log("this is monday");
        break;    
    case 3:
         console.log("this is tuesday");
        break;  
    case 4:
        console.log("this is wednesday");
        break;  
    case 5:
        console.log("this is thursday");
        break;
    case 6:
        console.log("this is friday");
        break; 
    case 7:
        console.log("this is monday");
        break;
    default:
        console.log("the day doesnot exist");
        break;     
        }                    

/**
 * LOOPS
 * FOR LOOPS */
      
for(let i=0;i<101;i++) {
    console.log(i)
}

/*
while loop
*/
let i=0
while(i<101){
    console.log(i)
    i+=1;
}
/*
for in loop
*/
let fruitList=["apples","mangoes","oranges"]
for (fruit in fruitList){
    console.log(fruitList[fruit]);
}

for(fruit of fruitList){
    console.log(fruit);
}


