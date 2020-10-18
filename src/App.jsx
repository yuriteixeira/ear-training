import React, {useState} from 'react';
import './App.css';
import {
  addQuestion,
  collectStats,
  getGameProps,
  initEngine,
} from './engine.js'
import {StartHeader} from "./StartHeader";
import {QuestionsForm} from "./QuestionsForm";
import {ChoiceFeedback} from "./ChoiceFeedback";
import {EndFeedbackWithStats} from "./EndFeedbackWithStats";

function App() {
  const [game, setGameState] = useState({});
  const [stats, setStatsState] = useState({});
  const gameProps = getGameProps(game);

  console.debug({gameState: game, gameProps, stats});

  const {hasGameStarted, hasGameEnded, question, hasMadeChoice, isChoiceCorrect} = gameProps;

  function render() {
    return (
      <div className="app">
        {!hasGameStarted &&
          <StartHeader {...{start}} />
        }

        {hasGameStarted && !hasMadeChoice &&
          <QuestionsForm {...{answer, question, skipQuestion, end}} />
        }

        {hasGameStarted && hasMadeChoice &&
          <ChoiceFeedback {...{isChoiceCorrect}} />
        }

        {hasGameEnded &&
          <EndFeedbackWithStats {...{stats}} />
        }
      </div>
    );
  }

  function resetGame() {
    return {
      start: Date.now(),
      questions: [],
      end: undefined,
    }
  }

  async function start() {
    initEngine();
    const newGame = resetGame();
    await addQuestion(newGame, setGameState);

    console.debug('START');
  }

  async function skipQuestion() {
    await addQuestion(game, setGameState);
    console.debug('SKIP QUESTION');
  }

  function answer(element) {
    game.questions[0].choice = Number(element.target.value);
    game.questions[0].end = Date.now();
    setGameState({...game});

    setTimeout(skipQuestion, 2000);

    console.debug('ANSWER');
  }

  function end() {
    game.end = Date.now();
    const stats = collectStats(game);
    setStatsState(stats);

    game.start = undefined;
    setGameState({...game});

    console.debug('END');
  }

  return render();
}

export default App;
