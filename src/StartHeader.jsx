import React from 'react';

export const StartHeader = ({ start }) => (
  <section className="start">
    {/* eslint-disable-next-line */}
    <header>Ear Trainer 🎼</header>
    <button onClick={start}>Press to START!</button>
  </section>
);
