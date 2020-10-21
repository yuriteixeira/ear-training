import React from "react";

export const ChoiceFeedback = ({ isChoiceCorrect, question, end }) => (
  <section className="choice-feedback">
    <p>{isChoiceCorrect ? "CORRECT! 🎉" : "Incorrect... 😨"}</p>

    {!isChoiceCorrect && (
      <p>
        You chose {question.choice + 1} but the write interval is{" "}
        <strong>{question.interval.number + 1}</strong>
      </p>
    )}

    <p>
      <strong>But what about this one?</strong>
    </p>

    <p>
      <button onClick={() => end(false)}>
        No more questions, show me stats
      </button>
    </p>
  </section>
);
