import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import LandingPage from './routes/LandingPage';
import PlaygroundPage from './routes/PlaygroundPage';
import DocumentationPage from './routes/DocumentationPage';
import useAnimX from './hooks/useAnimX';

function App() {
  useAnimX();
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
}

export default App;
