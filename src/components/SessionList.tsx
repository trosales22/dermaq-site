import React from 'react';

const sessions = [
  { id: 1, title: 'Session 1: Skin Care Basics', description: 'Learn about skin care fundamentals.' },
  { id: 2, title: 'Session 2: Anti-Aging Tips', description: 'Tips for fighting signs of aging.' },
  { id: 3, title: 'Session 3: Acne Solutions', description: 'Effective acne treatments.' },
];

const SessionList: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <div key={session.id} className="card bg-base-100 shadow-xl">
          <div className="card-body text-black">
            <h2 className="card-title">{session.title}</h2>
            <p>{session.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
