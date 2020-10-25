import { formatTime } from '../lib/game';
import React from 'react';

export const EndFeedbackWithStats = ({ stats }) => (
  <section className="end">
    <div className="stats">
      {stats.totalQuestions > 0 && (
        <>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Total questions</strong>
                </td>
                <td>{stats.totalQuestions}</td>
              </tr>
              <tr>
                <td>
                  <strong>Correct</strong>
                </td>
                <td>{stats.totalCorrect}</td>
              </tr>
              <tr>
                <td>
                  <strong>Incorrect</strong>
                </td>
                <td>{stats.totalIncorrect}</td>
              </tr>
              <tr>
                <td>
                  <strong>Faster hit</strong>
                </td>
                <td>
                  <StatWithRecord stat={stats.fasterHit} />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Slower hit</strong>
                </td>
                <td>
                  <StatWithRecord stat={stats.slowerHit} />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Avg time to hit</strong>
                </td>
                <td>
                  <StatWithRecord stat={stats.avgHit} />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Total elapsed time</strong>
                </td>
                <td>{formatTime(stats.totalTime)}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  </section>
);

function StatWithRecord(props) {
  const { stat } = props;

  return (
    <>
      {formatTime(stat?.time)}{' '}
      {stat?.isRecord ? (
        <strong> RECORD!</strong>
      ) : (
        <span>
          {stat?.lastRecord?.time && (
            <>
              {' '}
              - Last record: <strong>{formatTime(stat?.lastRecord?.time)}</strong>
            </>
          )}
          {stat?.lastRecord?.start && ' at ' + new Intl.DateTimeFormat('en-US').format(new Date(stat?.lastRecord?.start))}
        </span>
      )}
    </>
  );
}
