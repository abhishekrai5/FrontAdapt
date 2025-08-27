import React, { useState } from 'react';

interface GovernedDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDeletion: (deletionData: DeletionRequest) => void;
}

interface DeletionRequest {
  itemsToRemove: string[];
  scope: string;
  dateRange?: {
    start: string;
    end: string;
  };
  department?: string;
}

export function GovernedDeleteModal({ isOpen, onClose, onRequestDeletion }: GovernedDeleteModalProps) {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [scope, setScope] = useState('my-content');
  const [department, setDepartment] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deletionOptions = [
    {
      id: 'chat-memory',
      label: 'Clear chat memory',
      description: 'Remove stored conversation history and AI interactions'
    },
    {
      id: 'cached-results',
      label: 'Clear cached results',
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
      await onRequestDeletion(deletionData);
      onClose();
    } catch (error) {
      console.error('Deletion request failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = selectedItem && 
    (scope !== 'department' || department) &&
    (scope !== 'date-range' || (dateRange.start && dateRange.end));

  // Debug logging
  console.log('Modal state:', {
    selectedItem,
    scope,
    department,
    dateRange,
    canSubmit,
    isSubmitting
  });

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
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Governed Data Deletion</h2>
              <p className="text-sm text-gray-600 mt-1">
                Request removal of data with proper governance controls
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

          {/* Content */}
          <div className="p-6 space-y-6">
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
                  <option value="marketing">Marketing</option>
                  <option value="engineering">Engineering</option>
                  <option value="product">Product</option>
                  <option value="support">Support</option>
                  <option value="operations">Operations</option>
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

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Requesting...' : 'Request Deletion'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GovernedDeleteModal;
