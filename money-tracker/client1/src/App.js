import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Button} from 'antd'; 
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='/test' element={<ProtectedRoute><Test/></ProtectedRoute>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props){
  if(localStorage.getItem('mymoney-user')){
    return props.children;
  } else{
    return <Navigate to='/login'></Navigate>
  }
}

export default App;
