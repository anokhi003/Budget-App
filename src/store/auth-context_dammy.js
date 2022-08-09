
import React, {useContext} from 'react'

const AuthContext = React.createContext()

export function AuthProvider({children, value}) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthValue(){
  return useContext(AuthContext)
}

//

import React ,{useState , useEffect ,useCallback}from 'react'

let logoutTimer;

const AuthContext = React.createContext({
    token:'',
    isLoggedIn :false,
    login : (token) => {},
    logout: () => {}
});
const calculateRemaingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExprirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExprirationTime - currentTime;

    return remainingDuration;
};
const retrieveStoredToken = () => {
        const storedtoken =localStorage.getItem('token');
        const storedExpirationDate = localStorage.getItem('expirationTime');

        const remainingTime = calculateRemaingTime(storedExpirationDate);

        if(remainingTime <= 3600){
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return null;
        }
        return {
           token: storedtoken,
           duration : remainingTime
        };
}
export const AuthContextProvider = (props) =>{
    const tokenData = retrieveStoredToken();

    let initialToken;
    if(tokenData){
        initialToken = tokenData.token;
    }
   
    const [token,setToken] = useState(initialToken);
    
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if(logoutTimer){
                clearTimeout(logoutTimer);
        }
        
    },[]);
    const loginHandler = (token,expirationTime) => {
        setToken(token);
        localStorage.setItem('token',token);
        localStorage.setItem('expirationTime',expirationTime);
        const remainingTime = calculateRemaingTime(expirationTime);

        logoutTimer=  setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if(tokenData){
            console.log(tokenData.duration);
            logoutTimer=  setTimeout(logoutHandler, tokenData.duration);
        }
    },[tokenData,logoutHandler]);

     const contextValue = {
        token: token,
        isLoggedIn :userIsLoggedIn,
       login: loginHandler,
       logout: logoutHandler
    };
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;