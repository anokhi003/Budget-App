import React, { useContext } from 'react';
import classes from './Navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {AuthContext} from '../../store/auth-context';
import fireDb from '../../firebase';
import { getAuth } from 'firebase/auth';

function Navbar() {
 
    const { user } = useContext(AuthContext); 
    // const auth = getAuth(fireDb);
    const navigate = useNavigate();

    const logoutHandler = () => {
          const auth = getAuth(fireDb);
          auth.signOut().then(() => {
              navigate('/Login')
              
          }).catch((err) => {console.log(err)});
      }
    //   () => auth.signOut().then( navigate('/'))

    return (
        <div className={classes.navbar}>
            <NavLink className={classes.navlink} to="/">
                <div className={classes.logo}>Budget Book</div>
            </NavLink>
            <div className={classes.navlink_group}>
                {/* <NavLink className={classes.navlink} to="/">Home</NavLink> */}
             {!user && (<NavLink className={classes.navlink} to="/Login">Login</NavLink>)}   
             {!!user  && (<NavLink className={classes.navlink} to="/Budget">Budget</NavLink>)} 
             {!!user && (<button className={classes.logout} onClick={logoutHandler}>logout</button>)}

            </div>

        </div>
    )
}

export default Navbar;
