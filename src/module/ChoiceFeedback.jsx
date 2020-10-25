import React from 'react';

export const ChoiceFeedback = ({ isChoiceCorrect, chosenInterval, correctInterval, nextQuestion, end }) => (
  <section className="choice-feedback">
    <p>{isChoiceCorrect ? 'CORRECT! 🎉' : 'Incorrect... 😨'}</p>

    {!isChoiceCorrect && (
      <p>
        You chose {chosenInterval?.name} but the right interval is <strong>{correctInterval?.name}</strong>
      </p>
    )}

    <p>
      <strong>But what about this one?</strong>
    </p>

    <p>
      <button onClick={nextQuestion}>Next, pls!</button>
    </p>

    <p>
      <button onClick={() => end(false)}>I'm done... Stats!</button>
    </p>
  </section>
);
