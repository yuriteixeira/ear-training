/*
 * References:
 * - https://medium.com/swinginc/playing-with-midi-in-javascript-b6999f2913c3
 * - https://calculla.com/calculators/table/note_frequencies
 */

import { getIntervalNote, getTransposedNote, SCALES } from './music';
import { playNote } from './synth';

export function getGameProps(game) {
  const hasGameStarted = !!game.start;
  const hasGameEnded = !!game.end;

  const questions = game.questions;
  const question = questions && questions.length > 0 ? questions[0] : undefined;
  const choice = question?.choice;
  const hasMadeChoice = choice !== undefined;
  const isChoiceCorrect = choice && question && choice === question?.interval?.index;
  const chosenInterval = game.scale && choice && game.scale[choice];
  const correctInterval = game.scale && game.scale[question?.interval?.index];

  return {
    hasGameStarted,
    hasGameEnded,
    questions,
    question,
    hasMadeChoice,
    isChoiceCorrect,
    correctInterval,
    chosenInterval,
  };
}

export async function addQuestion(game, setGameState) {
  const newQuestion = createIntervalQuestion(game.scale);
  game.questions.unshift(newQuestion);
  setGameState({ ...game });

  await playIntervalQuestion(game.questions[0]);

  game.questions[0].hasPlayed = true;
  game.questions[0].start = Date.now();
  setGameState({ ...game });
}

export function createIntervalQuestion(scale = SCALES.MAJOR) {
  const createTonic = () => {
    const direction = !!randomNumber(1) ? 1 : -1;
    const octave = randomNumber(2) * direction;
    const noteNumber = randomNumber(11); // 12 possible notes

    const note = getTransposedNote(noteNumber, octave);

    return { note };
  };

  const createInterval = tonic => {
    const direction = !!randomNumber(1) ? 1 : -1;
    const octave = randomNumber(1) * direction;
    const indexBeforeAdjustments = randomNumber(scale.length - 1);
    const noteWithoutTranspose = getIntervalNote(indexBeforeAdjustments, tonic.note, scale);

    const note = getTransposedNote(noteWithoutTranspose, octave);
    const index = getFrequencyAndPitchAdjustedIntervalNumber(tonic, note, indexBeforeAdjustments, scale);

    return { note, index };
  };

  const tonic = createTonic();
  const interval = createInterval(tonic);

  return { tonic, interval };
}

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}

function getFrequencyAndPitchAdjustedIntervalNumber(tonic, note, intervalIndex, scale) {
  const haveNotesSameFrequency = note === tonic.note;

  if (haveNotesSameFrequency) {
    return 0;
  }

  const haveNotesDifferentPitch = (note - tonic.note) % 12 !== 0;

  if (haveNotesDifferentPitch) {
    return intervalIndex;
  }

  // Different frequencies but same pitch: Measure distance
  const noteDistance = note - tonic.note;

  // Octave forward
  if (noteDistance > 0) return scale.length - 1;

  // Octave backwards or same
  return 0;
}

export async function playIntervalQuestion(intervalQuestion, timePerNote = 750) {
  const { tonic, interval } = intervalQuestion;
  await playNote(tonic.note, timePerNote);
  await playNote(interval.note, timePerNote);
}

// TODO: Tests on all new functions below

export function collectStats(game) {
  const defaults = {
    totalQuestions: 0,
    totalIncorrect: 0,
    totalCorrect: 0,
    sumTimeToHit: 0,
    slowerHit: {},
    fasterHit: {},
    avgHit: {},
    date: game.start,
    totalTime: game.end - game.start,
  };

  if (game.questions.length < 1) return defaults;

  // We need to revert the array before collecting stats (we
  // stacked items on top, so we could easily access the last
  // inserted question through index 0)
  const questions = game.questions.reverse();

  const savedStats = JSON.parse(localStorage.getItem('stats')) || [];

  const recordStats = aggregateRecords(savedStats);

  const gameStats = questions.reduce((acc, question) => {
    acc.totalQuestions++;

    if (question.choice !== question.interval.index) {
      acc.totalIncorrect++;
      return acc;
    }

    acc.totalCorrect++;

    const time = question.end - question.start;
    acc.sumTimeToHit = acc.sumTimeToHit + time;

    const fasterHit = acc.fasterHit && acc.fasterHit.end - acc.fasterHit.start;
    const slowerHit = acc.slowerHit && acc.slowerHit.end - acc.slowerHit.start;

    if (!fasterHit || time < fasterHit) acc.fasterHit = { ...question, time };
    if (!slowerHit || time > slowerHit) acc.slowerHit = { ...question, time };

    return acc;
  }, defaults);

  gameStats.avgHit = {
    time: gameStats.totalCorrect && gameStats.sumTimeToHit / gameStats.totalCorrect,
    start: game.start,
  };

  localStorage.setItem('stats', JSON.stringify([...savedStats, gameStats]));

  decorateStatsWithRecords(gameStats, recordStats);

  return gameStats;
}

function aggregateRecords(stats) {
  return stats.reduce((acc, stat) => {
    if (!acc.avgHit || stat.avgHit?.time < acc.avgHit?.time) acc.avgHit = stat.avgHit;
    if (!acc.fasterHit || stat.fasterHit?.time < acc.fasterHit?.time) acc.fasterHit = stat.fasterHit;
    if (!acc.slowerHit || stat.slowerHit?.time > acc.slowerHit?.time) acc.slowerHit = stat.slowerHit;
    return acc;
  }, {});
}

function decorateStatsWithRecords(gameStats, historicalStats) {
  gameStats.avgHit.isRecord = gameStats.avgHit?.time < historicalStats.avgHit?.time;
  gameStats.avgHit.lastRecord = historicalStats.avgHit;

  gameStats.fasterHit.isRecord = gameStats.fasterHit?.time < historicalStats.fasterHit?.time;
  gameStats.fasterHit.lastRecord = historicalStats.fasterHit;

  gameStats.slowerHit.isRecord = gameStats.slowerHit?.time > historicalStats.slowerHit?.time;
  gameStats.slowerHit.lastRecord = historicalStats.slowerHit;
}

export function formatTime(ms) {
  if (!ms) return '???';
  const seconds = (ms / 1000).toFixed(2);
  return `${seconds}s`;
}
