import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AttentionCard({ signal, onAction }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(signal.status || 'open');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await api.updateSignalStatus(signal.id, newStatus);
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(status);
    }
  };

  const handleDefaultAction = () => {
    const type = signal.signal_type;
    const entity = signal.entity_type;
    const title = signal.title || '';
    
    if (type === 'teacher_workload' || type === 'high_workload' || entity === 'staff' || title.toLowerCase().includes('workload') || title.toLowerCase().includes('staff')) {
      navigate(signal.id ? `/staff-workload/${signal.id}` : '/staff-workload');
    } else if (entity === 'student' && signal.entity_id) {
      navigate(`/students/${signal.entity_id}`);
    } else if (entity === 'intervention' || type === 'unresolved_intervention' || type === 'attendance_followup_overdue') {
      navigate(`/interventions`);
    } else if (entity === 'fee' || type === 'fee_overdue') {
      navigate(`/fees`);
    } else if (entity === 'communication' || type === 'communication_pending') {
      navigate(`/communications`);
    } else if (type === 'assignment_incomplete') {
      navigate(`/assignments`);
    } else {
      navigate(`/students`);
    }
  };

  const handleClick = () => {
    if (onAction) {
      onAction(signal);
    } else {
      handleDefaultAction();
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-500' };
      case 'high':
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: 'text-orange-500' };
      case 'medium':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'text-yellow-500' };
      default:
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'text-blue-500' };
    }
  };

  const getIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return <AlertCircle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getRecommendedAction = (type) => {
    switch(type) {
      case 'attendance_decline': return 'Review attendance history and contact parent.';
      case 'academic_decline': return 'Review recent assignments and schedule intervention.';
      case 'assignment_incomplete': return 'Follow up on missing work.';
      case 'repeated_late': return 'Discuss punctuality with student.';
      case 'behavioral_concern': return 'Review observation notes and escalate if needed.';
      case 'fee_overdue': return 'Send automated payment reminder.';
      case 'teacher_workload': return 'Review grading backlog and offer support.';
      case 'unresolved_intervention': return 'Check intervention status and follow up with assignee.';
      case 'attendance_followup_overdue': return 'Check attendance intervention status and follow up with assignee.';
      case 'communication_pending': return 'Reply to parent message.';
      default: return 'Review signal details and determine next steps.';
    }
  };

  const getReasons = (signal) => {
    const reasons = [];
    const data = signal.trigger_data || {};
    
    switch (signal.signal_type) {
      case 'attendance_decline':
        if (data.rate) reasons.push(`Attendance dropped to ${Math.round(data.rate * 100)}%`);
        reasons.push('Below the 85% school-wide threshold');
        reasons.push('Pattern observed over the last 4 weeks');
        break;
      case 'academic_decline':
        if (data.latest && data.previous) {
          reasons.push(`Score dropped by ${data.previous - data.latest} points between terms`);
        }
        reasons.push('Performance decline observed across consecutive assessments');
        reasons.push('Immediate risk to overall GPA requirements');
        break;
      case 'assignment_incomplete':
        if (data.count) reasons.push(`${data.count} assignments missed in the last 14 days`);
        reasons.push('Negatively impacting current term grading cycle');
        reasons.push('Previous teacher reminders were ineffective');
        break;
      case 'repeated_late':
        if (data.late_count) reasons.push(`${data.late_count} late arrivals recorded recently`);
        reasons.push('Occurred within a tight 2-week window');
        reasons.push('Interrupts morning homeroom schedule');
        break;
      case 'fee_overdue':
        reasons.push('Payment is past the due date by over 30 days');
        reasons.push('Multiple automated reminders have gone unresolved');
        reasons.push('Requires immediate follow-up to maintain enrollment status');
        break;
      case 'unresolved_intervention':
      case 'attendance_followup_overdue':
        reasons.push('Existing intervention has been open for >14 days');
        reasons.push('Assigned owner has not logged a recent outcome');
        reasons.push('Violates school operational response time SLA');
        break;
      case 'communication_pending':
        reasons.push('Message has been unread for more than 3 days');
        reasons.push('School policy mandates a 48-hour response time for parents');
        break;
      default:
        reasons.push('System identified an anomaly requiring review');
        reasons.push('Entity status requires manual verification');
    }
    
    return reasons.slice(0, 3);
  };

  const styles = getSeverityStyles(signal.severity);

  const getCategory = (type) => {
    if (type?.includes('attendance')) return 'Attendance';
    if (type?.includes('academic') || type?.includes('assignment')) return 'Academic';
    if (type?.includes('fee')) return 'Finance';
    if (type?.includes('teacher') || type?.includes('workload')) return 'Staff';
    if (type?.includes('behavioral')) return 'Student';
    if (type?.includes('intervention') || type?.includes('communication')) return 'Operations';
    return 'General';
  };

  return (
    <div className={`p-4 rounded-lg border ${styles.bg} ${styles.border} mb-3`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${styles.icon}`}>
          {getIcon(signal.severity)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`text-sm font-semibold ${styles.text} truncate`}>{signal.title}</h4>
            <div className="flex items-center text-xs text-gray-500 ml-2">
              <Clock className="w-3 h-3 mr-1" />
              {signal.timeAgo || 'Just now'}
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">{signal.explanation || signal.description}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
            <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 capitalize">
              Entity: {signal.entity_type || 'Student'}
            </span>
            <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
              Category: {getCategory(signal.signal_type)}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded border capitalize ${styles.bg} ${styles.border} ${styles.text}`}>
              Severity: {signal.severity || 'Medium'}
            </span>
            <select 
              value={status}
              onChange={handleStatusChange}
              className={`text-xs font-medium px-2 py-1 rounded border capitalize cursor-pointer outline-none appearance-none ${
                status === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>

          <div className="mb-4">
            <h5 className="text-sm font-semibold text-gray-900 mb-2">Why this needs attention</h5>
            <ul className="list-disc list-inside space-y-1">
              {getReasons(signal).map((reason, idx) => (
                <li key={idx} className="text-sm text-gray-700">{reason}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/60 p-2.5 rounded border border-white/50 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-gray-700">
              <span className="font-semibold text-gray-900 mr-2">Recommended Action:</span> 
              {getRecommendedAction(signal.signal_type)}
            </span>
            <button
              onClick={handleClick}
              className={`text-sm font-medium ${styles.text} flex items-center hover:underline whitespace-nowrap cursor-pointer`}
            >
              Take Action <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
