
/*const welcome=(username)=>{
  console.log(`hi, welcome back, ${username}`);
}
const goodBye=(nextTime)=>{
  console.log(`see you next time,${nextTime}`);
}
goodBye("sir");
welcome("naseef");
*/
/*
function welcomeBack(username,callback){
  console.log(`hi,welcomeback,${username}`);
  callback();
}
function seeYouNextTime(nextTime){
  console.log("see you next time");
} 
welcomeBack("naseef",seeYouNextTime) 
*/
//callback hell
/*
function step1(callback) {
  setTimeout(() => {
      console.log("Step 1 completed");
      callback();
  }, 1000);
}

function step2(callback) {
  setTimeout(() => {
      console.log("Step 2 completed");
      callback();
  }, 1000);
}

function step3(callback) {
  setTimeout(() => {
      console.log("Step 3 completed");
      callback();
  }, 1000);
}

step1(() => {
  step2(() => {
      step3(() => {
          console.log("All steps completed");
      });
  });
});
*/
//error handling

/*
function divide(a, b, callback) {
  if (b === 0) {
      callback(new Error("Cannot divide by zero"), null);
  } else {
      callback(null, a / b);
  }
}

function result(error, result) {
  if (error) {
      console.log("Error:", error.message);
  } else {
      console.log("Result:", result);
  }
}

divide(10, 2, result);
divide(10, 0, result); 
*/
//promises

function step1() {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log("Step 1 completed");
          resolve();
      }, 1000);
  });
}

function step2() {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log("Step 2 completed");
          resolve();
      }, 1000);
  });
}

function step3() {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log("Step 3 completed");
          resolve();
      }, 1000);
  });
}

step1()
  .then(step2)
  .then(step3)
  .then(() => console.log("All steps completed"));

