import { Routes, Route } from 'react-router-dom';
import DiscussionPage from './views/discussionPage';

function App() {
  return (
    <main className="main-side">
      <Routes>
        <Route path="/" element={<DiscussionPage />} />
      </Routes>
    </main>
  );
}

export default App;
