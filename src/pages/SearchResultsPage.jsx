import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Search, User, FileText, AlertCircle } from 'lucide-react';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await api.search(query);
        setResults(response);
      } catch (error) {
        console.error("Error searching", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
      setResults({ students: [], signals: [], interventions: [] });
    }
  }, [query]);

  if (loading) return <div className="p-8 text-center text-gray-500">Searching...</div>;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
        <p className="text-gray-500 mt-1">Showing results for "{query}"</p>
      </div>

      {!results || (results.students.length === 0 && results.signals.length === 0 && results.interventions.length === 0) ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No results found</h3>
          <p className="text-gray-500">Try adjusting your search terms.</p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {results.students?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-blue-500"/> Students</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {results.students.map(s => (
                  <Link key={s.id} to={`/students/${s.id}`} className="block p-4 hover:bg-gray-50">
                    <h4 className="font-medium text-gray-900">{s.name}</h4>
                    <p className="text-sm text-gray-500">ID: {s.studentId} • Grade {s.grade}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.signals?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-2 text-orange-500"/> Signals</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {results.signals.map(s => (
                  <Link key={s.id} to={`/attention`} className="block p-4 hover:bg-gray-50">
                    <h4 className="font-medium text-gray-900">{s.title}</h4>
                    <p className="text-sm text-gray-500">{s.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

            {results.interventions?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-green-500"/> Interventions</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                  {results.interventions.map(i => (
                    <Link key={i.id} to={`/interventions`} className="block p-4 hover:bg-gray-50">
                      <h4 className="font-medium text-gray-900">{i.title}</h4>
                      <p className="text-sm text-gray-500">Student: {i.studentName || 'N/A'} • Status: {i.status}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.staff?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-purple-500"/> Staff</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                  {results.staff.map(u => (
                    <div key={u.id} className="block p-4 hover:bg-gray-50">
                      <h4 className="font-medium text-gray-900">{u.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">Role: {u.role} • {u.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.communications?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-blue-500"/> Communications</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                  {results.communications.map(c => (
                    <Link key={c.id} to={`/communications`} className="block p-4 hover:bg-gray-50">
                      <h4 className="font-medium text-gray-900">{c.subject}</h4>
                      <p className="text-sm text-gray-500 capitalize">Status: {c.status}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
