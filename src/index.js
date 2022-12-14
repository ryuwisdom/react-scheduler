import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Main from './Main';
import SchedulerView from "./components/SchedulerView";
import reportWebVitals from './reportWebVitals';
import {
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/view' element={<SchedulerView theday={new Date()}/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
