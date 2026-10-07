import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  CheckCircle,
  Play,
  RotateCcw,
  Zap,
  Layers,
  ShieldAlert,
  Sliders,
  Copy,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LabInspector = () => {
  const {
    labInspectorOpen,
    setLabInspectorOpen,
    activeStep,
    setActiveStep,
    activeSteps,
    toggleStep,
    activateAllSteps,
    deactivateAllSteps,
    triggerSimulatedLoading,
    triggerSimulatedSuccess,
    triggerSimulatedError,
    statusMessage,
    responseTime
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);

  if (!labInspectorOpen) return null;

  const stepCodes = {
    1: `// PASO 1: Configuración de Entorno & Dependencias
// Vite + React 19 + react-router-dom + axios

// Estructura modular limpia del proyecto:
// src/
//   ├── components/  (Navbar, Footer, UserCard, LabInspector)
//   ├── context/     (AppContext para estado global)
//   ├── hooks/       (useUsers con AbortController)
//   ├── pages/       (Home, List, Form, NotFound)
//   ├── services/    (api.js cliente Axios)
//   └── index.css    (Design system con tokens y glassmorphism)`,

    2: `// PASO 2: Enrutamiento con React Router (BrowserRouter, Routes, Route, NavLink)
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Form from './pages/Form';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<List />} />
        <Route path="/form" element={<Form />} />
        {/* Manejo de rutas inexistentes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// Navbar con NavLink y feedback activo sin recargar la página:
<NavLink 
  to="/users" 
  className={({ isActive }) => (isActive ? 'active' : '')}
>
  Usuarios
</NavLink>`,

    3: `// PASO 3: Consumo de API con Axios + async/await en useEffect
// Regla de laboratorio - Uso de IA documentado:
// IA: useEffect se ejecuta 2 veces en desarrollo (StrictMode)
// Solución manual: usar AbortController para cancelar petición duplicada

import axios from 'axios';
import { useState, useEffect } from 'react';

export const useUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        });
        setData(res.data);
      } catch (err) {
        // Ignoramos cancelación manual de cleanup
        if (err.name !== 'CanceledError') {
          setError(err.message || 'Error al conectar con la API');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup con AbortController
    return () => controller.abort();
  }, []);

  return { data, loading, error };
};`,

    4: `// PASO 4: Renderizado Iterativo (.map con key) + Formulario Controlado con useState
import { useState } from 'react';

// Formulario controlado:
const [formData, setFormData] = useState({
  name: '',
  email: '',
  role: 'Developer'
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Validaciones y despacho reactivo
  addUserLocally(formData);
};

// Renderizado iterativo de lista con key único y estable:
<div className="grid">
  {users.map((user) => (
    <UserCard key={user.id} user={user} />
  ))}
</div>`,

    5: `// PASO 5: Integración y Auditoría de Red en DevTools
// Métricas en tiempo real:
// - Client-Side Rendering (CSR): 100% verificado sin parpadeo ni recargas
// - Network Waterfall: Peticiones paralelas optimizadas con cleanup
// - Estado sincronizado: Nuevos registros de formulario se inyectan en memoria
// - Evita renderizado innecesario tras fetch mediante dependencias estables`
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(stepCodes[activeStep] || '');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(5, 6, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Header modal */}
        <div
          style={{
            padding: '1.2rem 1.8rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(20, 24, 45, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ec4899, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Terminal size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Laboratorio Interactivo · Guía Semana 06
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Demostración paso a paso de los conceptos evaluados: Routing, Axios, Async/Await, AbortController y Formularios
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button onClick={activateAllSteps} className="btn btn-emerald btn-sm">
              <CheckCircle size={14} /> Activar Todos
            </button>
            <button onClick={deactivateAllSteps} className="btn btn-pink btn-sm">
              <RotateCcw size={14} /> Desactivar Todos
            </button>
            <button
              onClick={() => setLabInspectorOpen(false)}
              className="btn btn-glass btn-sm"
              style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content body split into 2 columns (simulating the teacher's screen layout) */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(360px, 1.3fr)',
            overflow: 'hidden'
          }}
        >
          {/* Left: Interactive Step Controls */}
          <div
            style={{
              padding: '1.5rem',
              overflowY: 'auto',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                padding: '1rem',
                borderRadius: '14px',
                background: activeStep === 1 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
                border: activeStep === 1 ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveStep(1)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: '#6366f1', fontSize: '0.9rem' }}>
                  Paso 1: Configurar Proyecto Vite + Axios + React Router
                </span>
                <span className="badge badge-purple">5 min</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Entorno configurado con dependencias de última generación y arquitectura limpia.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                padding: '1rem',
                borderRadius: '14px',
                background: activeStep === 2 ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.03)',
                border: activeStep === 2 ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveStep(2)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem' }}>
                  Paso 2: Enrutamiento SPA con &lt;BrowserRouter&gt;
                </span>
                <span className="badge badge-cyan">8 min</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Navegación client-side sin recargar páginas con <code>&lt;Routes&gt;</code>, <code>&lt;Route&gt;</code> y feedback visual con <code>NavLink isActive</code>.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                padding: '1.1rem',
                borderRadius: '14px',
                background: activeStep === 3 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255,255,255,0.03)',
                border: activeStep === 3 ? '1px solid #ec4899' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveStep(3)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: '#ec4899', fontSize: '0.9rem' }}>
                  Paso 3: Consumo de API con Axios + async/await
                </span>
                <span className="badge badge-pink">12 min</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.8rem' }}>
                Fetch asíncrono con manejo de estados loading/data/error, try/catch y AbortController.
              </p>
              {/* Botones de simulación como en las fotos */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerSimulatedLoading();
                  }}
                  className="btn btn-cyan btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  Simular Loading
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerSimulatedSuccess();
                  }}
                  className="btn btn-emerald btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  Simular Éxito
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerSimulatedError();
                  }}
                  className="btn btn-pink btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  Simular Error 500
                </button>
              </div>
              <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                <span>Estado actual: </span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{statusMessage}</span>
                {responseTime && <span style={{ color: '#10b981' }}> ({responseTime}ms)</span>}
              </div>
            </div>

            {/* Step 4 */}
            <div
              style={{
                padding: '1rem',
                borderRadius: '14px',
                background: activeStep === 4 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.03)',
                border: activeStep === 4 ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveStep(4)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.9rem' }}>
                  Paso 4: Renderizado Iterativo & Formulario
                </span>
                <span className="badge badge-amber">10 min</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Renderizado iterativo mediante <code>.map()</code> con keys únicas estables, y formulario controlado con <code>useState</code>.
              </p>
            </div>

            {/* Step 5 */}
            <div
              style={{
                padding: '1rem',
                borderRadius: '14px',
                background: activeStep === 5 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                border: activeStep === 5 ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveStep(5)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: '#10b981', fontSize: '0.9rem' }}>
                  Paso 5: Integración & Auditoría DevTools
                </span>
                <span className="badge badge-emerald">10 min</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                0 recargas completas de ventana, sin loops de renderizado y sincronización fluida entre vistas.
              </p>
            </div>
          </div>

          {/* Right: Code Viewer (as shown in the teacher's slides) */}
          <div
            style={{
              background: '#0d0f1b',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code2 size={18} color="#818cf8" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1' }}>
                  CÓDIGO FUENTE · PASO {activeStep}
                </span>
              </div>
              <button onClick={copyCodeToClipboard} className="btn btn-glass btn-sm" style={{ fontSize: '0.75rem' }}>
                {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copiado' : 'Copiar Código'}</span>
              </button>
            </div>

            <pre
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                background: 'rgba(0, 0, 0, 0.45)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: '#e2e8f0',
                fontSize: '0.84rem',
                lineHeight: '1.6'
              }}
            >
              <code>{stepCodes[activeStep]}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.8rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 17, 30, 0.85)'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Puedes interactuar con los botones de prueba en tiempo real para simular estados de carga o error.
          </div>
          <button onClick={() => setLabInspectorOpen(false)} className="btn btn-primary btn-sm">
            Entendido / Continuar en la Web
          </button>
        </div>
      </div>
    </div>
  );
};
