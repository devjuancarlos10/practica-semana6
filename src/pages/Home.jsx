import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Stethoscope,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  Activity,
  Award,
  CalendarCheck,
  Syringe,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Home = () => {
  const { users } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '4.5rem 2.5rem',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 50%, #eff6ff 100%)',
          border: '1px solid #ccfbf1',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Decorative Floating Circles */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-8%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '15%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}>
          {/* Top Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              background: '#ffffff',
              border: '1px solid #99f6e4',
              boxShadow: '0 2px 10px rgba(13, 148, 136, 0.12)',
              marginBottom: '1.5rem'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🐾</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f766e' }}>
              Atención Veterinaria de Primera Línea • Medicina Preventiva & Quirúrgica
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.1rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              marginBottom: '1.5rem'
            }}
          >
            El Mayor Amor para tu Mascota, <br />
            <span className="gradient-text">la Mejor Ciencia Médica</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
              color: '#475569',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
              maxWidth: '720px'
            }}
          >
            En <strong>VetCare Plus</strong> nos apasiona la salud y el bienestar de los animales.
            Ofrecemos diagnóstico digital, historias clínicas inmediatas, vacunación, laboratorio clínico y atención de urgencias
            con especialistas médicos altamente capacitados.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/users" className="btn btn-teal" style={{ padding: '0.95rem 1.8rem', fontSize: '1rem' }}>
              <Users size={18} />
              <span>Ver Pacientes ({users.length})</span>
              <ArrowRight size={18} />
            </Link>

            <Link to="/form" className="btn btn-coral" style={{ padding: '0.95rem 1.8rem', fontSize: '1rem' }}>
              <Heart size={18} fill="#fff" />
              <span>Registrar Mascota</span>
            </Link>

            <a
              href="tel:+51964123456"
              className="btn btn-glass"
              style={{ padding: '0.95rem 1.6rem', fontSize: '0.95rem' }}
            >
              <PhoneCall size={18} color="#0d9488" />
              <span>Contactar Especialista</span>
            </a>
          </div>
        </div>
      </section>

      {/* Real-time Status & Metrics Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: '1.75rem',
            borderRadius: '20px',
            borderLeft: '5px solid #0d9488',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>
              Historias Clínicas
            </span>
            <Activity size={20} color="#0d9488" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.3rem' }}>
            100% Digitales
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Expedientes médicos actualizados en tiempo real para consultas y seguimientos.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '1.75rem',
            borderRadius: '20px',
            borderLeft: '5px solid #0284c7',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase' }}>
              Pacientes Activos
            </span>
            <Users size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.3rem' }}>
            {users.length} Registros
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Monitoreo preventivo y controles periódicos de salud animal.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '1.75rem',
            borderRadius: '20px',
            borderLeft: '5px solid #f43f5e',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase' }}>
              Urgencias Médicas
            </span>
            <Heart size={20} color="#f43f5e" fill="#f43f5e" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.3rem' }}>
            24 / 7
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Guardia médica permanente para emergencias traumatológicas y quirúrgicas.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '1.75rem',
            borderRadius: '20px',
            borderLeft: '5px solid #f59e0b',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
              Infraestructura
            </span>
            <Award size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.3rem' }}>
            Quirófano Integral
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Equipos de anestesia inhalatoria, ecografía y rayos X de alta resolución.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.4rem' }}>
            Servicios Clínicos Especializados
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Todo lo que tu mascota necesita en un solo centro médico veterinario.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {/* Service 1 */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '24px',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(13, 148, 136, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
                border: '1px solid rgba(13, 148, 136, 0.25)'
              }}
            >
              <Stethoscope size={24} color="#0d9488" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
              Consulta & Medicina Preventiva
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.2rem' }}>
              Chequeos generales periódicos, control de peso, nutrición clínica personalizada y
              diagnóstico precoz de patologías cardíacas y renales.
            </p>
            <Link to="/users" style={{ color: '#0d9488', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Explorar pacientes activos</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Service 2 */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '24px',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(244, 63, 94, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
                border: '1px solid rgba(244, 63, 94, 0.25)'
              }}
            >
              <Syringe size={24} color="#f43f5e" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
              Plan de Vacunación & Microchip
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.2rem' }}>
              Esquemas completos de inmunización sérica (quíntuple, séxtuple, antirrábica, triple felina)
              e implantación de microchip homologado internacional.
            </p>
            <Link to="/form" style={{ color: '#f43f5e', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Registrar nueva mascota</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Service 3 */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '24px',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(2, 132, 199, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
                border: '1px solid rgba(2, 132, 199, 0.25)'
              }}
            >
              <ShieldCheck size={24} color="#0284c7" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
              Cirugía & Hospitalización
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.2rem' }}>
              Quirófano estéril equipado con anestesia inhalatoria, monitoreo multiparamétrico y área
              de recuperación climatizada con atención médica permanente.
            </p>
            <Link to="/form" style={{ color: '#0284c7', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Agendar evaluación médica</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
