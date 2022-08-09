import React,{useEffect, useState} from 'react';
import classes from './ExpenseTotal.module.css';

const ExpenseTotal = (props) => {
  

    const [cost, setCost] = useState()
 

    useEffect(() => {
        var dataList = props.setvalue;
        var findCost = 0;

        for (const key in dataList) {
            if (Object.hasOwnProperty.call(dataList, key)) {
                const element = dataList[key];
              
                findCost += Number(element.Cost)
                
            }
        }
        setCost(findCost);
  
        return props.expence(findCost);
        
    }, [props.setvalue])

    return (
        <div className={classes.expense_total}>
            <p>Spent so far: ₹{cost}</p>
            
        </div>
    )
}

export default ExpenseTotal;