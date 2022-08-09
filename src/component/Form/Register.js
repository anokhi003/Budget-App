import { useState } from 'react';
import { useNavigate } from 'react-router';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../../store/auth-context';
 import fireDb from '../../firebase';
import {getAuth ,createUserWithEmailAndPassword } from 'firebase/auth'
import classes from '../Form/Form.module.css';


const Register = () => {

const navigate = useNavigate();

const [email,setEmail] = useState('');
const [password, setPassword] = useState('');



 const register = e =>{
  e.preventDefault();
  
//   function writeUserData(user) {
//     fireDb.database().ref('users/' + user.uid).set(user).catch(error => {
//         console.log(error.message)
//     });
// }


  const auth = getAuth(fireDb);
  createUserWithEmailAndPassword(auth, email, password)
  .then((user) =>{

    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        const element = user[key];
            
        const User = {
          uid : element.uid,
          email : element.email
        }
        fireDb.database().ref('users/' + User.uid).set(User)
        .catch((err) => console.log(err.message))
      }
    }
       navigate('/')
  })
  .catch((err) => console.log(err.message));
   
  setEmail('');
  setPassword('');

 }

 
  return (
    <>
      <h1> Sign Up</h1>

      <form onSubmit={register}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>

         <input type='email' id='email' required   value={email} onChange={e => setEmail(e.target.value)} />
           
          
        </div>
        <div className={classes.control}>
          <label htmlFor='password'> Password</label>
          <input type='password' id='password' required  value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={classes.actions}>
          
          <button type='submit'>Create Account</button>
         
        </div>
      </form>
    </>
  );
};

export default Register;

