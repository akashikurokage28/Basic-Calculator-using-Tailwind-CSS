'use strict'
const inputValueBtns = document.querySelectorAll(".btns-row input");
const numOutput = document.getElementById("num-output");

// Flag check for last calculation. This is delete the last calculation if the user clicks any buttons after clicking the equals "=" button
let lastCalculation = false;


/* 1. APPEND INPUT VALUES TO "NUMOUTPUT" */

// Exclude the button "AC", "DEL", and "=" to prevent them appending to the "numOutput"
const excludeButtons = ["AC", "DEL", "="];

// Append the clicked value button to the "numOutput Container"
inputValueBtns.forEach((inputButton) => {
    inputButton.addEventListener("click", () => {
        // Appends the clicked number to the "numOutput" except to the buttons from the "excludeButtons" array
        if(!excludeButtons.includes(inputButton.value)){
            if(lastCalculation){
                numOutput.value = "";
                lastCalculation = false; //Flag check for last calculation
            }
            numOutput.value += inputButton.value;
        } 
    });
});


/* 2. CALCULATION */

// Calculates the current number values inside the "numOutput"
const equalButton = document.getElementById("equal-btn");

equalButton.addEventListener("click", calculate);
function calculate(){
    try{
        if(numOutput.value.includes("%")){
            // For Calculating Percentages
            convertPercentToDecimal();
        }else{
            // For calculating normal expressions
             numOutput.value = eval(numOutput.value);
        }
    } catch(e){
        numOutput.value = "Syntax Error!";
    }
    lastCalculation = true; //Flag check for last calculation
}


//3.  CONVERT PERCENTAGE INTO DECIMAL POINTS
function convertPercentToDecimal(){
    let percentExpression = numOutput.value.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
        return number / 100;
    })

    numOutput.value = eval(percentExpression) || "";
}


/* 4. ALL CLEAR */

// Clearing all of the numbers in one click
const allClearBtn = document.getElementById("all-clear");
allClearBtn.addEventListener("click", allClear);
function allClear(){
    numOutput.value = "";
}


/* 5. DELETE LAST INPUTTED NUMBER */

//Delete last inputted number
const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", deleteLastChar);
function deleteLastChar(){
    numOutput.value = numOutput.value.slice(0, -1) || "";
}


// Connect keyboard to inputs
document.addEventListener("keydown", (event) => {
    inputValueBtns.forEach((inputBtn) => {
        if(inputBtn.value === event.key){
            if(!excludeButtons.includes(inputBtn.value)){
                    if(lastCalculation){
                    numOutput.value = "";
                    lastCalculation = false; //Flag check for last calculation
                }
                    inputBtn.focus();
                    numOutput.value += inputBtn.value;
            }
        } 
    });

    switch(event.key){
        case "Backspace":
            deleteLastChar();
            break;
        
        case "Control":
            calculate();
            break;

        case "Alt":
            allClear();
        
        default:
    }
    event.preventDefault();
});