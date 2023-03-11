import React, {Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import lazy from "react-lazy-with-preload";
import 'animate.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const JoinPage = lazy(() => import('./pages/JoinPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function App() {
  return (
    <div className="App">
 <BrowserRouter>
 <Suspense fallback={<div style={{ height: '100vh', overflowY: 'hidden', width: '100%',/* backgroundColor: '#2d98e0'*/ }}><img src="" style={{ filter: 'hue-rotate(212deg)', borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%', transform: 'scale(0.5)', maxWidth: '800px', margin:'auto' }} /></div>}>

      <div className="pages">

        <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/welcome" element={<LandingPage />} />

          {/* <Route exact path="/" element={<Loginpage />} /> */}
          <Route exact path="/login" element={<LoginPage />} />

          <Route exact path="/join" element={<JoinPage />} />

          <Route exact path="/user" element={<HomePage />} />

          <Route exact path="/dashboard" element={<DashboardPage />} />


        </Routes>

      
      </div>
        
      </ Suspense >
      </BrowserRouter>
    </div>
  );
}

export default App;
