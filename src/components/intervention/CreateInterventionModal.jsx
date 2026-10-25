import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateInterventionModal({ isOpen, onClose, onSubmit, students = [] }) {
  const [formData, setFormData] = useState({
    studentId: '',
    type: 'academic',
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Create Intervention</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
              <select name="studentId" required value={formData.studentId} onChange={handleChange} className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a student...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="academic">Academic</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="attendance">Attendance</option>
                  <option value="counseling">Counseling</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Brief summary" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" required value={formData.description} onChange={handleChange} rows="3" className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Detailed intervention plan..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <input type="text" name="assignedTo" required value={formData.assignedTo} onChange={handleChange} className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Staff name/ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input type="date" name="dueDate" required value={formData.dueDate} onChange={handleChange} className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>
        </form>
        
        <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 bg-gray-50">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700">
            Create Intervention
          </button>
        </div>
      </div>
    </div>
  );
}
