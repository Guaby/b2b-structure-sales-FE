import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Proposal } from './pages/Proposal';
import { Pipeline } from './pages/Pipeline';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { CreateLead } from './pages/CreateLead';
import { AnimatePresence } from './components/AnimatePresence';
import { Sidebar } from './components/Sidebar';
import { Chat } from './components/chat/Chat';

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-64">
          <SimpleBar className="h-screen" autoHide={false}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/proposals/:id" element={<Proposal />} />
                <Route path="/pipeline" element={<Pipeline />} />
                <Route path="/team" element={<Team />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-lead" element={<CreateLead />} />
              </Routes>
            </AnimatePresence>
          </SimpleBar>
        </main>
      </div>
      <Chat />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}