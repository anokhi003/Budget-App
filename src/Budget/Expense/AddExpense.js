import { useState ,useEffect} from 'react';
import classes from './AddExpense.module.css';


const AddExpense = (props) => {
    const initialFieldValues = {
        Name: '',
        Cost: '',
        
    }
    const [values, setValues] = useState(initialFieldValues);

  
    useEffect(() => {
        if (props.currentId === ''){
            setValues({
                ...initialFieldValues
            })
        } else {
            setValues({
                ...props.filterItems[props.currentId]
            })
        }
    }, [props.currentId, props.filterItems]);

    
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

        setValues('');
      
    }

    return (
        <div>
            <div>
                <h2>Add Expense</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className={classes.row}>
                    <div className={classes.label}>
                        <label htmlFor='name' >Name</label>
                        <input required='required'
                            type='text'
                            name="Name"
                            className={classes.input}
                            value={values.Name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes.label}>
                        <label htmlFor='cost' >Cost</label>
                        <input required='required'
                            type='text'
                            name="Cost"
                            className={classes.input}
                            value={values.Cost}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>
                <button type='submit'>Save</button>
            </form>
        </div>

    )
 

};

export default AddExpense;