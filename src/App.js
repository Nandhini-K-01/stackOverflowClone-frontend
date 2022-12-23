import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import StackOverflow from "./components/StackOverflow";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Question from "./components/AddQuestion/Question";
import ViewQuestion from "./components/ViewQuestion";
import Auth from "./components/Auth";

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
        <Routes>
          <Route exact path="/" element={<Auth/>}/>
          <Route exact path="/add-question" element={<Question/>}/>
          <Route exact path="/view-question" element={<ViewQuestion/>}/>
          <Route exact path="/questions" element={<StackOverflow/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
