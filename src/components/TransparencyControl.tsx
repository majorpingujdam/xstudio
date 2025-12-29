import { useState, useEffect } from 'react';

interface TransparencyControlProps {
  onTransparencyChange: (value: number) => void;
}

export const TransparencyControl = ({ onTransparencyChange }: TransparencyControlProps) => {
  const [transparency, setTransparency] = useState(() => {
    const saved = localStorage.getItem('terminal-transparency');
    return saved ? parseFloat(saved) : 0.85;
  });

  useEffect(() => {
    onTransparencyChange(transparency);
    localStorage.setItem('terminal-transparency', transparency.toString());
  }, [transparency, onTransparencyChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTransparency(value);
  };

  return (
    <div className="transparency-control">
      <label className="transparency-label">
        <span className="transparency-icon">👁️</span>
        <span className="transparency-text">Panel Transparency</span>
        <span className="transparency-value">{Math.round((1 - transparency) * 100)}%</span>
      </label>
      <input
        type="range"
        min="0.3"
        max="0.95"
        step="0.05"
        value={transparency}
        onChange={handleChange}
        className="transparency-slider"
      />
      <div className="transparency-buttons">
        <button
          className="transparency-btn"
          onClick={() => setTransparency(0.3)}
          title="Most Transparent"
        >
          Clear
        </button>
        <button
          className="transparency-btn"
          onClick={() => setTransparency(0.6)}
          title="Medium"
        >
          Medium
        </button>
        <button
          className="transparency-btn"
          onClick={() => setTransparency(0.85)}
          title="Default"
        >
          Default
        </button>
        <button
          className="transparency-btn"
          onClick={() => setTransparency(0.95)}
          title="Most Opaque"
        >
          Opaque
        </button>
      </div>
    </div>
  );
};








