import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Stethoscope, Sparkles, Users, FilePlus2, HelpCircle } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div
        style={{
          maxWidth: '1350px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        {/* Brand / Logo */}
        <NavLink
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(13, 148, 136, 0.35)',
              transform: 'rotate(-3deg)'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>🐾</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                VetCare
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
                  color: '#ffffff'
                }}
              >
                PLUS
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.02em' }}>
              CLÍNICA & HOSPITAL VETERINARIO
            </div>
          </div>
        </NavLink>

        {/* Navigation Links with isActive */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#f1f5f9',
            padding: '0.35rem 0.5rem',
            borderRadius: '9999px',
            border: '1px solid #e2e8f0'
          }}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-item active-nav' : 'nav-item')}
          >
            <Sparkles size={16} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? 'nav-item active-nav' : 'nav-item')}
          >
            <Users size={16} />
            <span>Pacientes & Staff</span>
          </NavLink>

          <NavLink
            to="/form"
            className={({ isActive }) => (isActive ? 'nav-item active-nav' : 'nav-item')}
          >
            <FilePlus2 size={16} />
            <span>Registrar Mascota</span>
          </NavLink>

          <NavLink
            to="/404"
            className={({ isActive }) => (isActive ? 'nav-item active-nav' : 'nav-item')}
          >
            <HelpCircle size={16} />
            <span>Centro de Ayuda</span>
          </NavLink>
        </nav>

        {/* Right Badge: Urgencias 24h */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            className="badge badge-teal"
            style={{ display: 'flex', alignItems: 'center', padding: '0.45rem 0.95rem' }}
          >
            <Heart size={14} className="animate-heartbeat" color="#0d9488" fill="#0d9488" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Urgencias 24 Horas</span>
          </div>

          <a
            href="tel:+51964123456"
            className="btn btn-coral btn-sm"
            style={{ borderRadius: '9999px', padding: '0.45rem 1rem', fontSize: '0.82rem' }}
          >
            <Stethoscope size={14} />
            <span>Llamar a Clínica</span>
          </a>
        </div>
      </div>

      <style>{`
        .nav-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.1rem;
          color: #475569;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: 9999px;
          transition: all 0.25s ease;
        }
        .nav-item:hover {
          color: #0d9488;
          background: #ffffff;
        }
        .nav-item.active-nav {
          background: #0d9488;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.35);
        }
      `}</style>
    </header>
  );
};
