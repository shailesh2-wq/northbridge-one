import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Mail, Send, Inbox, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CommunicationsPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!user) return;
        const response = await api.getMessages(user.id);
        setMessages(response || []);
      } catch (error) {
        console.error("Error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [user]);

  const unreadCount = messages.filter(m => m.to_user_id === user?.id && !m.is_read).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6 h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <button className="w-full mb-6 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Mail className="w-4 h-4 mr-2" /> Compose
        </button>
        <nav className="space-y-1">
          <a href="#" className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            <Inbox className="w-4 h-4 mr-3" /> Inbox
            {unreadCount > 0 && <span className="ml-auto bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">{unreadCount}</span>}
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100">
            <Send className="w-4 h-4 mr-3" /> Sent
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100">
            <Star className="w-4 h-4 mr-3" /> Starred
          </a>
        </nav>
      </div>

      {/* Message List */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="font-semibold text-gray-900">Inbox</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading messages...</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {messages.map(msg => {
                const isUnread = msg.to_user_id === user.id && !msg.is_read;
                const userNames = {
                  1: 'Dr. James Chen',
                  2: 'Sarah Williams',
                  3: 'Ms. Priya Sharma',
                  4: 'Michael Torres',
                  5: 'David Morgan'
                };
                const senderName = userNames[msg.from_user_id] || `User ${msg.from_user_id}`;
                return (
                <div key={msg.id} className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 ${isUnread ? 'bg-blue-50/30' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-600 text-sm">
                    {senderName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className={`text-sm ${isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{senderName}</h4>
                      <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className={`text-sm truncate ${isUnread ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{msg.subject}</p>
                  </div>
                </div>
              )})}
              {messages.length === 0 && (
                <div className="p-12 text-center text-gray-500">No messages in your inbox.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
