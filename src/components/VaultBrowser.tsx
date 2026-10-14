import React, { useState } from 'react';
import '../styles/theme.css';

// --- Types ---
interface VaultFile {
  id: string;
  name: string;
  type: 'folder' | 'file';
  category: 'Materials' | 'Research' | 'Lessons' | 'Assessments';
  size?: string;
  updatedAt: string;
  content?: string;
}

// --- Mock Data ---
const MOCK_VAULT: VaultFile[] = [
  { id: 'f1', name: 'CourseMap.md', type: 'file', category: 'Materials', updatedAt: '2026-10-14', size: '12KB' },
  { id: 'f2', name: 'Progress.md', type: 'file', category: 'Materials', updatedAt: '2026-10-13', size: '4KB' },
  { id: 'f3', name: 'Async_JS_DeepDive.md', type: 'file', category: 'Research', updatedAt: '2026-10-14', size: '45KB' },
  { id: 'f4', name: 'Event_Loop_Explained.md', type: 'file', category: 'Research', updatedAt: '2026-10-12', size: '32KB' },
  { id: 'f5', name: 'Lesson_1_Intro.md', type: 'file', category: 'Lessons', updatedAt: '2026-10-10', size: '18KB' },
  { id: 'f6', name: 'Lesson_2_Async.md', type: 'file', category: 'Lessons', updatedAt: '2026-10-14', size: '22KB' },
  { id: 'f7', name: 'Quiz_1_Basics.md', type: 'file', category: 'Assessments', updatedAt: '2026-10-11', size: '8KB' },
  { id: 'f8', name: 'Quiz_2_Async.md', type: 'file', category: 'Assessments', updatedAt: '2026-10-14', size: '10KB' },
];

const VaultBrowser: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedFile, setSelectedFile] = useState<VaultFile | null>(null);

  const categories = ['All', 'Materials', 'Research', 'Lessons', 'Assessments'];
  const filteredFiles = filter === 'All'
    ? MOCK_VAULT
    : MOCK_VAULT.filter(f => f.category === filter);

  return (
    <div className="nexus-vault-container" style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: 'var(--bg-deep-space)',
      color: 'var(--text-primary)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Left Sidebar - Archive/Filter (Image 4 inspired) */}
      <div className="vault-sidebar" style={{
        width: '260px',
        borderRight: '1px solid var(--glass-border)',
        padding: '30px 20px',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        <div>
          <h2 className="neon-text-cyan" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Vault Archive</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map(cat => (
              <div
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  backgroundColor: filter === cat ? 'rgba(0, 242, 255, 0.1)' : 'transparent',
                  color: filter === cat ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  borderLeft: filter === cat ? '3px solid var(--neon-cyan)' : '3px solid transparent'
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Vault Stats</div>
          <div>Total Files: {MOCK_VAULT.length}</div>
          <div>Last Sync: 2 mins ago</div>
          <div style={{ marginTop: '15px', color: 'var(--neon-green)', cursor: 'pointer' }}>Sync with Obsidian ⚡</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="vault-main" style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Course <span className="neon-text-cyan">Repository</span></h1>
          <div className="glass-panel" style={{ padding: '10px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Viewing: <span className="neon-text-cyan" style={{ fontWeight: 'bold' }}>{filter}</span>
          </div}
        </div>

        {/* Document Grid (Image 4 inspired) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
          alignContent: 'start'
        }}>
          {filteredFiles.map(file => (
            <div
              key={file.id}
              onClick={() => setSelectedFile(file)}
              className="glass-panel"
              style={{
                padding: '20px',
                cursor: 'pointer',
                textAlign: 'center',
                border: selectedFile?.id === file.id ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                backgroundColor: selectedFile?.id === file.id ? 'rgba(0, 242, 255, 0.05)' : 'transparent'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px',
                color: file.category === 'Research' ? 'var(--neon-purple)' :
                        file.category === 'Lessons' ? 'var(--neon-green)' : 'var(--neon-cyan)'
              }}>
                📄
              </div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {file.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                {file.size} • {file.updatedAt}
              </div>
            </div>
          ))}
        </div>

        {/* File Preview Pane */}
        {selectedFile && (
          <div className="glass-panel" style={{
            marginTop: '40px',
            padding: '30px',
            minHeight: '300px',
            borderTop: '4px solid var(--neon-cyan)',
            animation: 'fadeIn 0.4s ease-out'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="neon-text-cyan" style={{ margin: 0 }}>{selectedFile.name}</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="glass-panel" style={{ padding: '5px 15px', cursor: 'pointer', fontSize: '0.8rem', background: 'transparent', color: 'white' }}>Edit</button>
                <button className="glass-panel" style={{ padding: '5px 15px', cursor: 'pointer', fontSize: '0.8rem', background: 'transparent', color: 'white', borderColor: 'rgba(255,0,0,0.3)' }}>Delete</button>
              </div>
            </div>
            <div style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontSize: '0.95rem',
              whiteSpace: 'pre-wrap'
            }}>
              {`[Obsidian Content Preview]\n\nThis is a preview of the ${selectedFile.category} file: ${selectedFile.name}.\n\nIn the full app, this would render the markdown content from your Obsidian vault, including WikiLinks, callouts, and LaTeX formulas.`}
            </div}
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultBrowser;
