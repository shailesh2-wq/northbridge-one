import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Check, Clock, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function AssignmentsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('active');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        let response = [];
        const queryTeacherId = searchParams.get('teacher_id');
        
        if (queryTeacherId) {
          response = await api.getAssignments({ teacher_id: queryTeacherId });
        } else if (user?.role === 'teacher') {
          response = await api.getAssignments({ teacher_id: user.id });
        } else if (user?.role === 'parent' || user?.role === 'student') {
          const studentId = user?.associatedStudentId || '1'; // demo fallback
          response = await api.getAssignments({ student_id: studentId });
        } else {
          response = await api.getAssignments();
        }
        
        // Map backend assignments to frontend format
        const mapped = response.map(a => {
           let status = 'completed';
           const isPastDue = new Date(a.due_date) < new Date();
           
           if (a.student_status) {
             // If we have student-specific status (parent/student view)
             if (a.student_status === 'missing') status = 'active'; // Missing implies it's active/needs action for student
             else if (a.student_status === 'submitted') status = 'completed';
             else if (a.student_status === 'pending' && isPastDue) status = 'needs_grading'; // overdue
             else status = 'active';
           } else {
             // Teacher view
             if (a.submitted_count < a.total_count && !isPastDue) {
                 status = 'active';
             } else if (a.submitted_count < a.total_count && isPastDue) {
                 status = 'needs_grading'; // or overdue
             } else if (a.submitted_count === a.total_count) {
                 status = 'completed';
             }
           }
           
           return {
               id: a.id,
               title: a.title,
               subject: 'Academic', // Could be mapped to real subject name
               class: 'Class',
               dueDate: a.due_date ? new Date(a.due_date).toLocaleDateString() : 'No Due Date',
               submitted: a.submitted_count || 0,
               total: a.total_count || 0,
               status: status
           };
        });
        setAssignments(mapped);
      } catch (error) {
        console.error("Error fetching assignments", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAssignments();
  }, [user]);

  const filtered = assignments.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'active') return a.status === 'active' || a.status === 'needs_grading';
    return a.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage coursework and track student submissions.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Assignments</option>
            <option value="active">Active & Grading</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
          {user?.role === 'teacher' && (
             <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
               <BookOpen className="w-4 h-4 mr-2" /> Create Assignment
             </button>
          )}
        </div>
      </div>

      {loading ? (
         <div className="text-center py-12 text-gray-500">Loading assignments...</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(assignment => (
          <div key={assignment.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                assignment.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' :
                assignment.status === 'needs_grading' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                assignment.status === 'upcoming' ? 'bg-gray-100 text-gray-600 border border-gray-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {assignment.status.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 font-medium">{assignment.class}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{assignment.title}</h3>
            <p className="text-sm text-gray-500 mb-6">{assignment.subject}</p>
            
            <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                Due {assignment.dueDate}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Submissions</p>
                <p className="text-sm font-semibold text-gray-900">
                  {assignment.submitted} / {assignment.total}
                </p>
              </div>
              
              {assignment.submitted < assignment.total && assignment.status !== 'upcoming' && (
                <div className="flex items-center text-orange-600 text-xs font-medium bg-orange-50 px-2 py-1 rounded">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {assignment.total - assignment.submitted} missing
                </div>
              )}
              {assignment.submitted === assignment.total && assignment.status !== 'upcoming' && (
                <div className="flex items-center text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                  <Check className="w-3 h-3 mr-1" />
                  All submitted
                </div>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
           <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
             No assignments found.
           </div>
        )}
      </div>
      )}
    </div>
  );
}
