import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import styles from "../assets/styles/index.css"

//import components
import NavBar from '../components/NavBar'

function App() {
  return (
    <Router>
      <div class="flex flex-col mx-auto">
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route>

            </Route>
          </Routes>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
