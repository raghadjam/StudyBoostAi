import React from 'react';

type Props = { plan: string };

export default function StudyPlan({ plan }: Props) {
  if (!plan) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <h3>Personalized Study Plan</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{plan}</pre>
    </div>
  );
}
