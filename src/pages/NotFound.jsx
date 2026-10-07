import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, AlertCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        textAlign: 'center',
        gap: '1.75rem',
        padding: '2rem'
      }}
    >
      {/* 404 Animated Badge */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '4rem' }}>🐕</span>
          <div
            style={{
              fontSize: 'clamp(5rem, 14vw, 7.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #0d9488 0%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            404
          </div>
          <span style={{ fontSize: '4rem' }}>❓</span>
        </div>
      </div>

      <div style={{ maxWidth: '580px' }}>
        <div
          className="badge badge-coral"
          style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
        >
          <AlertCircle size={16} /> Ruta Fuera del Hospital Veterinario
        </div>
        <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>
          ¡Ups! Esta página se ha extraviado
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
          La dirección a la que intentas ingresar no existe en nuestra clínica digital.
          No te preocupes, nuestra SPA interceptó la solicitud sin romper la conexión con el servidor.
        </p>
      </div>

      {/* Action Navigation Buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-teal" style={{ padding: '0.85rem 1.7rem' }}>
          <Home size={18} />
          <span>Volver al Inicio</span>
        </Link>
        <Link to="/users" className="btn btn-glass" style={{ padding: '0.85rem 1.7rem' }}>
          <Compass size={18} />
          <span>Ver Fichas Médicas</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
