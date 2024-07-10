import React from 'react';

const Scoreboard = ({ moves, win, lose, playerName }) => (
  <div className="Scoreboard">
    <p>Player: {playerName}</p>
    <p>Moves: {moves}</p>
  </div>
);

export default Scoreboard;
