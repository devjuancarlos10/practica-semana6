import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import Home from './pages/Home';
import List from './pages/List';
import Form from './pages/Form';
import NotFound from './pages/NotFound';

/**
 * Aplicación Clínica Veterinaria: VetCare Plus
 * Single Page Application con React Router, Axios y estado reactivo.
 */
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Fondo suave con partículas interactivas */}
          <ParticleBackground />

          {/* Navegación principal */}
          <Navbar />

          {/* Contenido enrutado dinámicamente sin recargas */}
          <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<List />} />
              <Route path="/form" element={<Form />} />
              <Route path="/404" element={<NotFound />} />
              {/* Ruta comodín para capturar URLs inexistentes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Pie de página con datos de contacto y créditos */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
