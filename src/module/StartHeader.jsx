import React from 'react';
import { SCALES } from '../lib/music';

export const StartHeader = ({ start, options, setOptions }) => {
  function render() {
    return (
      <section className="start">
        {/* eslint-disable-next-line */}
        <header>Ear Trainer 🎼</header>

        <select onChange={setScale}>
          <option>Choose a scale</option>
          {Object.keys(SCALES).map(key => (
            <option key={key} value={key}>{`Scale: ${key}`}</option>
          ))}
        </select>

        <button onClick={start}>Press to START!</button>
      </section>
    );
  }

  function setScale(element) {
    setOptions({
      ...options,
      scale: element.target.value,
    });
  }

  return render();
};
