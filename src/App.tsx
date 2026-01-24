import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage, DevWorkspace } from './pages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<DevWorkspace />} />
          <Route path="/workspace/:projectId" element={<DevWorkspace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
