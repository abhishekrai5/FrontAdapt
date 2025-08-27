import React from 'react';

export function AlertsSection() {
  const kpiData = [
    { kpi: 'Monthly Revenue Growth', target: '15%', current: '12.3%', status: 'At Risk', owner: 'Sarah Chen', nextReview: '2024-01-15' },
    { kpi: 'Customer Churn Rate', target: '<5%', current: '4.2%', status: 'On Track', owner: 'Mike Johnson', nextReview: '2024-01-20' },
    { kpi: 'Average Response Time', target: '<2hrs', current: '1.8hrs', status: 'On Track', owner: 'Lisa Wang', nextReview: '2024-01-18' },
    { kpi: 'Conversion Rate', target: '8.5%', current: '7.1%', status: 'Critical', owner: 'David Kim', nextReview: '2024-01-12' }
  ];

  const ticketData = [
    { title: 'Revenue growth below target - Q4 analysis needed', priority: 'High', assignee: 'Sarah Chen', due: '2024-01-15', status: 'In Progress' },
    { title: 'Customer feedback system optimization', priority: 'Medium', assignee: 'Mike Johnson', due: '2024-01-25', status: 'Open' },
    { title: 'Response time trending upward', priority: 'High', assignee: 'Lisa Wang', due: '2024-01-18', status: 'On Hold' },
    { title: 'Conversion funnel drop-off investigation', priority: 'Critical', assignee: 'David Kim', due: '2024-01-10', status: 'Overdue' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on track':
        return { color: '#059669', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' };
      case 'at risk':
        return { color: '#d97706', backgroundColor: '#fffbeb', borderColor: '#fed7aa' };
      case 'critical':
        return { color: '#dc2626', backgroundColor: '#fef2f2', borderColor: '#fecaca' };
      case 'overdue':
        return { color: '#dc2626', backgroundColor: '#fef2f2', borderColor: '#fecaca' };
      default:
        return { color: '#4b5563', backgroundColor: '#f9fafb', borderColor: '#e5e7eb' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return { color: '#dc2626', backgroundColor: '#fef2f2', borderColor: '#fecaca' };
      case 'high':
        return { color: '#ea580c', backgroundColor: '#fff7ed', borderColor: '#fed7aa' };
      case 'medium':
        return { color: '#d97706', backgroundColor: '#fffbeb', borderColor: '#fed7aa' };
      case 'low':
        return { color: '#059669', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' };
      default:
        return { color: '#4b5563', backgroundColor: '#f9fafb', borderColor: '#e5e7eb' };
    }
  };

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
      marginBottom: '32px'
    },
    section: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 600 as const,
      color: 'var(--text-strong)',
      marginBottom: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(10, 16, 30, 0.08)',
      border: '1px solid rgba(16, 17, 20, 0.12)'
    },
    tableHeader: {
      background: 'rgba(108, 99, 255, 0.08)',
      borderBottom: '1px solid rgba(108, 99, 255, 0.16)'
    },
    tableHeaderCell: {
      padding: '16px 12px',
      textAlign: 'left' as const,
      fontSize: '14px',
      fontWeight: 600 as const,
      color: 'var(--text-strong)',
      borderBottom: '1px solid rgba(108, 99, 255, 0.16)'
    },
    tableRow: {
      borderBottom: '1px solid rgba(16, 17, 20, 0.08)',
      transition: 'background-color 150ms ease'
    },
    tableRowEven: {
      background: 'rgba(255, 255, 255, 0.4)'
    },
    tableRowOdd: {
      background: 'rgba(255, 255, 255, 0.8)'
    },
    tableCell: {
      padding: '16px 12px',
      fontSize: '14px',
      color: 'var(--text-body)',
      borderBottom: '1px solid rgba(16, 17, 20, 0.08)'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600 as const,
      border: '1px solid',
      display: 'inline-block',
      textAlign: 'center' as const,
      minWidth: '80px'
    },
    priorityBadge: {
      padding: '6px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600 as const,
      border: '1px solid',
      display: 'inline-block',
      textAlign: 'center' as const,
      minWidth: '70px'
    },
    actionButton: {
      padding: '8px 16px',
      borderRadius: '999px',
      fontSize: '13px',
      fontWeight: 600 as const,
      color: 'var(--text-strong)',
      background: 'rgba(108, 99, 255, 0.10)',
      border: '1px solid rgba(108, 99, 255, 0.20)',
      cursor: 'pointer',
      transition: 'all 150ms ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Alerts</h1>

      {/* Section 1: KPIs Table */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>KPIs</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>KPI</th>
                <th style={styles.tableHeaderCell}>Target</th>
                <th style={styles.tableHeaderCell}>Current</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Owner</th>
                <th style={styles.tableHeaderCell}>Next Review</th>
                <th style={styles.tableHeaderCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {kpiData.map((row, index) => (
                <tr 
                  key={index} 
                  style={{
                    ...styles.tableRow,
                    ...(index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(108, 99, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  <td style={styles.tableCell}>
                    <div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{row.kpi}</div>
                  </td>
                  <td style={styles.tableCell}>{row.target}</td>
                  <td style={styles.tableCell}>{row.current}</td>
                  <td style={styles.tableCell}>
                    <span style={{ 
                      ...styles.statusBadge, 
                      color: getStatusColor(row.status).color,
                      backgroundColor: getStatusColor(row.status).backgroundColor,
                      borderColor: getStatusColor(row.status).borderColor
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{row.owner}</td>
                  <td style={styles.tableCell}>{row.nextReview}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.actionButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(108, 99, 255, 0.16)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 99, 255, 0.20)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(108, 99, 255, 0.10)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      View ▸
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Tickets Table */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Tickets</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Title</th>
                <th style={styles.tableHeaderCell}>Priority</th>
                <th style={styles.tableHeaderCell}>Assignee</th>
                <th style={styles.tableHeaderCell}>Due</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((row, index) => (
                <tr 
                  key={index} 
                  style={{
                    ...styles.tableRow,
                    ...(index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(108, 99, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  <td style={styles.tableCell}>
                    <div style={{ fontWeight: 500, color: 'var(--text-strong)' }}>{row.title}</div>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={{ 
                      ...styles.priorityBadge, 
                      color: getPriorityColor(row.priority).color,
                      backgroundColor: getPriorityColor(row.priority).backgroundColor,
                      borderColor: getPriorityColor(row.priority).borderColor
                    }}>
                      {row.priority}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{row.assignee}</td>
                  <td style={styles.tableCell}>{row.due}</td>
                  <td style={styles.tableCell}>
                    <span style={{ 
                      ...styles.statusBadge, 
                      color: getStatusColor(row.status).color,
                      backgroundColor: getStatusColor(row.status).backgroundColor,
                      borderColor: getStatusColor(row.status).borderColor
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.actionButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(108, 99, 255, 0.16)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 99, 255, 0.20)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(108, 99, 255, 0.10)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Open ▸
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .alerts-container { padding: 20px 16px; }
            .alerts-heading { font-size: 32px; }
            .alerts-section-title { font-size: 20px; }
            .alerts-table { font-size: 13px; }
            .alerts-table th, .alerts-table td { padding: 12px 8px; }
          }
          
          @media (max-width: 640px) {
            .alerts-container { padding: 16px 12px; }
            .alerts-heading { font-size: 28px; }
            .alerts-table { font-size: 12px; }
            .alerts-table th, .alerts-table td { padding: 10px 6px; }
          }
        `}
      </style>
    </div>
  );
}

export default AlertsSection;
