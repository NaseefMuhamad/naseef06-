/*
//step one
console.log("1.boling the water");

//step two
console.log("2.water is ready");

//step three
console.log("3.other tasks ie.bring cups")

*/
//asynchronous
console.log("1.boling water")
setTimeout(()=>{
    console.log("2.water is ready");
}, 4000);
console.log("3. other tasks")