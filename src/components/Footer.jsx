import React from 'react';
import { Heart, Phone, MapPin, Clock, Stethoscope, ShieldCheck, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 -4px 20px rgba(15, 23, 42, 0.03)'
      }}
    >
      {/* Decorative gradient top bar */}
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #0d9488, #0284c7, #f43f5e, #f59e0b, #10b981)',
          width: '100%'
        }}
      />

      <div
        style={{
          maxWidth: '1350px',
          margin: '0 auto',
          padding: '3rem 1.5rem 2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Col 1: Clínica Veterinaria Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '1.6rem' }}>🐾</span>
              <span style={{ fontWeight: 900, fontSize: '1.35rem', color: '#0f172a' }}>
                VetCare Plus
              </span>
              <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>Clínica Integral</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Dedicados al cuidado, bienestar y salud avanzada de tus mascotas. Contamos con quirófano moderno,
              laboratorio clínico, diagnóstico por imágenes y atención de emergencias las 24 horas del día.
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge badge-sky">Cirugía Menor y Mayor</span>
              <span className="badge badge-coral">Vacunación & Chip</span>
              <span className="badge badge-amber">Farmacia Veterinaria</span>
            </div>
          </div>

          {/* Col 2: Horarios y Contacto */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 800,
                color: '#0f172a',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Phone size={16} color="#0d9488" />
              <span>Atención & Citas</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={15} color="#0284c7" />
                <span>Lunes a Sábado: 8:00 AM - 8:00 PM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={15} color="#f43f5e" />
                <span style={{ color: '#e11d48', fontWeight: 600 }}>Urgencias y Hospitalización: 24 Horas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={15} color="#d97706" />
                <span>Av. Los Eucaliptos 450 • Central Veterinaria</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={15} color="#7c3aed" />
                <span>contacto@vetcareplus.pe</span>
              </div>
            </div>
          </div>

          {/* Col 3: Tecnologías de la SPA */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 800,
                color: '#0f172a',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Stethoscope size={16} color="#0d9488" />
              <span>Infraestructura Digital</span>
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.86rem', lineHeight: '1.55', marginBottom: '0.85rem' }}>
              Sistema de historias clínicas reactivas desarrollado con React 19, navegación continua con
              React Router 7, consultas asíncronas seguras con Axios y control de memoria vía AbortController.
            </p>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              <span className="badge badge-teal">⚡ Vite</span>
              <span className="badge badge-sky">⚛️ React 19</span>
              <span className="badge badge-purple">🌐 Axios</span>
              <span className="badge badge-coral">📋 useState Form</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: ONLY place with student credit and UNCP - FIS */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.84rem',
            color: '#64748b'
          }}
        >
          <div>
            © 2026 VetCare Plus Veterinaria. Todos los derechos reservados.
          </div>

          {/* CRÉDITO SOLICITADO: "solo algo pequelo en el footer de Juan carlos CHahuayo MArtinez, 9no ciclo UNCP - FIS" */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0d9488' }}></span>
            <span>Juan Carlos Chahuayo Martinez • 9no ciclo UNCP - FIS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
