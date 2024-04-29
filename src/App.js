import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  apikey=process.env.REACT_APP_API_KEY
  render() {
    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <Routes>
        <Route exact path="/" element={<News key='general' country='in' apikey={this.apikey} category='general'/>}></Route>
        <Route exact path="/business" element={<News key='business' country='in' apikey={this.apikey} category='business'/>}></Route>
        <Route exact path="/entertainment" element={<News key='entertainment' apikey={this.apikey} country='in' category='entertainment'/>}></Route>
        <Route exact path="/health" element={<News key='health' country='in' apikey={this.apikey} category='health'/>}></Route>
        <Route exact path="/science" element={<News key='science' country='in' apikey={this.apikey} category='science'/>}></Route>
        <Route exact path="/sports" element={<News key='sports' country='in' apikey={this.apikey} category='sports'/>}></Route>
        <Route exact path="/technology" element={<News key='technology' apikey={this.apikey} country='in' category='technology'/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

