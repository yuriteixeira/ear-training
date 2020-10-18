import React from "react";

export const ChoiceFeedback = ({isChoiceCorrect}) => (
  <section className="choice">
    <p>
      {isChoiceCorrect ? 'CORRECT! 🎉' : 'Incorrect... 😨'}
    </p>

    <p>
      <strong>But what about this one?</strong>
    </p>
  </section>
);
