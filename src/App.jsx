import "styles/App.scss";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Welcome from "components/Welcome";
import Visit from "components/Visit";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Wait from "components/Wait";
function App() {
  const location = useLocation()
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <div className="App">
          <Routes location={location}>
            <Route path="/" element={<Welcome />} />
            <Route path="/wait" element={<Wait />} />
            <Route path="/visit" element={<Visit />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
