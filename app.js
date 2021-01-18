
(function() {
  // Shortcut to get elements
  let el = function(element) {
    if (element.charAt(0) === "#") {
      // If passed an ID...
      return document.querySelector(element); // ... returns single element
    }

    return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };

  // letiables
  let viewer = el("#viewer"), // Calculator screen where result is displayed
    equals = el("#equals"), // Equal button
    nums = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    theNum = "", // Current number
    oldNum = "",
    keyPressed, // First number
    resultNum, // Result
    operator; // Batman

  // When: Number is clicked. Get the current number selected
  let setNum = function() {
    if (resultNum) {
      // If a result was displayed, reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum; // Display current number
  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  let moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // When: Equals is clicked. Calculate result
  let displayNum = function() {
    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;
      case "mult":
          resultNum = oldNum * theNum;
          break;
      case "div":
        resultNum = oldNum / theNum;
        //the result is infinity when theNum is 0 so resultNum was changed to 0 instead of infinity
          break;

      // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "You broke it!";
      } else {
        // If result is infinity, set off by writting 0
        resultNum = "0";
        
      }
    }

    // Display result, finally!Yes!!!
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;
  };

  // When: Clear button is pressed. Clear everything
  let clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  /* The click events */

  // Add click event to numbers
  for (let i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Add click event to operators
  for (let i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearAll;

  /*NEW: the keyboard events*/
let keyboard = () => {
  window.addEventListener(
    "keydown",
    (event) => {
      keyPressed = event.key;
      //if the keypressed is a number
      if (
        keyPressed === "0" ||
        keyPressed === "1" ||
        keyPressed === "2" ||
        keyPressed === "3" ||
        keyPressed === "4" ||
        keyPressed === "5" ||
        keyPressed === "6" ||
        keyPressed === "7" ||
        keyPressed === "8" ||
        keyPressed === "9" ||
        keyPressed === "."
      ) {
        if (resultNum) {
          // If a result was displayed, reset number
          theNum = keyPressed;
          resultNum = "";
        } else {
          // Otherwise, add digit to previous number (this is a string!)
          theNum += keyPressed;
        }
        viewer.innerHTML = theNum;
      } else {
        //if keyPress it's not a number
        switch (keyPressed) {
          case "+":
            oldNum = theNum;
            theNum = "";
            operator = "plus";
            break;
          case "-":
            oldNum = theNum;
            theNum = "";
            operator = "minus";
            break;
          case "*":
            oldNum = theNum;
            theNum = "";
            operator = "mult";
            break;
          case "/":
            oldNum = theNum;
            theNum = "";
            operator = "div";
            break;
          case "Backspace"://clear
            clearAll();
            break;
          case "Enter"://press start 
            displayNum();
            break;
          // If KeyPressed is not a number;
          default:
            viewer.innerHTML = "number please!"
        }
      }
    }
  );
};
  keyboard();
  


})();
