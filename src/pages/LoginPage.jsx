import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Crown, Settings, BookOpen, CreditCard, Users, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

const demoAccounts = [
  { email: 'principal@northbridge.edu', name: 'Dr. James Chen', role: 'Principal', desc: 'School-wide visibility and strategic oversight', icon: Crown },
  { email: 'admin@northbridge.edu', name: 'Sarah Williams', role: 'Administrator', desc: 'Operational management and coordination', icon: Settings },
  { email: 'teacher@northbridge.edu', name: 'Ms. Priya Sharma', role: 'Teacher', desc: 'Grade 8 — Mathematics & Science', icon: BookOpen },
  { email: 'finance@northbridge.edu', name: 'Michael Torres', role: 'Finance Manager', desc: 'Fee management and financial oversight', icon: CreditCard },
  { email: 'parent@northbridge.edu', name: 'David Morgan', role: 'Parent', desc: 'Parent of Alex Morgan, Grade 8B', icon: Users },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loadingEmail, setLoadingEmail] = useState(null);

  const handleLogin = async (email) => {
    try {
      setLoadingEmail(email);
      await login(email);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      // Fallback for demo without backend
      alert('Login failed. Ensure backend is running.');
    } finally {
      setLoadingEmail(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full">
      {/* Left Side (Branding / Hero) */}
      <div className="w-full lg:w-[50%] xl:w-[55%] bg-gradient-to-br from-primary-900 to-primary-700 p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white shrink-0">
        <div>
          <div className="flex items-center mb-8 lg:mb-16">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center text-primary-900 font-bold text-lg sm:text-xl mr-3 sm:mr-4 shadow-lg shrink-0">
              N
            </div>
            <span className="font-bold text-xl sm:text-2xl tracking-tight">NorthBridge One</span>
          </div>
          
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              One intelligent operating layer for the school.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-primary-100 mb-6 sm:mb-8 leading-relaxed">
              NorthBridge One unifies attendance, academics, behavior, and communications into actionable insights for every stakeholder.
            </p>
          </div>
        </div>
        
        <div className="text-primary-300 text-xs sm:text-sm font-medium pt-4 border-t border-primary-800/60 lg:border-t-0">
          Portfolio Prototype — NorthBridge International School (Fictional)
        </div>
      </div>

      {/* Right Side (Role Selection) */}
      <div className="w-full lg:w-[50%] xl:w-[45%] bg-surface flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-8 sm:py-12 overflow-y-auto flex-1">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1 sm:mb-2">Select a demo role</h2>
          <p className="text-xs sm:text-sm text-text-secondary mb-6 sm:mb-8">Choose a role to explore the platform</p>
          
          <div className="space-y-3 sm:space-y-4">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => handleLogin(account.email)}
                disabled={loadingEmail !== null}
                className={clsx(
                  "w-full text-left p-3.5 sm:p-4 rounded-xl border border-border bg-surface hover:border-primary-300 hover:shadow-md transition-all group flex items-start sm:items-center",
                  loadingEmail === account.email ? "opacity-70" : ""
                )}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mr-3 sm:mr-4 shrink-0 group-hover:bg-primary-100 transition-colors">
                  <account.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-sm sm:text-base text-text-primary truncate">{account.name}</h3>
                    <span className="text-[11px] sm:text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full shrink-0">
                      {account.role}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-snug line-clamp-2">{account.desc}</p>
                </div>
                <div className="ml-2 sm:ml-4 shrink-0 text-border group-hover:text-primary-500 transition-colors">
                  {loadingEmail === account.email ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
