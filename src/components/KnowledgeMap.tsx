import React, { useState, useMemo } from 'react';
import '../styles/theme.css';

// --- Types ---
interface Concept {
  id: string;
  label: string;
  mastery: number; // 0-100
  dependencies: string[];
}

// --- Constants ---
const HEX_SIZE = 45; // px
const GRID_COLS = 8;
const GRID_ROWS = 6;

// --- Hexagon Component ---
const Hexagon = ({ concept, onClick }: { concept: Concept; onClick: () => void }) => {
  // Determine color based on mastery (Deep Blue -> Cyan -> Neon Green)
  const getColor = (mastery: number) => {
    if (mastery === 0) return 'rgba(20, 26, 48, 0.5)';
    if (mastery < 40) return `rgba(0, 100, 255, ${mastery / 100})`;
    if (mastery < 80) return `rgba(0, 242, 255, ${mastery / 100})`;
    return `rgba(57, 255, 20, ${mastery / 100})`;
  };

  return (
    <div
      onClick={onClick}
      className="hexagon-wrapper"
      style={{
        position: 'relative',
        width: HEX_SIZE * 2,
        height: HEX_SIZE * 2,
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg viewBox="0 0 100 115" style={{ width: '100%', height: '100%' }}>
        <polygon
          points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25"
          fill={getColor(concept.mastery)}
          stroke={concept.mastery > 80 ? 'var(--neon-green)' : 'var(--glass-border)'}
          strokeWidth="2"
          style={{
            transition: 'fill 1s ease, stroke 1s ease',
            filter: concept.mastery > 80 ? 'drop-shadow(0 0 8px var(--neon-green))' : 'none'
          }}
        />
        <text
          x="50" y="60"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {concept.label}
        </text>
      </svg>
    </div>
  );
};

const KnowledgeMap: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  // Mock data: In real app, this comes from CourseMap.md
  const concepts: Concept[] = useMemo(() => [
    { id: '1', label: 'Basics', mastery: 100, dependencies: [] },
    { id: '2', label: 'Logic', mastery: 75, dependencies: ['1'] },
    { id: '3', label: 'Syntax', mastery: 60, dependencies: ['1'] },
    { id: '4', label: 'Loops', mastery: 30, dependencies: ['2'] },
    { id: '5', label: 'Functions', mastery: 20, dependencies: ['2', '3'] },
    { id: '6', label: 'Async', mastery: 5, dependencies: ['5'] },
    { id: '7', label: 'State', mastery: 0, dependencies: ['5'] },
    { id: '8', label: 'API', mastery: 0, dependencies: ['6'] },
  ], []);

  return (
    <div className="nexus-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      minHeight: '100vh'
    }}>
      <h1 className="neon-text-cyan" style={{ marginBottom: '40px', fontSize: '2.5rem' }}>
        Knowledge Nexus
      </h1>

      <div className="hex-grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_COLS}, ${HEX_SIZE * 1.5}px)`,
        gap: '10px',
        justifyContent: 'center'
      }}>
        {concepts.map((c, i) => (
          <div key={c.id} style={{
            marginTop: i % 2 === 0 ? 0 : HEX_SIZE,
            marginLeft: i % 2 === 0 ? 0 : HEX_SIZE / 2
          }}>
            <Hexagon concept={c} onClick={() => setSelectedConcept(c)} />
          </div>
        ))}
      </div>

      {selectedConcept && (
        <div className="glass-panel" style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          width: '300px',
          padding: '20px',
          animation: 'fadeIn 0.4s ease-out'
        }}>
          <h3 className="neon-text-cyan">{selectedConcept.label}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Mastery: {selectedConcept.mastery}%</p>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginTop: '10px'
          }}>
            <div style={{
              width: `${selectedConcept.mastery}%`,
              height: '100%',
              background: 'var(--neon-cyan)',
              transition: 'width 1s ease'
            }} />
          </div>
          <button
            className="neon-border-cyan"
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '10px',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
            onClick={() => alert(`Launching Tutor for ${selectedConcept.label}...`)}
          >
            Start Learning
          </button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeMap;
