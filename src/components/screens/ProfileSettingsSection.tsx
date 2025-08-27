import React, { useState, useRef } from 'react';

export default function ProfileSettingsSection() {
  const [formData, setFormData] = useState({
    name: '',
    department: 'Sales',
    currentProject: ''
  });
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const departments = ['Sales', 'Marketing', 'Engineering', 'Product', 'Support', 'Operations'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile:', { ...formData, avatar });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-left">Profile</h1>

      {/* Avatar Upload Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Profile avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg 
                  className="w-12 h-12 text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              aria-label="Upload avatar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Photo</h3>
            <p className="text-sm text-gray-600 mb-3">
              Upload a new profile photo to personalize your account
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Change photo
            </button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="hidden"
          aria-label="Avatar upload input"
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
            aria-describedby="name-help"
          />
          <p id="name-help" className="mt-1 text-sm text-gray-500">
            This is how your name will appear to other users
          </p>
        </div>

        {/* Department Field */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            id="department"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
            aria-describedby="department-help"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <p id="department-help" className="mt-1 text-sm text-gray-500">
            Select your current department
          </p>
        </div>

        {/* Current Project Field */}
        <div>
          <label htmlFor="currentProject" className="block text-sm font-medium text-gray-700 mb-2">
            Current Project
          </label>
          <input
            type="text"
            id="currentProject"
            value={formData.currentProject}
            onChange={(e) => handleInputChange('currentProject', e.target.value)}
            placeholder="Enter your current project name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
            aria-describedby="project-help"
          />
          <p id="project-help" className="mt-1 text-sm text-gray-500">
            The project you're currently working on
          </p>
        </div>

        {/* Save Button */}
        <div style={{ paddingTop: '1rem' }}>
          <button
            type="button"
            onClick={handleSave}
            style={{
              width: '100%',
              backgroundColor: '#7c3aed', // Purple-600
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6d28d9'; // Purple-700
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7c3aed'; // Purple-600
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid #a855f7';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}