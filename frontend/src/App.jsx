import { Routes, Route } from 'react-router-dom';
import HomePregnantUser from './views/HomePregnantUser';

function App() {
  return (
    <main className="main-side">
      <Routes>
        <Route path="/" element={<HomePregnantUser />} />
      </Routes>
    </main>
  );
}

export default App;
