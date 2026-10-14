import React from 'react';
import '../styles/theme.css';

// --- Types ---
interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
  color: string;
}

// --- Components ---
const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendUp, icon, color }) => (
  <div className="glass-panel" style={{
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      fontSize: '4rem',
      opacity: 0.1,
      color: color,
      fontWeight: 'bold'
    }}>
      {icon}
    </div>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{title}</div>
    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{value}</div>
    <div style={{
      fontSize: '0.85rem',
      color: trendUp ? 'var(--neon-green)' : '#ff4d4d',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      {trendUp ? '↑' : '↓'} {trend}
      <span style={{ color: 'var(--text-secondary)', marginLeft: '5px' }}>this month</span>
    </div>
  </div>
);

const AgentPerformance: React.FC = () => {
  const agents = [
    { name: 'Course Architect', score: 98, status: 'Optimal', color: 'var(--neon-cyan)' },
    { name: 'Research Agent', score: 92, status: 'Active', color: 'var(--neon-purple)' },
    { name: 'Tutor Agent', score: 85, status: 'Teaching', color: 'var(--neon-green)' },
    { name: 'Examiner Agent', score: 88, status: 'Evaluating', color: 'var(--neon-gold)' },
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="neon-text-cyan" style={{ margin: 0 }}>Tutor Agent Performance</h3>
        <button style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '0.7rem', padding: '4px 8px' }}>All Devices {'>'}</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {agents.map(agent => (
          <div key={agent.name} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.03)',
            transition: 'background 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: agent.color, boxShadow: `0 0 8px ${agent.color}` }} />
            <div style={{ flexGrow: 1, fontSize: '0.9rem', fontWeight: '500' }}>{agent.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{agent.status}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white' }}>{agent.score}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container" style={{
      padding: '40px',
      backgroundColor: 'var(--bg-deep-space)',
      minHeight: '100vh',
      color: 'var(--text-primary)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header Section (Image 2/3 inspired) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '40px'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>Nexus <span className="neon-text-cyan">Dashboard</span></h1>
          <p style={{ color: 'var(--text-secondary)', margin: '5px 0 0 0' }}>Welcome back, Student. Your learning velocity is increasing.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="glass-panel" style={{ padding: '10px 20px', fontSize: '0.8rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-secondary)' }}>Current Streak</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--neon-green)' }}>12 Days</div>
          </div>
          <div className="glass-panel" style={{ padding: '10px 20px', fontSize: '0.8rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-secondary)' }}>Total Mastery</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--neon-cyan)' }}>64%</div>
          </div>
        </div>
      </div>

      {/* Top Metrics Row (Image 2 inspired) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <KPICard title="Learning Velocity" value="4.2 hrs/day" trend="12%" trendUp={true} icon="⚡" color="var(--neon-cyan)" />
        <KPICard title="Concept Mastery" value="18 / 42" trend="4%" trendUp={true} icon="🎯" color="var(--neon-green)" />
        <KPICard title="Quiz Accuracy" value="84.2%" trend="2.1%" trendUp={false} icon="📝" color="var(--neon-purple)" />
        <KPICard title="Resource Depth" value="124 Files" trend="15%" trendUp={true} icon="📚" color="var(--neon-gold)" />
      </div>

      {/* Bottom Section - Split Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px'
      }}>
        {/* Mastery Visualization (Place holder for the Nexus Shift) */}
        <div className="glass-panel" style={{
          padding: '24px',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="neon-text-cyan" style={{ margin: 0 }}>Knowledge Nexus Preview</h3>
            <button
              className="neon-border-cyan"
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid var(--neon-cyan)',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px var(--neon-cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              onClick={() => alert('Executing Nexus Shift to Full Map...')}
            >
              Enter Nexus →
            </button>
          </div>
          <div style={{
            flexGrow: 1,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '16px',
            border: '1px dashed var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* A simplified representation of the Hex Grid for the dashboard */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 50px)',
              gap: '10px',
              opacity: 0.6
            }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} style={{
                  width: '50px',
                  height: '50px',
                  background: i % 3 === 0 ? 'var(--neon-cyan)' : 'var(--bg-surface)',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  transition: 'all 0.5s ease'
                }} />
              ))}
            </div>
            <div style={{
              position: 'absolute',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Nexus Map active</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Interactive synchronization enabled</div>
            </div>
          </div>
        </div>

        {/* Agent Performance List (Image 2 inspired) */}
        <AgentPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
