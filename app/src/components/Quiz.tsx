import React, { useEffect, useState } from 'react';

type Props = { quizBlocks: string[]; onFinish: (wrongItems: string[]) => void };

type Question = { q: string; opts: string[]; correct: string };

export default function Quiz({ quizBlocks, onFinish }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState<number>(Number(localStorage.getItem('streak') || 0));
  const [wrongItems, setWrongItems] = useState<string[]>([]);

  useEffect(() => {
    // naive parser for quiz blocks
    const parsed = quizBlocks.map((block) => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      // q: first non-empty line
      const q = lines[0] || '';
      // options: find lines starting with A) B) C) D)
      const opts = lines.filter(l => /^[A-D]\)/i.test(l)).map(l => l.replace(/^[A-D]\)\s*/i, ''));
      // correct: line containing "Answer:" or "Answer"
      let correct = 'A';
      const ansLine = lines.find(l => /Answer:/i.test(l) || /^Answer/i.test(l));
      if (ansLine) {
        const m = ansLine.match(/[A-D]/i);
        if (m) correct = m[0].toUpperCase();
      } else {
        // fallback: if options exist, default to A
        correct = 'A';
      }
      return { q, opts: opts.length ? opts : ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct };
    });
    setQuestions(parsed);
    setIndex(0);
  }, [quizBlocks]);

  if (!questions || questions.length === 0) return null;
  const current = questions[index];

  function answer(choiceLabel: string) {
    if (choiceLabel === current.correct) {
      const ns = streak + 1;
      setStreak(ns);
      localStorage.setItem('streak', String(ns));
    } else {
      setStreak(0);
      localStorage.setItem('streak', '0');
      setWrongItems(prev => [...prev, current.q]);
    }
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      onFinish(wrongItems);
    }
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Quiz</h3>
      <div>Streak: {streak}</div>
      <div style={{ border: '1px solid #eee', padding: 12, marginTop: 8 }}>
        <div style={{ fontWeight: 600 }}>{current.q}</div>
        <div style={{ marginTop: 8 }}>
          {current.opts.map((o, idx) => {
            const label = String.fromCharCode(65 + idx);
            return (
              <div key={idx} style={{ marginBottom: 6 }}>
                <button onClick={() => answer(label)}>{label}) {o}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
