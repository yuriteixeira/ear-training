import React, { useState } from 'react';
import './App.css';
import { addQuestion, collectStats, getGameProps, initEngine } from './engine.js';
import { StartHeader } from './StartHeader';
import { QuestionsForm } from './QuestionsForm';
import { ChoiceFeedback } from './ChoiceFeedback';
import { EndFeedbackWithStats } from './EndFeedbackWithStats';

let nextQuestionTimeout;

function App() {
  const [game, setGameState] = useState({});
  const [stats, setStatsState] = useState({});
  const gameProps = getGameProps(game);

  const { hasGameStarted, hasGameEnded, question, hasMadeChoice, isChoiceCorrect } = gameProps;

  function render() {
    return (
      <div className="app">
        {!hasGameStarted && <StartHeader {...{ start }} />}

        {hasGameStarted && !hasMadeChoice && <QuestionsForm {...{ answer, question, nextQuestion, end }} />}

        {hasGameStarted && hasMadeChoice && <ChoiceFeedback {...{ isChoiceCorrect, question, nextQuestion, end }} />}

        {hasGameEnded && <EndFeedbackWithStats {...{ stats }} />}
      </div>
    );
  }

  function resetGame() {
    return {
      start: Date.now(),
      questions: [],
      end: undefined,
    };
  }

  async function start() {
    const newGame = resetGame();
    await addQuestion(newGame, setGameState);
  }

  async function nextQuestion() {
    clearTimeout(nextQuestionTimeout);
    await addQuestion(game, setGameState);
  }

  function answer(element) {
    game.questions[0].choice = Number(element.target.value);
    game.questions[0].end = Date.now();
    setGameState({ ...game });

    nextQuestionTimeout = setTimeout(nextQuestion, 3000);
  }

  function end(isDuringQuestion = true) {
    clearTimeout(nextQuestionTimeout);

    if (isDuringQuestion) {
      game.questions.shift();
    }

    game.end = Date.now();
    const stats = collectStats(game);
    setStatsState(stats);

    game.start = undefined;
    setGameState({ ...game });
  }

  return render();
}

export default App;
