import React, { useState } from 'react';

type Props = { cards: string[] };

export default function Flashcards({ cards }: Props) {
  const [i, setI] = useState(0);
  if (!cards || cards.length === 0) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <h3>Flashcards</h3>
      <div style={{ border: '1px solid #eee', padding: 12 }}>
        <div>{cards[i]}</div>
        <div style={{ marginTop: 8 }}>
          <button onClick={() => setI((i + 1) % cards.length)}>Next</button>
          <button onClick={() => setI((i - 1 + cards.length) % cards.length)} style={{ marginLeft: 8 }}>
            Prev
          </button>
        </div>
      </div>
    </div>
  );
}
