

import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import fireDb from '../../firebase'

import classes from './Form.module.css';

const AuthForm = () => {

  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //
  const initialUserValues = {
    UserValues: ''

  }
  const [values, setValues] = useState(initialUserValues);
  //
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [userObj, setUserObj] = useState({});
  const [userId, setUserId] = useState('');

  ///

  useEffect(() => {
    fireDb.child('User').on('value', snapshot => {
      if (snapshot.val() !== null) {
        setUserObj({
          ...snapshot.val()
          
        })

      } else {
        setUserObj({});
      }

    })
    // fireDb.child('User').orderByChild('UserValues').equalTo(values).once('value').then(
    //   snapshot => {
    //     if(snapshot.exists()){
    //       let userData = snapshot.val();
    //       console.log(userData);
    //      alert('username is taken');
    //       return userData;
    //     }else {
    //            setUserObj({});
    //           }
    //   }
    // )

  }, []);


  useEffect(() => {

    if (userId === '')
      setValues({
        ...initialUserValues
      })
    else
      setValues({
        ...userObj[userId],

      })
    
  }, [userId, userObj])



  const handleInputChange = () => {

    setValues({
      UserValues: emailInputRef.current.value
    }


    )
  };
  ///

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  ////
  const addOrEdit = (obj) => {
    fireDb.child('User').orderByChild('UserValues').equalTo(values.UserValues).once('value').then(
      snapshot => {
        if (snapshot.exists()) {
          
          alert('username is taken');
          
        } else {
          console.log();
          let userData = snapshot.val();
          fireDb.child('User').push(
           obj ,
            
            err => {
              if (err)
                console.log(err)
              else {
    
                setUserId('')
              }
            }
          )
          console.log(userData.UserValues);
          return userData;
        }
      }
    )

    // if (userId === '') {
    //   fireDb.child('User').push(
    //     obj,
    //     err => {
    //       if (err)
    //         console.log(err)
    //       else {

    //         setUserId('')
    //       }
    //     }
    //   )
    // }

    // else {
    //   fireDb.child(`User/${userId}`).set(

    //     obj,
    //     err => {
    //       if (err)
    //         console.log(err)
    //       else
    //         setUserId('')
    //     }
    //   )
    // }


  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // validation here
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkgmX5gomPwIHuPd9OrymvQIBJnSk25XA';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkgmX5gomPwIHuPd9OrymvQIBJnSk25XA';
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(async res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authenticatin Failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }

          throw new Error(errorMessage);
        });
      }
    }).then(data => {
      console.log(data, data.localId);

      const exprirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));

      authCtx.login(data.idToken, exprirationTime.toISOString());

      navigate('/Budget');
    }).catch(err => {
      alert(err.message);
    });

    //
    addOrEdit(values);

    //     if(values.UserValues === ''){
    // alert("fill input");
    // return
    // }

  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>

          {isLogin ? <input type='email' id='email' required ref={emailInputRef} value={values.UserValues} onChange={handleInputChange} />
            : <input type='email' id='email' required ref={emailInputRef} />
          }
        </div>
        <div className={classes.control}>
          <label htmlFor='password'> Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
        
          {isLogin ? <button>Login</button> : <button>Create Account</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;