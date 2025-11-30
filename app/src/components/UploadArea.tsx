import React, { useState } from 'react';
import axios from 'axios';

type Props = { onExtract: (text: string) => void };

export default function UploadArea({ onExtract }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');

  const submit = async () => {
    const form = new FormData();
    if (file) form.append('file', file);
    else form.append('text', text);
    try {
      const resp = await axios.post('http://localhost:5000/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000
      });
      onExtract(resp.data.text || '');
    } catch (err) {
      console.error(err);
      alert('Upload failed. See console.');
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 12 }}>
      <div>
        <textarea
          placeholder="Paste text here (or upload a PDF/DOCX)"
          rows={6}
          style={{ width: '100%' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={submit}>Upload / Use Text</button>
      </div>
    </div>
  );
}
