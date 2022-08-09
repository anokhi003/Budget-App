import { useState, useEffect, useContext } from 'react';

import AddExpense from "./AddExpense"
import classes from './ExpenseList.module.css'
import fireDb from "../../firebase";
import { AuthContext } from '../../store/auth-context';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';


const ExpenseList = (props) => {
    const fire = fireDb.database().ref();
    const [expenseItems, setExpenseItems] = useState({});
    const [currentId, setCurrentId] = useState('');
    const [filterItems, setFilterItems] = useState({});
    const [userName, setUserName] = useState('');

    const [isLoading,setIsLoading] = useState(true);

    const { user } = useContext(AuthContext);
    useEffect(() => {
        var currentUserData = user
        for (const key in currentUserData) {

            if (Object.hasOwnProperty.call(currentUserData, key)) {
                const element = currentUserData;
                setUserName(element.uid);
                return;
            }
        }
    }, [user])


    fire.child(`users/${userName}`).on('value', snapshot => {
        if (snapshot.val() !== null) {
            var userList = snapshot.val();
            for (const id in userList) {
                if (Object.hasOwnProperty.call(userList, id)) {
                    const element = userList;
                }
            }
        }
    })
    useEffect(() => {
        fire.child(`users/${userName}/Expenses`).on('value', snapshot => {

            if (snapshot.val() !== null) {
                setExpenseItems({
                    ...snapshot.val()

                })
                setFilterItems({ ...snapshot.val() })
                setIsLoading(false);
            } else {
                setExpenseItems({});
                setFilterItems({});
            }
        })

    }, [userName]);

    useEffect(() => {
        return props.dataList(expenseItems);

    }, [expenseItems])

    const addOrEdit = (obj) => {
        if (currentId === '') {
            fire.child(`users/${userName}/Expenses`).push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
        else
            fire.child(`users/${userName}/Expenses/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
       // setExpenseItems(obj)
    }

    const onDelete = key => {
        if (window.confirm('Are you sure to delete this record?')) {

            fire.child(`users/${userName}/Expenses/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        var localFilter = [];

        for (const key in expenseItems) {
            if (Object.hasOwnProperty.call(expenseItems, key)) {
                const element = expenseItems[key];
                if (((element.Name).toLowerCase()).indexOf((e.target.value).toLowerCase()) >= 0) {
                    localFilter.push(element)
                }
            }
        }
        setFilterItems(localFilter);
        return props.dataList(expenseItems);
    }
 if (isLoading) {
        return (
            <section className={classes.item_loading}>
                <p>loading..</p>
            </section>
        )
    }


    return (
        <div>
            <div>
                <h2>Expenses</h2>
                <form>
                    <input className={classes.filter_input}
                        placeholder='Type to search...'
                        onChange={e => submitHandler(e)}
                    />
                </form>

                <ul>{
                    Object.keys(filterItems).map(id => {
                        return <li className={classes.list_Item} key={id}>
                            {filterItems[id].Name}
                            <div className={classes.list_Budge}>
                                <span className={classes.budge}> {filterItems[id].Cost}</span>
                                <AiFillEdit className={classes.icons} onClick={() => { setCurrentId(id) }} />
                                <AiFillDelete className={classes.icons} onClick={() => { onDelete(id) }} />
                            </div>
                        </li>

                    })
                }
                </ul>
            </div>
            <AddExpense  {...({ addOrEdit, currentId, filterItems })} />

        </div>

    )
};

export default ExpenseList;