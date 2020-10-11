/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.css';
import { startGame, createIntervalQuestion, playIntervalQuestion } from './game.js'

function App() {
  const [hasGameStarted, setGameStarted] = useState(false);
  const [intervalQuestion, setIntervalQuestion] = useState(createIntervalQuestion());

  return (
    <div className="app">
      {!hasGameStarted &&
        <section className="start">
          <header>Ear Trainer 🎼</header>
          <button onClick={() => start(setGameStarted, intervalQuestion)}>Press to START!</button>
        </section>
      }

      {hasGameStarted &&
        <section className="question">
          <header>What is the interval?</header>

          <section className="choice">
            <button value={1}>1</button>
            <button value={2}>2</button>
            <button value={3}>3</button>
            <button value={4}>4</button>
            <button value={5}>5</button>
            <button value={6}>6</button>
            <button value={7}>7</button>
          </section> 

          <section className="repeat">
            <button onClick={() => playIntervalQuestion(intervalQuestion)}>
              Repeat, please!
            </button>
          </section>

          <section className="skip">
            <button onClick={() => nextQuestion(setIntervalQuestion)}>
              Too hard... Next!
            </button>
          </section>
        </section>
      }
    </div>
  );
}

async function start(setGameStarted, intervalQuestion) {
  startGame();
  setGameStarted(true);
  await playIntervalQuestion(intervalQuestion);
}

async function nextQuestion(setIntervalQuestion) {
  const intervalQuestion = createIntervalQuestion();
  setIntervalQuestion(intervalQuestion);
  await playIntervalQuestion(intervalQuestion);
}

export default App;
