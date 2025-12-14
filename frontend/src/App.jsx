import { Routes, Route } from 'react-router-dom';
import HomePregnantUser from './views/HomePregnantUser';
import DiagnosisPage from './views/DiagnosisPage';

function App() {
  return (
    <main className="main-side">
      <Routes>
        <Route path="/" element={<HomePregnantUser />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
      </Routes>
    </main>
  );
}

export default App;
