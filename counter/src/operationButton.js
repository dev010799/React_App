import { ACTIONS } from './App'
export default function OperationButton({dispatch, operation}) {
    return (
        <button 
            onclick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation} })}>
        {digit}

        {operation}
        </button>
        
        
    )
}