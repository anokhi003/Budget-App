import React, { useState, useEffect, useContext } from 'react';
import fireDb from "../firebase"
import classes from './Budget.module.css';
import BudgetForm from './BudgetForm';
import { AuthContext } from '../store/auth-context';
// import { getAuth } from "firebase/auth";

const Budget = (props) => {
 const fire = fireDb.database().ref();
    const [BudgetObject, setBudgetObject] = useState({});
    const [budgetId, setBudgetId] = useState('');
    const [budgetValue, setBudgetValue] = useState(0);
    const [isSaved, setIsSaved] = useState(true);
    const [userName, setUserName] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        var currentUserData = user
        for (const key in currentUserData) {
            console.log(currentUserData)
            if (Object.hasOwnProperty.call(currentUserData, key)) {
               
                const element = currentUserData;

                console.log(element.uid);
                setUserName(element.uid);
                return;
            }
        }

    }, [user])

   
    useEffect(() => {   

        fire.child(`users/${userName}`).on('value', snapshot => {
            if (snapshot.val() !== null) {
                var userList = snapshot.val();
                for (const id in userList) {
                    if (Object.hasOwnProperty.call(userList, id)) {
                        const element = userList;
                    }
                }
            }
        }
       )       
        fire.child(`users/${userName}/Budget`).on('value', snapshot => {
            if (snapshot.val() !== null) {
                setBudgetObject({
                    ...snapshot.val()
                })
                console.log(snapshot.val())
            } else {
                setBudgetObject({});
            }
        })
    }, [userName]);

 
    useEffect(() => { 
        for (const key in BudgetObject) {
            if (Object.hasOwnProperty.call(BudgetObject, key)) {
                const element = BudgetObject[key];
                setBudgetValue(element.BudgetValues)
                console.log(BudgetObject);
            }
        }
        return props.getBudget(BudgetObject)
    }, [BudgetObject])


    const addOrEdit = (obj) => {
        if (budgetId === '') {
            fire.child(`users/${userName}/Budget`).push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setBudgetId('')
                }
            )
            console.log(obj.BudgetValues)
            setBudgetValue(obj.BudgetValues)
        }

        else {
            fire.child(`users/${userName}/Budget/${budgetId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setBudgetId('')
                }
            )
        }
    }

    const setBudget = () => {
             setIsSaved(!isSaved)
  }
   return (
        <div className={classes.budget_value}>
           
            {isSaved ?
                <>
                    Budget: ₹{budgetValue} <button onClick={setBudget} >Edit</button>
                </>
                : <BudgetForm  {...({ addOrEdit, budgetId, BudgetObject, setBudget })} />}
        </div>
    )
}

export default Budget;
