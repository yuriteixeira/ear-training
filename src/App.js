/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.css';
import { NOTES, playNote, intervalNote, startGame } from './game.js'

function App() {
  const [hasGameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      {!hasGameStarted &&
        <section className="start">
          <header>Ear Trainer 🎼</header>
          <button onClick={() => start(setGameStarted)}>Press to START!</button>
        </section>
      }

      {hasGameStarted &&
        <section className="choice">
          <header>What is the interval?</header>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
        </section>
      }
    </div>
  );
}

async function start(setGameStarted) {
  startGame();
  setGameStarted(true);

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
