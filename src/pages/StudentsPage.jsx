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
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Student Directory</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View and manage all enrolled students.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <select 
            value={gradeFilter} 
            onChange={(e) => setGradeFilter(e.target.value)}
            className="border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500 py-2 pl-3 pr-8 bg-white"
          >
            <option value="all">All Grades</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">Loading directory...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
          {filteredStudents.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500 text-sm">
              No students match your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
