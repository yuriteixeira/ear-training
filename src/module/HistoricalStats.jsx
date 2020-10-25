import { formatTime } from '../lib/game';
import React from 'react';

export const HistoricalStats = ({ stats }) => (
  <section className="history">
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
            </tbody>
          </table>
        </>
      )}
    </div>
  </section>
);
