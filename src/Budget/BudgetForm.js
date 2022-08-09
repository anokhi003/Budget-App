import React, { useState, useEffect } from "react";
import classes from './Budget.module.css';
const BudgetValues = (props) => {
    const initialFieldValues = {
        BudgetValues: ''        
    }
   
    const [values, setValues] = useState(initialFieldValues);
   

    useEffect(() => {
  
        if (props.budgetId === '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.BudgetObject[props.budgetId]
            })     
    }, [props.budgetId, props.BudgetObject])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.addOrEdit(values);
        if(values.BudgetValues === ''){
    alert("fill input");
    return
}
        return props.setBudget(event.target.value)
    }

    
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div  className="form-row">
                    <div className="form-group input-group" >
                        <input className={classes.BudgetInput} placeholder="BudgetValue" name="BudgetValues" value={values.BudgetValues} onChange={handleInputChange} />
                    
                     </div>
                   <button  value="save" type="submit" >Save</button>
                    </div>
            </form>

        </div>
    );
}

export default BudgetValues;