import React, { useState } from 'react';
import './App.css';

function App() {
  
  // Create a display state variable which is going to be shown on the display element:
  const [display, setDisplay] = useState("0");
  
  // Create an expression state variable which is going to be shown on the calcDisplay element:
  const [expression, setExpression] = useState("");
  
  // Create an array with the operators, which will help when configuring button's behaviour:
  const operators = ["+", "-", "*", "/"];
  
  // Create the function of the clear button, clearing the expression display and the result display:
  const clear = () => {
    setExpression("");
    setDisplay("0");
  }
  
  // Create the function that returns the result of the input expression:
  const getResult = () => {
    let result = eval(expression).toString();
    setExpression(expression.concat(`=${result}`));
    setDisplay(result);
  }
  
  // Create getSymbol function, which inputs the symbol from the button, following the requirements from the freecodecamp project. (Requirements available on the README file):
  const getSymbol = (symbol) => {
    
    // If display is on its initial state, the input symbol should replace it:
    if (display === "0") {
      setExpression(symbol);
      setDisplay(symbol);
      
    // Configure the various ways in which the operators should behave on the app:
    }else if (operators.includes(symbol)) {
      if (expression.includes("=")) {
        setExpression(expression.split("=")[1].concat(symbol));
        setDisplay(symbol);
      } else if (operators.includes(expression[expression.length - 1])) {
        if (symbol === "-") {
          setExpression(expression.concat(symbol));
        } else {
          if (operators.includes(expression[expression.length - 2])) {
            setExpression(expression.slice(0, expression.length -2).concat(symbol))
          } else {
            setExpression(expression.slice(0, expression.length -1).concat(symbol));
          }  
        }
      } else {
        setExpression(expression.concat(symbol))
      }
      setDisplay(symbol);
      
    // Configure the way the "." symbol should behave when input to the calculator:
    } else if (symbol === ".") {
      if (expression.split(/[^0-9.]/)[expression.split(/[^0-9.]/).length -1].includes(".") === false) {
        setExpression(expression.concat(symbol));
        setDisplay(display.concat(symbol));
      }
    
    // Configure the way numbers should behave when input to the calculator:
    } else {
      if (expression.includes("=")) {
        setExpression(symbol);
        setDisplay(symbol);
      } else if (operators.includes(display)) {
        setExpression(expression.concat(symbol));
        setDisplay(symbol);
      } else {
        setExpression(expression.concat(symbol));
        setDisplay(display.concat(symbol));
      }
    }   
  }
  
  return (
    <div className="App">
      <div className="container">
        <div className="grid">
          <div id="calcDisplay" className="calcDisplay">{expression}</div>
          <div id="display" className="display">{display}</div>
          <div onClick={() => clear()} id="clear" className="pad AC">AC</div>
          <div onClick={() => getSymbol("/")} id="divide" className="pad divide">/</div>
          <div onClick={() => getSymbol("*")} id="multiply" className="pad multiply">X</div>
          <div onClick={() => getSymbol("7")} id="seven" className="pad seven">7</div>
          <div onClick={() => getSymbol("8")} id="eight" className="pad eight">8</div>
          <div onClick={() => getSymbol("9")} id="nine" className="pad nine">9</div>
          <div onClick={() => getSymbol("-")} id="subtract" className="pad subtract">-</div>
          <div onClick={() => getSymbol("4")} id="four" className="pad four">4</div>
          <div onClick={() => getSymbol("5")} id="five" className="pad five">5</div>
          <div onClick={() => getSymbol("6")} id="six" className="pad six">6</div>
          <div onClick={() => getSymbol("+")} id="add" className="pad add">+</div>
          <div onClick={() => getSymbol("1")} id="one" className="pad one">1</div>
          <div onClick={() => getSymbol("2")} id="two" className="pad two">2</div>
          <div onClick={() => getSymbol("3")} id="three" className="pad three">3</div>
          <div onClick={getResult} id="equals" className="pad equals">=</div>
          <div onClick={() => getSymbol("0")} id="zero" className="pad zero">0</div>
          <div onClick={() => getSymbol(".")} id="decimal" className="pad decimal">.</div>
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
