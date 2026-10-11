import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nb_token');
    const savedStudent = localStorage.getItem('nb_student_id');
    if (token) {
      api.setToken(token);
      api.getMe().then(u => {
        setUser(u);
        if (savedStudent) setStudentId(parseInt(savedStudent));
        setLoading(false);
      }).catch(() => { logout(); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email) => {
    const result = await api.login(email);
    api.setToken(result.token);
    setUser(result.user);
    if (result.student_id) {
      setStudentId(result.student_id);
      localStorage.setItem('nb_student_id', result.student_id);
    }
    return result;
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
    setStudentId(null);
    localStorage.removeItem('nb_student_id');
  };

  return (
    <AuthContext.Provider value={{ user, studentId, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
