import React, { useState } from "react";
import "./App.css";
import {
  addQuestion,
  collectStats,
  getGameProps,
  initEngine,
} from "./engine.js";
import { StartHeader } from "./StartHeader";
import { QuestionsForm } from "./QuestionsForm";
import { ChoiceFeedback } from "./ChoiceFeedback";
import { EndFeedbackWithStats } from "./EndFeedbackWithStats";

let nextQuestionTimeout;

function App() {
  const [game, setGameState] = useState({});
  const [stats, setStatsState] = useState({});
  const gameProps = getGameProps(game);

  const {
    hasGameStarted,
    hasGameEnded,
    question,
    hasMadeChoice,
    isChoiceCorrect,
  } = gameProps;

  function render() {
    return (
      <div className="app">
        {!hasGameStarted && <StartHeader {...{ start }} />}

        {hasGameStarted && !hasMadeChoice && (
          <QuestionsForm {...{ answer, question, nextQuestion, end }} />
        )}

        {hasGameStarted && hasMadeChoice && (
          <ChoiceFeedback {...{ isChoiceCorrect, question, end }} />
        )}

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
    initEngine();
    const newGame = resetGame();
    await addQuestion(newGame, setGameState);

    console.debug("START");
  }

  async function nextQuestion() {
    await addQuestion(game, setGameState);
    console.debug("SKIP QUESTION");
  }

  function answer(element) {
    game.questions[0].choice = Number(element.target.value);
    game.questions[0].end = Date.now();
    setGameState({ ...game });

    nextQuestionTimeout = setTimeout(nextQuestion, 3000);

    console.debug("ANSWER");
  }

  function end(isDuringQuestion = true) {
    game.end = Date.now();

    if (isDuringQuestion) {
      game.questions.shift();
    } else {
      clearTimeout(nextQuestionTimeout);
    }

    const stats = collectStats(game);
    setStatsState(stats);

    game.start = undefined;
    setGameState({ ...game });

    console.debug("END");
  }

  return render();
}

export default App;
