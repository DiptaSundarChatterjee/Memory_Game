import React from 'react';

const Card = ({ card, onClick }) => {
  const { value, revealed, matched } = card;

  return (
    <div
      className={`Card ${revealed || matched ? 'revealed' : ''}`}
      onClick={onClick}
    >
      {revealed || matched ? value : '?'}
    </div>
  );
};

export default Card;
