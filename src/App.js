/*
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [hello, setHello] = useState('');

    useEffect(() => {
      axios.get('/api/test')
          .then((res) => {
            setHello(res.data);
          })
    }, []);
    return (
       /!* <div className="App">
          백엔드 데이터 : {hello}
        </div>*!/
    );
  /!*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*!/
}

export default App;*/

/*import React from "react";*/
import { Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Login from "./page/Login"
import SignForm from "./page/SignForm";
import "../src/index.css";
import "./App.css";
import ProductCategory from "./page/ProductCategory";
import Cart from "./page/Cart";
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signForm" element={<SignForm />} />
            <Route path="/productCategory" element={<ProductCategory />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
};

export default App;