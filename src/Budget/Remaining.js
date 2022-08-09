import React,{useEffect, useState} from 'react';
import classes from './Remaining.module.css';

const Remaining = (props) => {
    
    const [remainingCost, setRemainingCost] = useState()
    const [budgetCost, setBudgetCost] = useState()

    useEffect(() => {
        setRemainingCost(props.spentCost)
        setBudgetCost(props.budgetTotal)
    }, [props.spentCost , props.budgetTotal])
  
    return( 
        <div className={classes.remaining} >
            <p>Remaining: ₹{Number(budgetCost) - remainingCost}</p>
        </div>
    )
};

export default Remaining;