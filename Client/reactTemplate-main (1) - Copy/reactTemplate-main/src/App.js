import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import Scoreboard from './Notification';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/game')
      .then(response => {
        setCards(response.data.cards);
        setMoves(response.data.moves);
        setWin(response.data.win);
        setLose(response.data.lose);
      })
      .catch(error => console.error('Error fetching game data:', error));
  }, []);

  const handleCardClick = (index) => {
    axios.post('http://localhost:3000/api/reveal', { index })
      .then(response => {
        setCards(response.data.cards);
        setMoves(response.data.moves);
        setWin(response.data.win);
        setLose(response.data.lose);
      })
      .catch(error => console.error('Error revealing card:', error));
  };

  const handleReset = () => {
    axios.post('http://localhost:3000/api/reset')
      .then(response => {
        setCards(response.data.cards);
        setMoves(response.data.moves);
        setWin(false);
        setLose(false);
      })
      .catch(error => console.error('Error resetting game:', error));
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <div className="App">
      <h1>Match the Cards</h1>
      {!lose && (
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={handleNameChange}
        />
      )}
      <Scoreboard moves={moves} win={win} lose={lose} playerName={playerName} />
      {win ? (
        <div>
          <p>Congratulations {playerName}! You won!</p>
          <button onClick={handleReset}>Play Again</button>
        </div>
      ) : lose ? (
        <div>
          <p className="message">Sorry {playerName}, you lost. Better luck next time!</p>
          <button onClick={handleReset}>Play Again</button>
        </div>
      ) : (
        <Board cards={cards} onCardClick={handleCardClick} />
      )}
    </div>
  );
};

export default App;
