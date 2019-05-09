import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Alert Default
const options = {
    position: "top center",
    timeout: 2000,
    offset: "40px",
    transition: "scale"
};

//wrap alert 
class Root extends Component {
    render() {
        return(
            <AlertProvider template={AlertTemplate} {...options}>
            <App/>
            </AlertProvider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
