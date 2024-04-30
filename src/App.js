import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

const App=()=>{
  const apikey=process.env.REACT_APP_API_KEY

    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <Routes>
        <Route exact path="/" element={<News key='general' country='in' apikey={apikey} category='general'/>}></Route>
        <Route exact path="/business" element={<News key='business' country='in' apikey={apikey} category='business'/>}></Route>
        <Route exact path="/entertainment" element={<News key='entertainment' apikey={apikey} country='in' category='entertainment'/>}></Route>
        <Route exact path="/health" element={<News key='health' country='in' apikey={apikey} category='health'/>}></Route>
        <Route exact path="/science" element={<News key='science' country='in' apikey={apikey} category='science'/>}></Route>
        <Route exact path="/sports" element={<News key='sports' country='in' apikey={apikey} category='sports'/>}></Route>
        <Route exact path="/technology" element={<News key='technology' apikey={apikey} country='in' category='technology'/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;
