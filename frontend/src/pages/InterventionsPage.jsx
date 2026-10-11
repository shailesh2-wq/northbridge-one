import React, { useEffect, useState } from 'react';
import api from '../services/api';
import InterventionCard from '../components/intervention/InterventionCard';
import CreateInterventionModal from '../components/intervention/CreateInterventionModal';
import { Plus, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function InterventionsPage() {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [students, setStudents] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invRes, stuRes] = await Promise.all([
          api.getInterventions({ role: user.role, user_id: user.id }),
          api.getStudents()
        ]);
        const mappedInvs = invRes.map(inv => {
          const student = stuRes.find(s => s.id === inv.student_id);
          return {
            ...inv,
            dueDate: inv.due_date,
            studentName: student ? `${student.first_name} ${student.last_name}` : `Student ID: ${inv.student_id}`
          };
        });
        setInterventions(mappedInvs);
        setStudents(stuRes);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateIntervention = async (formData) => {
    try {
      const studentName = students.find(s => s.id === formData.studentId)?.name || 'Unknown';
      const newIntervention = {
        id: `inv-${Date.now()}`,
        ...formData,
        studentName,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setInterventions([newIntervention, ...interventions]);
      // Would call api.createIntervention here
    } catch (error) {
      console.error(error);
    }
  };

  const filteredInterventions = interventions.filter(inv => {
    if (filter === 'all') return true;
    return inv.status.toLowerCase() === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interventions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage active support plans and assignments.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" /> New Intervention
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading interventions...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterventions.map(inv => (
            <InterventionCard key={inv.id} intervention={inv} />
          ))}
          {filteredInterventions.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
              No interventions found.
            </div>
          )}
        </div>
      )}

      <CreateInterventionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateIntervention}
        students={students}
      />
    </div>
  );
}
