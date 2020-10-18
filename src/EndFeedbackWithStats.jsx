import {formatTime} from "./engine";
import React from "react";

export const EndFeedbackWithStats = ({stats}) => (
  <section className="end">
    <header>THE END...</header>

    {stats.totalQuestions > 0 &&
      <>
        <br/><strong>Total questions: </strong>{stats.totalQuestions}
        <br/><strong>Correct: </strong>{stats.totalCorrect}
        <br/><strong>Incorrect: </strong>{stats.totalIncorrect}
        <br/><strong>Faster hit: </strong>{formatTime(stats.fasterHit?.timeToHit)}
        <br/><strong>Slower hit: </strong>{formatTime(stats.slowerHit?.timeToHit)}
        <br/><strong>Avg time to hit: </strong>{formatTime(stats.avgTimeToHit)}
        <br/><strong>Total elapsed time: </strong>{formatTime(stats.totalTime)}
      </>
    }
  </section>
);
