import React, {Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import lazy from "react-lazy-with-preload";

const Homepage = lazy(() => import('./pages/Homepage'));
const Loginpage = lazy(() => import('./pages/Loginpage'));
const Joinpage = lazy(() => import('./pages/Joinpage'));
const Landingpage = lazy(() => import('./pages/Landingpage'));


function App() {
  return (
    <div className="App">
 <BrowserRouter>
 <Suspense fallback={<div style={{ height: '100vh', overflowY: 'hidden', width: '100%',/* backgroundColor: '#2d98e0'*/ }}><img src="" style={{ filter: 'hue-rotate(212deg)', borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%', transform: 'scale(0.5)', maxWidth: '800px', margin:'auto' }} /></div>}>

      <div className="pages">

        <Routes>
          <Route exact path="/" element={<Loginpage />} />
          <Route exact path="/login" element={<Loginpage />} />

          <Route exact path="/landing" element={<Landingpage />} />
          <Route exact path="/join" element={<Joinpage />} />

          <Route exact path="/home" element={<Homepage />} />


        </Routes>

      
      </div>
        
      </ Suspense >
      </BrowserRouter>
    </div>
  );
}

export default App;
