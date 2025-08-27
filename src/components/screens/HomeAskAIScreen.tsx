import React, { useEffect, useRef, useState } from 'react';
import { AdaaptLogo } from '../AdaabtLogo';
import DiscoverSection from './DiscoverSection';
import AlertsSection from './AlertsSection';
import ProfileSettingsSection from './ProfileSettingsSection';
import DatasetManagementModal from '../modals/DatasetManagementModal';

interface HomeAskAIScreenProps {
  currentDataset: string;
  queryText: string;
  onQueryTextChange: (text: string) => void;
  onQuerySubmit: (query: string) => void;
  onComplete: () => void;
}

export function HomeAskAIScreen({ 
  currentDataset, 
  queryText, 
  onQueryTextChange, 
  onQuerySubmit, 
  onComplete 
}: HomeAskAIScreenProps) {
  const askInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState<'Ask AI' | 'Discover' | 'Insights' | 'Alerts' | 'Settings'>('Ask AI');
  const [isDatasetManagementModalOpen, setIsDatasetManagementModalOpen] = useState(false);

  // Local styles for enhanced components
  const localStyles = {
    // Enhanced heading
    enhancedHeading: {
      fontSize: '42px',
      fontWeight: '700',
      lineHeight: '1.1',
      color: 'var(--text-strong)',
      letterSpacing: '-0.03em',
      textShadow: '0 2px 8px rgba(52, 48, 190, 0.08)',
      marginBottom: '48px'
    },

    // Enhanced sidebar with violet-tinted background
    enhancedSidebar: {
      width: 'var(--nav-width)',
      background: '#F7F5FF', // Soft violet-tinted background
      borderRight: '1px solid rgba(108, 99, 255, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },

    // Enhanced Ask AI active state with violet gradient
    enhancedNavItemActive: {
      height: 'var(--nav-item-height)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '0 12px',
      margin: '0 12px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.16) 0%, rgba(90, 87, 214, 0.12) 100%)',
      color: 'var(--text-strong)',
      fontWeight: '600', // Bold text for emphasis
      boxShadow: '0 2px 8px rgba(108, 99, 255, 0.16), 0 1px 4px rgba(108, 99, 255, 0.08)', // Subtle shadow
      border: '1px solid rgba(108, 99, 255, 0.18)',
      cursor: 'pointer',
      transition: 'all 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative'
    },

    // Enhanced nav item hover state
    enhancedNavItem: {
      height: 'var(--nav-item-height)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '0 12px',
      margin: '0 12px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      color: 'var(--text-body)',
      fontWeight: '500',
      position: 'relative'
    },

    // Navigation section divider
    navDivider: {
      height: '1px',
      background: 'rgba(108, 99, 255, 0.12)',
      margin: '16px 16px',
      position: 'relative'
    },

    // Enhanced Ask AI container wrapper with violet-tinted background
    enhancedAskBarContainer: {
      position: 'relative',
      padding: '20px',
      background: 'rgba(108, 99, 255, 0.08)', // Violet-tinted background at 8% opacity
      borderRadius: '28px', // Small border-radius for elevation
      boxShadow: `
        0 8px 24px rgba(108, 99, 255, 0.12),
        0 4px 12px rgba(10, 16, 30, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `, // Elevated shadow with violet tint
      transition: 'all 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      backdropFilter: 'blur(20px) saturate(1.1)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.1)',
      border: '1px solid rgba(108, 99, 255, 0.12)',
      maxWidth: '960px', // Slightly wider than askbar to accommodate padding
      margin: '0 auto'
    },

    // Enhanced Ask AI capsule with stronger styling
    enhancedAskBar: {
      width: '100%',
      maxWidth: '920px',
      height: '72px', // Increased from 64px
      background: 'rgba(255, 255, 255, 0.14)', // Stronger background
      backdropFilter: 'blur(50px) saturate(1.3)', // Enhanced blur
      WebkitBackdropFilter: 'blur(50px) saturate(1.3)',
      borderRadius: '999px',
      border: '1.5px solid rgba(255, 255, 255, 0.18)', // Stronger border
      boxShadow: `
        inset 0 -1px 0 0 rgba(255, 255, 255, 0.28),
        inset 0 12px 28px 0 rgba(10, 16, 30, 0.12),
        0 12px 32px rgba(10, 16, 30, 0.16),
        0 0 0 1px rgba(52, 48, 190, 0.08)
      `, // Enhanced shadows with subtle brand accent
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      position: 'relative',
      transition: 'all 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    // Enhanced Ask AI input
    enhancedInput: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '17px', // Increased from 16px
      fontWeight: '450', // Slightly bolder
      color: 'var(--text-strong)', // Stronger contrast
      position: 'relative',
      zIndex: 10
    },

    // Enhanced placeholder styling
    enhancedPlaceholder: {
      color: 'rgba(10, 16, 30, 0.68)' // Increased contrast from 0.56
    },

    // Enhanced arrow button with more contrast
    enhancedArrow: {
      width: '48px', // Increased from 40px
      height: '48px',
      borderRadius: '999px',
      background: 'linear-gradient(135deg, var(--brand-accent) 0%, #6A66FF 100%)',
      color: 'white',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative',
      zIndex: 10,
      fontSize: '20px', // Larger arrow
      fontWeight: '600',
      boxShadow: '0 4px 16px rgba(52, 48, 190, 0.24)'
    },

    // Enhanced Global Search chip (distinct from Ask AI)
    globalSearchChip: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '20px',
      padding: '6px 14px',
      fontSize: '13px',
      color: 'var(--text-muted)',
      boxShadow: '0 4px 12px rgba(10, 16, 30, 0.08)'
    },

    // Enhanced prompt tiles with stronger styling
    enhancedPromptTile: {
      background: 'rgba(255, 255, 255, 0.08)', // Stronger background
      border: '1.5px solid rgba(16, 17, 20, 0.14)', // Stronger border
      borderRadius: '16px', // Increased radius
      boxShadow: `
        0 6px 20px rgba(10, 16, 30, 0.08),
        0 2px 8px rgba(10, 16, 30, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.12)
      `, // Multiple shadow layers
      transition: 'all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      padding: '20px',
      minHeight: '110px', // Slightly taller
      width: '320px', // Slightly wider
      overflow: 'visible',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },

    // Enhanced prompt badge
    enhancedBadge: {
      width: '36px',
      height: '36px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(52, 48, 190, 0.18) 0%, rgba(106, 102, 255, 0.12) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      border: '1px solid rgba(52, 48, 190, 0.16)',
      boxShadow: '0 2px 8px rgba(52, 48, 190, 0.12)'
    },

    // Enhanced prompt text
    enhancedPromptText: {
      fontSize: '15px', // Increased from 14px
      fontWeight: '450', // Slightly bolder
      lineHeight: '1.4',
      color: 'var(--text-strong)', // Stronger contrast
      textAlign: 'left' as const,
      flex: 1
    },

    // Enhanced keyboard tip
    enhancedKeyboardTip: {
      background: 'rgba(52, 48, 190, 0.06)',
      border: '1px solid rgba(52, 48, 190, 0.12)',
      borderRadius: '12px',
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: '500',
      color: 'var(--text-strong)',
      boxShadow: '0 4px 12px rgba(52, 48, 190, 0.08)',
      display: 'inline-block',
      marginTop: '24px'
    },

    // Enhanced section title
    enhancedSectionTitle: {
      fontSize: '24px',
      fontWeight: '650',
      color: 'var(--text-strong)',
      textAlign: 'center' as const,
      marginBottom: '32px',
      letterSpacing: '-0.01em'
    }
  };

  // Add enhanced placeholder styling via CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .enhanced-askbar-input::placeholder {
        color: rgba(10, 16, 30, 0.68) !important;
        font-weight: 450;
        opacity: 1;
      }
      
      .enhanced-askbar-input::-webkit-input-placeholder {
        color: rgba(10, 16, 30, 0.68) !important;
        font-weight: 450;
        opacity: 1;
      }
      
      .enhanced-askbar-input::-moz-placeholder {
        color: rgba(10, 16, 30, 0.68) !important;
        font-weight: 450;
        opacity: 1;
      }
      
      .enhanced-askbar-input:-ms-input-placeholder {
        color: rgba(10, 16, 30, 0.68) !important;
        font-weight: 450;
        opacity: 1;
      }

      @media (max-width: 768px) {
        .enhanced-prompt-grid {
          padding: 0 16px;
        }
        
        .enhanced-prompt-tile {
          width: 100% !important;
          max-width: 340px;
        }
      }

      @media (max-width: 640px) {
        .enhanced-askbar-container {
          margin: 0 16px;
          max-width: calc(100% - 32px);
          padding: 16px;
        }
        
        .enhanced-askbar {
          margin: 0 16px;
          max-width: calc(100% - 32px);
        }
      }
      
      @media (max-width: 480px) {
        .enhanced-askbar-container {
          margin: 0 12px;
          max-width: calc(100% - 24px);
          padding: 12px;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Keep your 6 prompts - EXACT SPECS
  const suggestedPrompts = [
    "How does the number of transactions this month compare to last month?",
    "What is the average transaction value this year?", 
    "What are the peak sales hours during weekdays?",
    "What are the top 5 products sold this month?",
    "Which sales region has shown the highest growth compared to last month?",
    "Which payment methods are used most frequently?"
  ];

  // INTERACTIONS - For each tile FRAME: On Click → Set variable query_text → Focus AskBar
  const handlePromptClick = (prompt: string) => {
    onQueryTextChange(prompt);
    // Focus AskBar text layer (or Scroll To AskBar)
    setTimeout(() => {
      if (askInputRef.current) {
        askInputRef.current.focus();
      }
    }, 100);
  };

  const handleSubmit = () => {
    if (queryText.trim()) {
      onQuerySubmit(queryText.trim());
    } else {
      // Tooltip "Pick a suggested prompt or type a question"
      const event = new CustomEvent('show-toast', { 
        detail: { type: 'error', message: 'Pick a suggested prompt or type a question.' } 
      });
      window.dispatchEvent(event);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Keyboard shortcuts 1–6 insert the 6 tile texts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 6 && suggestedPrompts[num - 1]) {
        e.preventDefault();
        handlePromptClick(suggestedPrompts[num - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Top bar solid (not glass), 64h; keep Global search and Scope pills; calm shadow
  const renderTopBar = () => (
    <div className="topbar-solid">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4">
          <button className="text-lg hover:text-gray-700 transition-colors">☰</button>
          <span className="text-meta font-medium">Workspace</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div style={localStyles.globalSearchChip}>
            <span>Global search ⌘K</span>
          </div>
          
          <div className="chip-soft px-3 py-1">
            <span className="text-meta text-sm font-medium">
              Scope: {currentDataset || 'Sales'}
            </span>
          </div>
          
          <button className="text-lg hover:text-gray-700 transition-colors">🔔</button>
          
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: 'var(--brand-accent)' }}
          >
            JD
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced sidebar with violet-tinted background and modern outline icons
  const renderLeftNav = () => {
    // Modern outline icon components
    const ModernIcons = {
      askAI: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
          <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
          <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
          <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      discover: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      ),
      insights: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
        </svg>
      ),
      dataSources: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        </svg>
      ),
      alerts: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      settings: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
      )
    };

    // Navigation items with grouping
    const primaryNavItems = [
      { name: 'Ask AI', icon: ModernIcons.askAI },
      { name: 'Discover', icon: ModernIcons.discover },
      { name: 'Insights', icon: ModernIcons.insights }
    ] as const;

    const secondaryNavItems = [
      { name: 'Data sources', icon: ModernIcons.dataSources, active: false },
      { name: 'Alerts', icon: ModernIcons.alerts, active: false },
      { name: 'Settings', icon: ModernIcons.settings, active: false }
    ];

    return (
      <div style={localStyles.enhancedSidebar}>
        <div className="p-6">
          <AdaaptLogo size="md" />
        </div>
        
        <nav className="flex-1 px-4">
          {/* Primary Navigation Group */}
          <div className="space-y-2 mb-4">
            {primaryNavItems.map((item, index) => {
              const isActive = item.name === activeSection;
              return (
              <div 
                key={index}
                style={isActive ? localStyles.enhancedNavItemActive : localStyles.enhancedNavItem}
                onClick={() => setActiveSection(item.name as 'Ask AI' | 'Discover' | 'Insights')}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(108, 99, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(108, 99, 255, 0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <span className="nav-icon" style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </span>
                <span style={{ 
                  fontSize: 'var(--font-meta-size)', 
                  fontWeight: isActive ? '600' : '500',
                  flex: 1
                }}>
                  {item.name}
                </span>
                {item.name === 'Ask AI' && (
                  <span style={{ 
                    fontSize: '11px', 
                    color: 'var(--text-muted)', 
                    fontWeight: '400'
                  }}>
                    (Home)
                  </span>
                )}
              </div>
            );})}
          </div>

          {/* Navigation Divider */}
          <div style={localStyles.navDivider}></div>

          {/* Secondary Navigation Group */}
          <div className="space-y-2">
            {secondaryNavItems.map((item, index) => {
              const isActive = (item.name === 'Alerts' && activeSection === 'Alerts') || 
                              (item.name === 'Settings' && activeSection === 'Settings');
              return (
                <div 
                  key={index}
                  style={isActive ? localStyles.enhancedNavItemActive : localStyles.enhancedNavItem}
                  onClick={() => {
                    if (item.name === 'Alerts') {
                      setActiveSection('Alerts');
                    } else if (item.name === 'Settings') {
                      setActiveSection('Settings');
                    } else if (item.name === 'Data sources') {
                      // Open DatasetManagementModal when Data sources is clicked
                      setIsDatasetManagementModalOpen(true);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(108, 99, 255, 0.08)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(108, 99, 255, 0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <span className="nav-icon" style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                </span>
                  <span style={{ 
                    fontSize: 'var(--font-meta-size)', 
                    fontWeight: isActive ? '600' : '500',
                    flex: 1
                  }}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    );
  };

  return (
    <div className="root-background min-h-screen flex flex-col">
      {/* Top Bar */}
      {renderTopBar()}
      
      <div className="flex flex-1">
        {/* Left Navigation */}
        {renderLeftNav()}
        
        {/* Main Content - Content max width: 1120; center aligned */}
        <div className="flex-1 flex items-center justify-center px-6">
          {activeSection === 'Discover' ? (
            <DiscoverSection />
          ) : activeSection === 'Alerts' ? (
            <AlertsSection />
          ) : activeSection === 'Settings' ? (
            <ProfileSettingsSection />
          ) : (
            <div className="container-home">
              {/* STRUCTURE (hero) - Enhanced heading with stronger styling */}
              <div className="text-center mb-12">
                <h1 style={localStyles.enhancedHeading}>What would you like to analyse today?</h1>
                {/* Enhanced AskBar Container with violet-tinted background and hover effects */}
                <div 
                  style={localStyles.enhancedAskBarContainer}
                  className="mb-6"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = `
                      0 16px 40px rgba(108, 99, 255, 0.18),
                      0 8px 24px rgba(10, 16, 30, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.14)
                    `;
                    e.currentTarget.style.background = 'rgba(108, 99, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = `
                      0 8px 24px rgba(108, 99, 255, 0.12),
                      0 4px 12px rgba(10, 16, 30, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1)
                    `;
                    e.currentTarget.style.background = 'rgba(108, 99, 255, 0.08)';
                  }}
                  onClick={() => {
                    if (askInputRef.current) {
                      askInputRef.current.focus();
                    }
                  }}
                >
                  <div style={localStyles.enhancedAskBar}>
                    {/* 1) Search icon (24) @ text/muted */}
                    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {/* 2) Enhanced input with better contrast */}
                    <input
                      ref={askInputRef}
                      type="text"
                      value={queryText}
                      onChange={(e) => onQueryTextChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask a question about your data…"
                      style={{
                        ...localStyles.enhancedInput,
                        '::placeholder': localStyles.enhancedPlaceholder
                      }}
                      className="enhanced-askbar-input bg-[#F5F5F5]"
                    />
                    {/* 3) Divider */}
                    <div style={{ 
                      width: '1px', 
                      height: '28px', 
                      background: 'rgba(16, 17, 20, 0.12)',
                      position: 'relative',
                      zIndex: 10 
                    }}></div>
                    {/* 4) Dataset pill */}
                    <button
                      onClick={() => {
                        // Handle dataset selection - could open a modal or navigate to dataset selection
                        console.log('Dataset button clicked:', currentDataset || 'Sales — Sample');
                        // You can add your dataset selection logic here
                      }}
                      style={{
                        background: 'rgba(52, 48, 190, 0.14)',
                        color: 'var(--text-strong)',
                        borderRadius: '999px',
                        padding: '6px 14px',
                        fontSize: '14px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                        zIndex: 10,
                        border: '1px solid rgba(52, 48, 190, 0.18)',
                        cursor: 'pointer',
                        transition: 'all 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(52, 48, 190, 0.20)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(52, 48, 190, 0.16)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(52, 48, 190, 0.14)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Dataset: {currentDataset || 'Sales — Sample'}
                    </button>
                    {/* 5) Enhanced arrow button */}
                    <button
                      onClick={handleSubmit}
                      style={localStyles.enhancedArrow}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(52, 48, 190, 0.32), 0 0 0 8px rgba(90, 87, 214, 0.18)';
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(52, 48, 190, 0.24)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
                {/* CHIPS ROW (separate frame BELOW AskBar) */}
                <div className="chips-row mb-12">
                  <div className="chip-soft">Enter to run</div>
                  <div className="chip-soft">AI tips</div>
                </div>
              </div>
              {/* Enhanced SUGGESTED PROMPTS GRID */}
              <div className="space-y-6">
                <h3 style={localStyles.enhancedSectionTitle}>Suggested prompts</h3>
                {/* Enhanced keyboard tip - positioned above prompts */}
                <div className="text-center mb-6">
                  <div style={localStyles.enhancedKeyboardTip}>
                    💡 Press 1–6 to quickly select a prompt
                  </div>
                </div>
                {/* Enhanced prompt tiles grid with mobile responsiveness */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center px-4 md:px-0">
                  {suggestedPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      style={localStyles.enhancedPromptTile}
                      onClick={() => handlePromptClick(prompt)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                        e.currentTarget.style.boxShadow = `
                          0 12px 32px rgba(10, 16, 30, 0.12),
                          0 4px 16px rgba(10, 16, 30, 0.08),
                          inset 0 1px 0 rgba(255, 255, 255, 0.16),
                          0 0 0 2px rgba(52, 48, 190, 0.12)
                        `;
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = `
                          0 6px 20px rgba(10, 16, 30, 0.08),
                          0 2px 8px rgba(10, 16, 30, 0.04),
                          inset 0 1px 0 rgba(255, 255, 255, 0.12)
                        `;
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      <div className="flex items-start gap-4 w-full">
                        {/* Enhanced badge with gradient */}
                        <div style={localStyles.enhancedBadge}>
                          <span style={{ fontSize: '16px' }}>⚡</span>
                        </div>
                        <p style={localStyles.enhancedPromptText}>{prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dataset Management Modal */}
      <DatasetManagementModal
        isOpen={isDatasetManagementModalOpen}
        onClose={() => setIsDatasetManagementModalOpen(false)}
        onRequestDeletion={(deletionData) => {
          console.log('Deletion request:', deletionData);
          // Handle deletion request here
          alert('Deletion request submitted successfully!');
        }}
      />
    </div>
  );
}