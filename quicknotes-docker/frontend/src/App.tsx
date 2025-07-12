import React, { useEffect, useState } from 'react';

type Note = {
  _id?: string;
  content: string;
};

const API_URL = import.meta.env.VITE_API_URL; // Update this if backend is hosted elsewhere

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState('');

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  // Add a new note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const newNote = await res.json();
      setNotes(prev => [...prev, newNote]);
      setContent('');
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Quick Notes 📝</h1>

      <form onSubmit={handleAddNote}>
        <input
          type="text"
          placeholder="Enter note content"
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ padding: 8, width: '100%' }}
        />
        <button type="submit" style={{ marginTop: 10, padding: 8 }}>
          Add Note
        </button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {notes.map(note => (
          <li key={note._id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
