/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.css';
import { startGame, createIntervalQuestion, playIntervalQuestion } from './game.js'

function App() {
  const [hasGameStarted, setGameStarted] = useState(false);
  const [intervalQuestion, setIntervalQuestion] = useState(createIntervalQuestion());
  const [result, setResult] = useState(null);

  return (
    <div className="app">
      {!hasGameStarted &&
        <section className="start">
          <header>Ear Trainer 🎼</header>
          <button onClick={() => start(setGameStarted, intervalQuestion)}>Press to START!</button>
        </section>
      }

      {hasGameStarted && result === null &&
        <section className="question">
          <header>What is the interval?</header>

          <section className="choice">
            <button onClick={() => answer(0, intervalQuestion, setIntervalQuestion, setResult)}>1</button>
            <button onClick={() => answer(1, intervalQuestion, setIntervalQuestion, setResult)}>2</button>
            <button onClick={() => answer(2, intervalQuestion, setIntervalQuestion, setResult)}>3</button>
            <button onClick={() => answer(3, intervalQuestion, setIntervalQuestion, setResult)}>4</button>
            <button onClick={() => answer(4, intervalQuestion, setIntervalQuestion, setResult)}>5</button>
            <button onClick={() => answer(5, intervalQuestion, setIntervalQuestion, setResult)}>6</button>
            <button onClick={() => answer(6, intervalQuestion, setIntervalQuestion, setResult)}>7</button>
            <button onClick={() => answer(7, intervalQuestion, setIntervalQuestion, setResult)}>1</button>
          </section> 

          <section className="repeat">
            <button onClick={() => playIntervalQuestion(intervalQuestion)}>
              Repeat, please!
            </button>
          </section>

          <section className="next">
            <button onClick={() => nextQuestion(setIntervalQuestion, setResult)}>
              Next!
            </button>
          </section>
        </section>
      }

      {hasGameStarted && result !== null &&
        <section className="result">
          { result ? 'CORRECT! 🎉' : 'Incorrect... 😨' }
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

async function nextQuestion(setIntervalQuestion, setResult) {
  setResult(null);
  const intervalQuestion = createIntervalQuestion();
  setIntervalQuestion(intervalQuestion);
  await playIntervalQuestion(intervalQuestion);
}

async function answer(choice, intervalQuestion, setIntervalQuestion, setResult) {
  const result = choice === intervalQuestion.interval.number;
  setResult(result);
  setTimeout(() => { nextQuestion(setIntervalQuestion, setResult); }, 2000);
}

export default App;
