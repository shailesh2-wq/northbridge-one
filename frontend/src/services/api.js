const API_BASE = '/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('nb_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('nb_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('nb_token');
  }

  async request(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) headers['X-User-Id'] = this.token;
    
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  }

  get(path) { return this.request(path); }
  post(path, data) { return this.request(path, { method: 'POST', body: JSON.stringify(data) }); }
  put(path, data) { return this.request(path, { method: 'PUT', body: JSON.stringify(data) }); }

  // Auth
  login(email) { return this.post('/auth/login', { email }); }
  getMe() { return this.get('/auth/me'); }
  getDemoAccounts() { return this.get('/auth/demo-accounts'); }

  // Dashboard
  getPrincipalDashboard() { return this.get('/dashboard/principal'); }
  getTeacherDashboard(teacherId) { return this.get(`/dashboard/teacher?teacher_id=${teacherId}`); }
  getAdminDashboard() { return this.get('/dashboard/admin'); }
  getParentDashboard(studentId) { return this.get(`/dashboard/parent/${studentId}`); }
  getFinanceDashboard() { return this.get('/dashboard/finance'); }

  // Students
  getStudents(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/students?${qs}`);
  }
  getStudent(id) { return this.get(`/students/${id}`); }
  getStudent360(id) { return this.get(`/students/${id}/360`); }

  // Signals
  getSignals(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/signals?${qs}`);
  }
  getSignal(id) { return this.get(`/signals/${id}`); }
  updateSignalStatus(id, status) { return this.put(`/signals/${id}/status?status=${status}&user_id=${this.token || 1}`); }
  assignSignal(id, userId) { return this.put(`/signals/${id}/assign?user_id=${userId}`); }
  getSignalsSummary() { return this.get('/signals/summary'); }

  // Assignments
  getAssignments(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/assignments?${qs}`);
  }

  // Interventions
  getInterventions(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/interventions?${qs}`);
  }
  createIntervention(data) { return this.post('/interventions', data); }
  updateIntervention(id, data) { return this.put(`/interventions/${id}`, data); }

  // Attendance
  getClassAttendance(grade, section, date) { return this.get(`/attendance/class/${grade}/${section}/${date}`); }
  markAttendance(data) { return this.post('/attendance/mark', data); }
  getAttendanceStats() { return this.get('/attendance/stats'); }

  // Communications
  getMessages(userId) { return this.get(`/communications?user_id=${userId}`); }
  sendMessage(data) { return this.post('/communications', data); }
  markRead(id) { return this.put(`/communications/${id}/read`); }
  getUnreadCount(userId) { return this.get(`/communications/unread-count?user_id=${userId}`); }

  // Search
  search(query) { return this.get(`/search?q=${encodeURIComponent(query)}`); }

  // Fees
  getFees(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/fees?${qs}`);
  }
  getFeeStats() { return this.get('/fees/stats'); }

  // Events
  getUpcomingEvents() { return this.get('/events/upcoming'); }

  // Timetable
  getTodaySchedule(grade, section) { return this.get(`/timetable/today/${grade}/${section}`); }
}

export const api = new ApiClient();
export default api;
