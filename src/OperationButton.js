import React from 'react'

const OperationButton = ({ dispatch, operation }) => {
  return (
    <button onClick={() => dispatch({ type: 'add-operation', payload: { operation } })}>
        {operation}
    </button>
  )
}

export default OperationButton