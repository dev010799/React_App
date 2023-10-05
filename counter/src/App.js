import React, {useReducer} from 'react'
import DigitButton from "./digitButton"
import operationButton from "./operationButton"
import  "./styles.css" 

{/* <----------------------------------------------------------------------------------------------------------------> */}

// function App() {
//   const [count, setCount] = useState(0)
//   return <div className="container my-5">
//     <div className="card text-center my-5">
//       <div className="card-body">
//         <h1>Counter App</h1>
//         <div className="my-5">
//           <h2 className="my-5">{count}</h2>
//           <button className="btn btn-success mx-3" onClick = {() => setCount(count + 1)}>Increment</button>
//           <button className="btn btn-danger mx-3"  onClick = {() => setCount(count - 1)}>Decrement</button>
//           <button className="btn btn-secondary mx-3" onClick = {() => setCount(0)}>Reset</button>
          


//         </div>
//       </div>

//     </div>
//   </div>
// }
{/* <-------------------------------------------------------------------------------------------------------------------> */}

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  clear: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}
function reducer(state, {type, payloads}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if(payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${currentOperand || ""}${payload.digit}`
      }
        case ACTIONS.CHOOSE_OPERATION:
          if(state.currentOperand == null && state.previousOperand == null) {
            return state
          }

          if(state.currentOperand == null) {
            return {
              ...state,
              operation: payload.operation,

            }
          }

        

          if(state.previousOperand == null) {
            return {
              ...state,
              operation: payload.operation,
              previousOperand: state.currentOperand,
              currentOperand: null,
            }
          }

          return {
            ...state,
            previousOperand: evaluate(state),
            operation: payload.operation,
            currentOperand: null
          }
      case ACTIONS.CLEAR:
        return {}
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null
          }
        }
        if(state.currentOperand == null) return state
        if(state.currentOperand.length === 1) {
          return {...state, currentOperand: null}
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }
      case ACTIONS.EVALUATE:
        if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
          return state
        }

        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }

  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch(operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break;
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

 function App() {
  const[{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  return(
    <div className="Calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
          <div className="current-operand">{formatOperand(currentOperand)}</div> 
      </div>
      <button className="span-two" onclick = {() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onclick = {() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton digit="/" dispatch={dispatch} />
      <digitButton digit="1" dispatch={dispatch} />
      <digitButton digit="2" dispatch={dispatch} />
      <digitButton digit="3" dispatch={dispatch} />
      <OperationButton digit="*" dispatch={dispatch} />
      <digitButton digit="4" dispatch={dispatch} />
      <digitButton digit="5" dispatch={dispatch} />
      <digitButton digit="6" dispatch={dispatch} />
      <OperationButton digit="+" dispatch={dispatch} />
      <digitButton digit="7" dispatch={dispatch} />
      <digitButton digit="8" dispatch={dispatch} />
      <digitButton digit="9" dispatch={dispatch} />
      <OperationButton digit="-" dispatch={dispatch} />
      <digitButton digit="." dispatch={dispatch} />
      <digitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onclick = {() => dispatch({type: ACTIONS.EVALUATE})}>=</button> 
    </div>
  )
 }

export default App;
