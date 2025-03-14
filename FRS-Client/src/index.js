import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import authContext from "./services/authContext";


function renderReact(){
    return (
        <React.StrictMode>
            <App></App>
        </React.StrictMode>
    );
}

ReactDOM.render(renderReact(), document.getElementById("root"));
