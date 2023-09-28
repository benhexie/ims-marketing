import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Landing from './pages/Home/Landing';
import Login from './pages/Home/Login';
import Signup from './pages/Home/Signup';
import Error from './pages/Error';
import Product from './pages/Home/Product';
import Front from './pages/Home/Landing/Front';
import { useState } from 'react';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NewProduct from './pages/NewProduct';

const SERVER = process.env.REACT_APP_SERVER;

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${SERVER}/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "text/html",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setLoggedIn(true);
        else {
          localStorage.removeItem("token");
          setLoggedIn(false);
        };
      }).catch(err => {
        console.log(err.message);
      })
    }
  }, [loggedIn])

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route path='/' element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
            <Route path='/' element={<Landing />}>
              <Route index element={<Front />} />
              <Route path='category/:category' element={<Front />} />
              <Route path='product/:id' element={<Product />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='new-product' element={<NewProduct />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
