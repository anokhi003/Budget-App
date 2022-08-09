import { useState } from 'react';
import Register from '../component/Form/Register'
import classes from '../component/Form/Form.module.css';
import Login from '../component/Form/Login'

function MainPage() {

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  return (
    <section className={classes.auth}>
      {isLogin ? <Login /> : <Register />}
      <div className={classes.actions}>
        <button
          type='button'
          className={classes.toggle}
          onClick={switchAuthModeHandler}>
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>


      </div>

    </section>
  )
}

export default MainPage
