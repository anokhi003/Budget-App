import { useState } from 'react';
import { useNavigate } from 'react-router';
//import AuthContext from '../../store/auth-context';
import fireDb from '../../firebase';
import { getAuth, signInWithEmailAndPassword,sendEmailVerification } from 'firebase/auth'
import classes from '../Form/Form.module.css';


const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  // const authCtx = useContext(AuthContext);

  const SubmitHandler = e => {
    e.preventDefault();
    const auth = getAuth(fireDb);
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {   
         navigate('/Budget')
         
        })
      .catch(err => console.log(err.message))
    }
    })
    .catch(err => setError(err.message))

  }


  return (
    <>
      <h1> Login</h1>
      {error && <div className='auth__error'>{error}</div>}
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email id</label>
          <input type='email' id='email' required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'> Password</label>
          <input type='password' id='password' required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={classes.actions}>

          <button type='submit' >Login</button>

        </div>
      </form>
    </>
  );
};

export default Login;

