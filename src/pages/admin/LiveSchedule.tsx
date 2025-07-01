import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

// LiveSession type definition
interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  enrolled: number;
  maxStudents: number;
  status: 'upcoming' | 'live' | 'completed';
}

interface LiveScheduleProps {
  liveSessions?: LiveSession[];
  onScheduleClass?: () => void;
  onDeleteSession?: (sessionId: string) => void;
}

// Mock data for demonstration
const mockLiveSessions: LiveSession[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    instructor: 'John Smith',
    date: '2025-06-28',
    time: '10:00 AM',
    duration: '2 hours',
    enrolled: 15,
    maxStudents: 20,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    instructor: 'Sarah Johnson',
    date: '2025-06-28',
    time: '2:00 PM',
    duration: '1.5 hours',
    enrolled: 12,
    maxStudents: 15,
    status: 'live'
  },
  {
    id: '3',
    title: 'Node.js Backend',
    instructor: 'Mike Wilson',
    date: '2025-06-27',
    time: '9:00 AM',
    duration: '3 hours',
    enrolled: 18,
    maxStudents: 25,
    status: 'completed'
  }
];

const LiveSchedule: React.FC<LiveScheduleProps> = ({
  liveSessions = mockLiveSessions,
  onScheduleClass = () => console.log('Schedule class clicked'),
  onDeleteSession = (id) => console.log('Delete session:', id),
}) => {
  // Ensure liveSessions is always an array
  const sessions = Array.isArray(liveSessions) ? liveSessions : [];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Live Class Schedule</h2>
        <button
          onClick={onScheduleClass}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Schedule Class</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">{session.title}</h3>
              <div className="flex space-x-2">
                <button 
                  className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                  onClick={() => console.log('Edit session:', session.id)}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteSession(session.id)}
                  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Instructor:</span>
                <span className="font-medium text-gray-900">{session.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium text-gray-900">{session.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium text-gray-900">{session.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium text-gray-900">{session.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Enrolled:</span>
                <span className="font-medium text-gray-900">
                  {session.enrolled}/{session.maxStudents}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  session.status === "upcoming"
                    ? "bg-green-100 text-green-800"
                    : session.status === "live"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {session.status}
              </span>
              
              {session.status === 'live' && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-600 font-medium">LIVE</span>
                </div>
              )}
            </div>

            {session.status === 'upcoming' && (
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Join Class
              </button>
            )}
          </div>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled classes</h3>
          <p className="text-gray-500 mb-4">Get started by scheduling your first live class.</p>
          <button
            onClick={onScheduleClass}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Schedule Class
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveSchedule;