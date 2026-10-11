import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StudentCard from '../components/student/StudentCard';
import { Search, Filter } from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.getStudents();
        setStudents(response);
      } catch (error) {
        console.error("Error fetching students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => {
    const fullName = `${s.first_name} ${s.last_name}`;
    const matchesSearch = fullName.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || s.grade.toString() === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage all enrolled students.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>
          <select 
            value={gradeFilter} 
            onChange={(e) => setGradeFilter(e.target.value)}
            className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Grades</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
          {filteredStudents.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
              No students match your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
