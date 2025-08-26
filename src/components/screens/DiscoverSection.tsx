import React, { useState } from 'react';

type TabKey = 'industry' | 'sources';

export function DiscoverSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('industry');

  const newsItems = [
    { id: 'n1', title: 'Competitor launches X', summary: 'A major competitor introduced a new analytics module targeting SMBs.' },
    { id: 'n2', title: 'Market trend Y', summary: 'Shift toward AI-assisted forecasting across retail and fintech verticals.' },
    { id: 'n3', title: 'Funding update in sector', summary: 'Series B rounds accelerate for data tooling platforms in Q3.' }
  ];

  const connectors = [
    { id: 'c1', name: 'Salesforce Connect', logoText: 'SF', connected: false },
    { id: 'c2', name: 'NetSuite Connect', logoText: 'NS', connected: false },
    { id: 'c3', name: 'S3 Connect', logoText: 'S3', connected: false },
    { id: 'c4', name: 'Snowflake Connect', logoText: 'SN', connected: false }
  ];

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1120px',
      margin: '0 auto',
      padding: '32px 24px'
    },
    heading: {
      fontSize: '42px',
      fontWeight: 700 as const,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      marginBottom: '24px'
    },
    tabsWrap: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '20px'
    },
    tab: (isActive: boolean) => ({
      padding: '10px 16px',
      borderRadius: '999px',
      border: isActive ? '1px solid rgba(108,99,255,0.28)' : '1px solid rgba(16,17,20,0.12)',
      background: isActive ? 'rgba(108,99,255,0.10)' : 'transparent',
      color: isActive ? 'var(--text-strong)' : 'var(--text-body)',
      fontWeight: isActive ? 600 : 500,
      cursor: 'pointer',
      transition: 'all 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }),
    accentSection: {
      background: 'rgba(108, 99, 255, 0.06)',
      border: '1px solid rgba(108, 99, 255, 0.12)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 6px 20px rgba(10,16,30,0.06)'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '16px'
    },
    card: {
      background: 'rgba(255,255,255,0.72)',
      border: '1px solid rgba(16,17,20,0.12)',
      borderRadius: '14px',
      padding: '16px',
      boxShadow: '0 4px 14px rgba(10,16,30,0.06)',
      transition: 'transform 160ms ease, box-shadow 160ms ease',
      cursor: 'pointer',
      position: 'relative' as const
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: 600 as const,
      color: 'var(--text-strong)',
      marginBottom: '6px'
    },
    cardSummary: {
      fontSize: '14px',
      color: 'var(--text-body)'
    },
    cardActions: {
      position: 'absolute' as const,
      top: '10px',
      right: '12px',
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    actionLink: {
      fontSize: '12px',
      color: 'var(--text-muted)',
      background: 'rgba(255,255,255,0.6)',
      border: '1px solid rgba(16,17,20,0.12)',
      borderRadius: '999px',
      padding: '4px 8px',
      cursor: 'pointer'
    },
    tilesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '16px'
    },
    tile: {
      background: 'rgba(255,255,255,0.72)',
      border: '1px solid rgba(16,17,20,0.12)',
      borderRadius: '14px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 4px 14px rgba(10,16,30,0.06)',
      transition: 'transform 160ms ease, box-shadow 160ms ease',
      cursor: 'pointer'
    },
    logo: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, rgba(108,99,255,0.16) 0%, rgba(106,102,255,0.10) 100%)',
      border: '1px solid rgba(108,99,255,0.22)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
      fontWeight: 600 as const,
      color: 'var(--text-strong)'
    },
    tileName: {
      fontSize: '14px',
      fontWeight: 600 as const,
      color: 'var(--text-strong)',
      flex: 1
    },
    connectBtn: (connected: boolean) => ({
      padding: '8px 12px',
      borderRadius: '999px',
      border: connected ? '1px solid rgba(16,17,20,0.16)' : '1px solid rgba(108,99,255,0.28)',
      background: connected ? 'rgba(16,17,20,0.04)' : 'rgba(108,99,255,0.10)',
      color: connected ? 'var(--text-body)' : 'var(--text-strong)',
      fontSize: '13px',
      fontWeight: 600,
      cursor: connected ? 'default' : 'pointer'
    }),
    connectorsNote: {
      marginTop: '10px',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  } as const;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Discover</h1>

      <div style={styles.tabsWrap}>
        <button
          style={styles.tab(activeTab === 'industry')}
          onClick={() => setActiveTab('industry')}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(108,99,255,0.16)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'none';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          Industry News
        </button>
        <button
          style={styles.tab(activeTab === 'sources')}
          onClick={() => setActiveTab('sources')}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(108,99,255,0.16)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'none';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          Data Sources
        </button>
      </div>

      <div style={styles.accentSection}>
        {activeTab === 'industry' && (
          <div>
            <div style={styles.cardsGrid as React.CSSProperties} className="discover-cards-grid">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  style={styles.card}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px) scale(1.01)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 24px rgba(10,16,30,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'none';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 14px rgba(10,16,30,0.06)';
                  }}
                >
                  <div style={styles.cardActions}>
                    <span style={styles.actionLink}>Mute ▾</span>
                    <span style={styles.actionLink}>Why this?</span>
                  </div>
                  <div style={styles.cardTitle}>{item.title}</div>
                  <div style={styles.cardSummary}>{item.summary}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div>
            <div style={styles.tilesGrid as React.CSSProperties} className="discover-tiles-grid">
              {connectors.map((con) => (
                <div
                  key={con.id}
                  style={styles.tile}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px) scale(1.01)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 24px rgba(10,16,30,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'none';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 14px rgba(10,16,30,0.06)';
                  }}
                >
                  <div style={styles.logo}>{con.logoText}</div>
                  <div style={styles.tileName}>{con.name}</div>
                  <button style={styles.connectBtn(con.connected)}>
                    {con.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
            <div style={styles.connectorsNote}>Only connectors you are allowed to add are shown.</div>
          </div>
        )}
      </div>

      <style>
        {`
          @media (max-width: 1024px) {
            .discover-cards-grid, .discover-tiles-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .discover-cards-grid, .discover-tiles-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          }
        `}
      </style>
    </div>
  );
}

export default DiscoverSection;


