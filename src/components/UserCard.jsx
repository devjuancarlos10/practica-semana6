import React, { useState } from 'react';
import { Mail, MapPin, Heart, Stethoscope, Phone, ShieldCheck, ChevronDown, ChevronUp, Calendar, Tag } from 'lucide-react';

export const UserCard = ({ user }) => {
  const [showMore, setShowMore] = useState(false);

  // Especies y razas de mascotas para la clínica
  const petSpecies = ['Canino (Golden Retriever)', 'Felino (Siamés)', 'Canino (Bulldog Francés)', 'Felino (Persa)', 'Canino (Pastor Alemán)', 'Exótico (Conejo Belier)'];
  const species = user.species || petSpecies[(user.id || 1) % petSpecies.length];

  const petAvatars = [
    '🐶', '🐱', '🐾', '🐕', '🐈', '🐇', '🦮', '🦜'
  ];
  const petIcon = petAvatars[(user.id || 1) % petAvatars.length];

  const statusList = ['Vacunado al Día', 'En Tratamiento', 'Control Preventivo', 'Alta Médica'];
  const status = user.status || statusList[(user.id || 1) % statusList.length];

  const getStatusBadge = () => {
    if (status.includes('Vacunado') || status.includes('Alta')) {
      return 'badge-emerald';
    }
    if (status.includes('Tratamiento')) {
      return 'badge-coral';
    }
    return 'badge-teal';
  };

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: '20px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: '#ffffff',
        border: user.isCustom ? '2px solid rgba(244, 63, 94, 0.3)' : '1px solid #e2e8f0',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(13, 148, 136, 0.18)';
        e.currentTarget.style.borderColor = '#0d9488';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = user.isCustom ? 'rgba(244, 63, 94, 0.3)' : '#e2e8f0';
      }}
    >
      {/* Top Banner Tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className={`badge ${getStatusBadge()}`} style={{ fontSize: '0.75rem' }}>
          {status}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: '#64748b',
            background: '#f1f5f9',
            padding: '0.2rem 0.5rem',
            borderRadius: '6px',
            fontWeight: 700
          }}
        >
          {user.isCustom ? 'CHIP-NUEVO' : `PACIENTE #${user.id}`}
        </span>
      </div>

      {/* Main Info */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: user.isCustom
              ? 'linear-gradient(135deg, #f43f5e, #fb7185)'
              : 'linear-gradient(135deg, #0d9488, #38bdf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
            flexShrink: 0
          }}
        >
          {user.isCustom ? '🐾' : petIcon}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {user.name}
          </h3>
          <span
            style={{
              fontSize: '0.82rem',
              color: '#0d9488',
              fontWeight: 700,
              display: 'block'
            }}
          >
            {species}
          </span>
        </div>
      </div>

      {/* Meta details list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          fontSize: '0.85rem',
          color: '#475569',
          marginBottom: '1.2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail size={15} color="#0284c7" style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Dueño: {user.email}
          </span>
        </div>

        {user.address && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={15} color="#f43f5e" style={{ flexShrink: 0 }} />
            <span style={{ color: '#64748b' }}>
              {typeof user.address === 'string'
                ? user.address
                : `Sede: ${user.address.city || ''}`}
            </span>
          </div>
        )}

        {/* Renderizado condicional con ternario/&& (requisito técnico del laboratorio) */}
        {showMore && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: '0.4rem',
              paddingTop: '0.75rem',
              borderTop: '1px dashed #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              fontSize: '0.82rem',
              color: '#475569',
              background: '#f8fafc',
              padding: '0.75rem',
              borderRadius: '12px'
            }}
          >
            {user.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Phone size={14} color="#d97706" />
                <span>Contacto Dueño: {user.phone}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Stethoscope size={14} color="#0d9488" />
              <span>Veterinario a cargo: Dr. Ricardo Morales</span>
            </div>
            {user.bio ? (
              <p style={{ marginTop: '0.2rem', color: '#334155', fontStyle: 'italic' }}>
                Historial: "{user.bio}"
              </p>
            ) : (
              <p style={{ marginTop: '0.2rem', color: '#64748b' }}>
                Historial: Paciente en seguimiento rutinario, sin alergias reportadas.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: '1px solid #f1f5f9'
        }}
      >
        <button
          onClick={() => setShowMore(!showMore)}
          className="btn btn-glass btn-sm"
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', gap: '0.35rem' }}
        >
          <span>{showMore ? 'Ocultar Ficha' : 'Ficha Médica'}</span>
          {showMore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <span
          style={{
            fontSize: '0.75rem',
            color: '#059669',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 6px #10b981'
            }}
          />
          Registrado
        </span>
      </div>
    </div>
  );
};
