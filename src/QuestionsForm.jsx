import { playIntervalQuestion } from './engine';
import React from 'react';

export const QuestionsForm = ({ answer, question, nextQuestion, end }) => (
  <section className="question">
    <header>What is the interval?</header>

    <section className="choice">
      <button value={0} onClick={answer} disabled={!question.hasPlayed}>
        1
      </button>
      <button value={1} onClick={answer} disabled={!question.hasPlayed}>
        2
      </button>
      <button value={2} onClick={answer} disabled={!question.hasPlayed}>
        3
      </button>
      <button value={3} onClick={answer} disabled={!question.hasPlayed}>
        4
      </button>
      <button value={4} onClick={answer} disabled={!question.hasPlayed}>
        5
      </button>
      <button value={5} onClick={answer} disabled={!question.hasPlayed}>
        6
      </button>
      <button value={6} onClick={answer} disabled={!question.hasPlayed}>
        7
      </button>
      <button value={7} onClick={answer} disabled={!question.hasPlayed}>
        8
      </button>
    </section>

    <section className="other-actions">
      <button onClick={() => playIntervalQuestion(question)} disabled={!question.hasPlayed}>
        Re-play
      </button>

      <button onClick={nextQuestion} disabled={!question.hasPlayed}>
        Next!
      </button>

      <button onClick={end} disabled={!question.hasPlayed}>
        I'm done... Stats!
      </button>
    </section>
  </section>
);
