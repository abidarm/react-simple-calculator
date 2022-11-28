import { useReducer } from 'react'
import './App.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

const reducer = (state, { type, payload }) => {
  switch(type) {
    case 'add-digit':

      if( payload.digit === '.' && (state.currentOperand == null || state.done === true ) )
        return {
          ...state,
          currentOperand: '0.'
        }

      if( state.done === true )
        return {
          ...state,
          currentOperand: payload.digit
        }

      if( 
        ( payload.digit === '0' && state.currentOperand === '0' )
        ||
        ( payload.digit === '.' && state.currentOperand.indexOf('.') !== -1 )
      )
        return state

      

      return {
        ...state,
        currentOperand: `${ state.currentOperand || '' }${ payload.digit }`
      }

    case 'add-operation':

      // Nothing in output, don't do nothing
      if( state.previousOperand == null && state.currentOperand == null )
        return state

      // Nothing in current operand & same operation already set : nothing
      if( state.currentOperand == null && state.operation === payload.operation )
        return state

      // Nothing in current operand & other operation already set : replace operation
      if( state.currentOperand == null && state.operation != null )
        return {
          ...state,
          operation: payload.operation
        }

      // Nothing in previous operand but something in current
      if( state.previousOperand == null )
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null
        }

      // There's something already in previous operand : evaluate
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }   
      
    case 'evaluate':
      // Nothing in previous operand, don't do nothing
      if( state.previousOperand == null )
        return state

      // Nothing in current operand : show previous operand
      if( state.currentOperand == null )
        return {
          ...state,
          currentOperand: state.previousOperand,
          previousOperand: null,
          operation: null
        }
      
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
        done: true
      }

    case 'clear':
      return {
        ...state,
        currentOperand: ''
      }

    case 'reset':
      return {}

    default:
      return state
  }
}

const evaluate = (state) => {
  if( state.operation === '+' )
    return +state.previousOperand + +state.currentOperand
  if( state.operation === '-' )
    return +state.previousOperand - +state.currentOperand
  if( state.operation === 'x' )
    return +state.previousOperand * +state.currentOperand
  if( state.operation === '/' )
    return +state.previousOperand / +state.currentOperand
}

const App = () => {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className='calculator'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button onClick={() => dispatch({ type: 'reset' })} className='span-2'>AC</button>
      <button onClick={() => dispatch({ type: 'clear' })}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="x" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button onClick={() => dispatch({ type: 'evaluate' })} className='span-2'>=</button>
      
    </div>
  );
}

export default App
