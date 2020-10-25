import { playIntervalQuestion } from '../lib/game';
import React from 'react';

export const QuestionsForm = ({ game, question, nextQuestion, answer, end }) => (
  <section className="question">
    <header>What is the interval?</header>

    <section className="choice">
      {game.scale.map((interval, idx) => (
        <button key={interval.name} value={idx} onClick={answer} disabled={!question.hasPlayed}>
          {interval.name}
        </button>
      ))}
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
