import { formatTime } from "./engine";
import React from "react";

export const EndFeedbackWithStats = ({ stats, historicalStats }) => (
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
                  {formatTime(stats.fasterHit?.time)}{" "}
                  {stats.fasterHit.isRecord ? (
                    <strong> RECORD!</strong>
                  ) : (
                    <span>
                      (Last record: {stats.fasterHit?.lastRecord?.time || "???"}{" "}
                      at {String(new Date(stats.fasterHit?.lastRecord?.start))})
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Slower hit</strong>
                </td>
                <td>
                  {formatTime(stats.slowerHit?.time)}{" "}
                  {stats.slowerHit.isRecord ? (
                    <strong> RECORD!</strong>
                  ) : (
                    <span>
                      (Last record: {stats.slowerHit?.lastRecord?.time || "???"}{" "}
                      at {String(new Date(stats.slowerHit?.lastRecord?.start))})
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Avg time to hit</strong>
                </td>
                <td>
                  {formatTime(stats.avgHit?.time)}{" "}
                  {stats.avgHit.isRecord ? (
                    <strong> RECORD!</strong>
                  ) : (
                    <span>
                      (Last record: {stats.avgHit?.lastRecord?.time || "???"} at{" "}
                      {String(new Date(stats.avgHit?.lastRecord?.start))})
                    </span>
                  )}
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
