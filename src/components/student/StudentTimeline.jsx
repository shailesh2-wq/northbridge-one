import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, MessageSquare, BookOpen, Clock } from 'lucide-react';

export default function StudentTimeline({ events }) {
  if (!events || events.length === 0) {
    return <div className="text-gray-500 text-sm py-4">No recent activity.</div>;
  }

  const getEventIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'attendance_present': return <CheckCircle2 className="w-5 h-5 text-green-500 bg-white" />;
      case 'attendance_absent': return <XCircle className="w-5 h-5 text-red-500 bg-white" />;
      case 'attendance_late': return <Clock className="w-5 h-5 text-yellow-500 bg-white" />;
      case 'signal': return <AlertCircle className="w-5 h-5 text-orange-500 bg-white" />;
      case 'communication': return <MessageSquare className="w-5 h-5 text-blue-500 bg-white" />;
      case 'academic': return <BookOpen className="w-5 h-5 text-purple-500 bg-white" />;
      default: return <Clock className="w-5 h-5 text-gray-400 bg-white" />;
    }
  };

  return (
    <div className="relative border-l border-gray-200 ml-3 space-y-6 pb-4">
      {events.map((event, idx) => (
        <div key={event.id || idx} className="relative pl-6">
          <span className="absolute -left-2.5 top-1">
            {getEventIcon(event.type)}
          </span>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
            <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
            <time className="text-xs text-gray-500 whitespace-nowrap">{new Date(event.date).toLocaleDateString()}</time>
          </div>
          <p className="text-sm text-gray-600">{event.description}</p>
          {event.metadata && (
            <div className="mt-2 bg-gray-50 rounded p-2 text-xs text-gray-600 border border-gray-100">
              {Object.entries(event.metadata).map(([k, v]) => (
                <span key={k} className="mr-3">
                  <strong className="font-medium capitalize">{k.replace('_', ' ')}:</strong> {String(v)}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
