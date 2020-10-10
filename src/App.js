import React from 'react';
import './App.css';
import { NOTES, playNote, intervalNote } from './game.js'

function App() {

  return (
    <div className="app">
      <header className="app-header">
        What is the interval?
      </header>

      <section>
        <button onClick={startGame}>Press to START!</button>
      </section>

      <section>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
      </section>
    </div>
  );
}

async function startGame() {
  const note = NOTES.C;
  await playNote(note);
  await playNote(intervalNote(1, note));
  await playNote(intervalNote(2, note));
  await playNote(intervalNote(3, note));
  await playNote(intervalNote(4, note));
  await playNote(intervalNote(5, note));
  await playNote(intervalNote(6, note));
  await playNote(intervalNote(7, note));
}

export default App;
