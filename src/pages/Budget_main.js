import React, { useState } from 'react'
import classes from './Budget_main.module.css';
import Budget from '../Budget/Budget';
import Remaining from '../Budget/Remaining';
import ExpenseTotal from '../Budget/ExpenseTotal';
import ExpenseList from '../Budget/Expense/ExpenseList';


const BudgetMain = () => {

    const [data ,setData] = useState([]);
    const [spentCost ,setSpentCost] = useState();
    const [budgetTotal,setBudgetTotal] = useState();
   

    const DataList = (childData) => {
          setData(childData);
    }
    
    const getSpent = (cost) => {      
        setSpentCost(cost)
    }
   
    const getBudget = (budget) => {
        for (const key in budget) {
            if (Object.hasOwnProperty.call(budget, key)) {
                const element = budget[key];
                setBudgetTotal(element.BudgetValues);
               
            }
        } 
    }
    
 
    return (
   
           <div className={classes.container}>
          <h1 className={classes.title}>My Budget Planner</h1>
          <div className={classes.display_values}>
             <Budget getBudget={(val) => getBudget(val)}/>
             <Remaining spentCost={spentCost} budgetTotal={budgetTotal}/>
             <ExpenseTotal setvalue={data} expence={(data) => getSpent(data)}/>
          </div>
        
          <ExpenseList dataList={(data) => DataList(data)} />
          
        </div> 
       
        
    )
}

export default BudgetMain;
