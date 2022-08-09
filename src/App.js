import { Route, Routes ,Navigate} from 'react-router-dom';

import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import BudgetMain from './pages/Budget_main';
import Layout from './component/Layout/Layout';
import { useContext } from 'react';
import { AuthProvider ,AuthContext} from './store/auth-context';




function App() {
     // const { user } = useContext(AuthContext); 
     return (

          <AuthProvider>
          <Layout>
               <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                   <Route path="/Login" element={<MainPage />} />
                   <Route path="/Budget" element={<BudgetMain />} />
                    
                    <Route path="*" element={<Navigate replace to="/" />} />
               </Routes>
          </Layout>
          </AuthProvider>


     );
}

export default App;
