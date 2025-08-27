import React, { useState } from 'react';

interface DatasetManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDeletion: (deletionData: DeletionRequest) => void | Promise<void>;
  /** Optional: handle approved/instant exports (used when not requiring admin). */
  onRequestExport?: (exportData: DeletionRequest) => void | Promise<void>;
  /**
   * Optional: create an approval ticket (for admin workflow) for source-data actions
   * and dataset-level delete/export.
   */
  onCreateApprovalRequest?: (approval: ApprovalRequest) => void | Promise<void>;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  size: string;
  accessLevel: 'read' | 'write' | 'admin';
}

interface DepartmentDatasets {
  department: string;
  datasets: Dataset[];
}

interface DeletionRequest {
  itemsToRemove: string[]; // e.g. ['chat-memory'] | ['cached-results'] | ['source-data']
  scope: string; // 'my-content' | 'department' | 'date-range'
  dateRange?: {
    start: string;
    end: string;
  };
  department?: string;
}

interface ApprovalRequest {
  action: 'delete' | 'export';
  itemType: 'source-data' | 'dataset';
  // for dataset-level actions:
  datasetId?: string;
  datasetName?: string;

  // for radio "source-data" actions (modal’s deletion tab):
  scope?: string;
  dateRange?: { start: string; end: string };
  department?: string;

  itemsToRemove?: string[]; // mirrors DeletionRequest when coming from the deletion tab
}

export function DatasetManagementModal({
  isOpen,
  onClose,
  onRequestDeletion,
  onRequestExport,
  onCreateApprovalRequest,
}: DatasetManagementModalProps) {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [scope, setScope] = useState('my-content');
  const [department, setDepartment] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'datasets' | 'deletion'>('datasets');

  // ---- Dataset actions (kept UI exactly the same) ----
  const handleViewDataset = (dataset: Dataset) => {
    console.log('[AUDIT] View dataset', {
      datasetId: dataset.id,
      datasetName: dataset.name,
      time: new Date().toISOString(),
    });
    alert(`Opening dataset: ${dataset.name}`);
  };

  const handleExportDataset = async (dataset: Dataset) => {
    // Source-data export must go through admin approval
    const approval: ApprovalRequest = {
      action: 'export',
      itemType: 'dataset',
      datasetId: dataset.id,
      datasetName: dataset.name,
    };
    console.log('[AUDIT] Export dataset (admin approval required)', {
      ...approval,
      time: new Date().toISOString(),
    });

    try {
      if (onCreateApprovalRequest) {
        await onCreateApprovalRequest(approval);
      }
      alert(`Export request submitted for admin approval: ${dataset.name}`);
    } catch (e) {
      console.error('Failed to submit export approval request:', e);
      alert('Failed to submit export request. Please try again.');
    }
  };

  const handleDeleteDataset = async (dataset: Dataset) => {
    if (!confirm(`Are you sure you want to request deletion for "${dataset.name}"? This requires admin approval.`)) {
      return;
    }
    // Source-data deletion must go through admin approval
    const approval: ApprovalRequest = {
      action: 'delete',
      itemType: 'dataset',
      datasetId: dataset.id,
      datasetName: dataset.name,
    };
    console.log('[AUDIT] Delete dataset (admin approval required)', {
      ...approval,
      time: new Date().toISOString(),
    });

    try {
      if (onCreateApprovalRequest) {
        await onCreateApprovalRequest(approval);
      }
      alert(`Deletion request submitted for admin approval: ${dataset.name}`);
    } catch (e) {
      console.error('Failed to submit deletion approval request:', e);
      alert('Failed to submit deletion request. Please try again.');
    }
  };

  // ---- Mock dataset data (unchanged) ----
  const departmentDatasets: DepartmentDatasets[] = [
    {
      department: 'Sales Dept',
      datasets: [
        {
          id: 'sales-1',
          name: 'Q4 Sales Data',
          description: 'Quarterly sales performance and customer analytics',
          lastUpdated: '2024-01-15',
          size: '2.4 GB',
          accessLevel: 'read'
        },
        {
          id: 'sales-2',
          name: 'Customer Pipeline',
          description: 'Active customer leads and conversion tracking',
          lastUpdated: '2024-01-14',
          size: '1.8 GB',
          accessLevel: 'write'
        }
      ]
    },
    {
      department: 'Finance Dept',
      datasets: [
        {
          id: 'finance-1',
          name: 'Budget Analysis',
          description: 'Annual budget planning and variance analysis',
          lastUpdated: '2024-01-13',
          size: '3.1 GB',
          accessLevel: 'read'
        }
      ]
    },
    {
      department: 'HR Dept',
      datasets: [
        {
          id: 'hr-1',
          name: 'Employee Performance',
          description: 'Performance metrics and review data',
          lastUpdated: '2024-01-12',
          size: '1.2 GB',
          accessLevel: 'read'
        }
      ]
    },
    {
      department: 'Other Available Domains',
      datasets: [
        {
          id: 'other-1',
          name: 'Market Research',
          description: 'Industry trends and competitive analysis',
          lastUpdated: '2024-01-11',
          size: '4.2 GB',
          accessLevel: 'read'
        }
      ]
    }
  ];

  // ---- Deletion tab options (unchanged) ----
  const deletionOptions = [
    {
      id: 'chat-memory',
      label: 'Clear chat memory (prompts & responses)',
      description: 'Remove stored conversation history and AI interactions'
    },
    {
      id: 'cached-results',
      label: 'Clear cached results / derived artifacts',
      description: 'Delete computed results and temporary data files'
    },
    {
      id: 'source-data',
      label: 'Request source-data deletion (admin approval required)',
      description: 'Remove specific portions of original data sources'
    }
  ];

  const scopeOptions = [
    { id: 'my-content', label: 'My content', description: 'Only data you have created or uploaded' },
    { id: 'department', label: 'Department', description: 'Data within your department scope' },
    { id: 'date-range', label: 'Date range', description: 'Data within a specific time period' }
  ];

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
  };

  // ---- Submission from the Deletion tab ----
  const handleSubmit = async () => {
    if (!selectedItem) return;

    setIsSubmitting(true);

    const deletionData: DeletionRequest = {
      itemsToRemove: [selectedItem],
      scope,
      ...(scope === 'department' && { department }),
      ...(scope === 'date-range' && { dateRange })
    };

    try {
      // Log all actions
      console.log('[AUDIT] Deletion action requested', {
        user: 'currentUserId', // swap with real user context
        time: new Date().toISOString(),
        deletionData,
      });

      if (selectedItem === 'source-data') {
        // Source data requires admin approval – create approval ticket instead of direct delete
        const approvalPayload: ApprovalRequest = {
          action: 'delete',
          itemType: 'source-data',
          scope,
          department,
          dateRange: scope === 'date-range' ? dateRange : undefined,
          itemsToRemove: deletionData.itemsToRemove,
        };

        if (onCreateApprovalRequest) {
          await onCreateApprovalRequest(approvalPayload);
        } else {
          // Fallback: simulate ticket creation
          console.log('[APPROVAL] Source-data deletion approval created', approvalPayload);
        }
        alert('Request submitted. Awaiting admin approval.');
      } else {
        // Chat memory or cached results: proceed directly
        await onRequestDeletion(deletionData);
        alert('Deletion completed successfully.');
      }

      onClose();
    } catch (error) {
      console.error('Deletion request failed:', error);
      alert('Deletion request failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'write': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Dataset Management</h2>
              <p className="text-sm text-gray-600 mt-1">
                View and manage company datasets with proper governance controls
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('datasets')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'datasets'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Available Datasets
              </button>
              <button
                onClick={() => setActiveTab('deletion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'deletion'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Data Deletion
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'datasets' ? (
              /* Datasets View (unchanged layout; Export/Delete now create approval tickets) */
              <div className="space-y-6">
                {departmentDatasets.map((dept) => (
                  <div key={dept.department} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">{dept.department}</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {dept.datasets.map((dataset) => (
                        <div key={dataset.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h4 className="text-sm font-medium text-gray-900">{dataset.name}</h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAccessLevelColor(dataset.accessLevel)}`}>
                                  {dataset.accessLevel}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{dataset.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                <span>Updated: {dataset.lastUpdated}</span>
                                <span>Size: {dataset.size}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewDataset(dataset)}
                                className="px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 text-sm font-medium rounded-md border border-purple-200 transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleExportDataset(dataset)}
                                className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium rounded-md border border-blue-200 transition-colors"
                              >
                                Export
                              </button>
                              <button
                                onClick={() => handleDeleteDataset(dataset)}
                                className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium rounded-md border border-red-200 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Deletion View (unchanged UI; source-data now routes to admin approval) */
              <div className="space-y-6">
                {/* What to Remove Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">What would you like to remove?</h3>
                  <div className="space-y-3">
                    {deletionOptions.map((option) => (
                      <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="deletion-option"
                          checked={selectedItem === option.id}
                          onChange={() => handleItemSelect(option.id)}
                          className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Scope Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Deletion Scope</h3>
                  <div className="space-y-3">
                    {scopeOptions.map((option) => (
                      <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="scope"
                          value={option.id}
                          checked={scope === option.id}
                          onChange={(e) => setScope(e.target.value)}
                          className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Conditional Fields */}
                {scope === 'department' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select department</option>
                      <option value="sales">Sales</option>
                      <option value="finance">Finance</option>
                      <option value="hr">HR</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {scope === 'date-range' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                )}

                {/* Retention Policy & Logging */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Retention Policy</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        30-day soft-delete • Legal hold respected
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        Deleted data is retained for 30 days before permanent removal. Legal holds override deletion schedules.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logging Notice */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Audit & Logging</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        All deletion actions are logged with timestamps, user information, and scope details for compliance and audit purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Cancel
            </button>
            {activeTab === 'deletion' && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedItem}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Requesting...' : 'Request Deletion'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatasetManagementModal;
