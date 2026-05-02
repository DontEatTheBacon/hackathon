import { useState } from 'react';
import './App.css';

function App() {
  return (
    <>
      <section id="center">
        <button onClick={async () => {
          const response = await fetch('http://127.0.0.1:8000/');
          const json = await response.json();

         console.log(json);
        }}>

          </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App;