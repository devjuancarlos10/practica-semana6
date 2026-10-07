import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  RotateCw,
  AlertCircle,
  Filter,
  Plus,
  Stethoscope,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserCard } from '../components/UserCard';

export const List = () => {
  const {
    users,
    loading,
    error,
    refetch
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  // Filtrado reactivo en memoria
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.address &&
          (typeof u.address === 'string'
            ? u.address.toLowerCase().includes(searchQuery.toLowerCase())
            : u.address.city?.toLowerCase().includes(searchQuery.toLowerCase())));

      if (selectedFilter === 'ALL') return matchesSearch;
      if (selectedFilter === 'CUSTOM') return matchesSearch && u.isCustom;
      if (selectedFilter === 'API') return matchesSearch && !u.isCustom;
      return matchesSearch;
    });
  }, [users, searchQuery, selectedFilter]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2.2rem',
          borderRadius: '26px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          background: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-teal">Expedientes Médicos</span>
              <span className="badge badge-sky">Red Veterinaria Activa</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>
              Directorio de Pacientes & Mascotas
            </h1>
            <p style={{ color: '#475569', fontSize: '0.92rem' }}>
              Registro centralizado de animales de compañía, historias de vacunación, controles de salud y profesionales a cargo.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={refetch}
              className="btn btn-glass btn-sm"
              disabled={loading}
              title="Sincronizar expedientes médicos"
              style={{ padding: '0.7rem 1.2rem' }}
            >
              <RotateCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Actualizar Registros</span>
            </button>
            <Link to="/form" className="btn btn-coral btn-sm" style={{ padding: '0.7rem 1.4rem' }}>
              <Plus size={16} />
              <span>Registrar Mascota</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem',
          borderRadius: '20px',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          background: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              color="#94a3b8"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Buscar por nombre de mascota, dueño o ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={14} /> Filtro:
          </span>
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`btn btn-sm ${selectedFilter === 'ALL' ? 'btn-teal' : 'btn-glass'}`}
          >
            Todos ({users.length})
          </button>
          <button
            onClick={() => setSelectedFilter('CUSTOM')}
            className={`btn btn-sm ${selectedFilter === 'CUSTOM' ? 'btn-coral' : 'btn-glass'}`}
          >
            Nuevas Mascotas ({users.filter((u) => u.isCustom).length})
          </button>
          <button
            onClick={() => setSelectedFilter('API')}
            className={`btn btn-sm ${selectedFilter === 'API' ? 'btn-sky' : 'btn-glass'}`}
          >
            Pacientes Base ({users.filter((u) => !u.isCustom).length})
          </button>
        </div>
      </div>

      {/* Conditional UI States */}
      {/* 1. LOADING STATE */}
      {loading && (
        <div
          className="glass-panel"
          style={{
            padding: '4rem 2rem',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            background: '#ffffff',
            border: '2px dashed #99f6e4'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '4px solid #ccfbf1',
                borderTopColor: '#0d9488',
                borderRadius: '50%',
                animation: 'orbitSpin 1s linear infinite'
              }}
            />
            <span style={{ fontSize: '1.6rem' }}>🐾</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Cargando fichas de pacientes veterinarios...
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
              Sincronizando expedientes médicos con el servidor de la clínica
            </p>
          </div>
        </div>
      )}

      {/* 2. ERROR STATE */}
      {!loading && error && (
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            border: '1px solid #fecdd3',
            background: '#fff1f2',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: '#ffe4e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #fda4af'
              }}
            >
              <AlertCircle size={24} color="#e11d48" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#9f1239' }}>
                No fue posible conectar con el servidor
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#be123c' }}>
                {error}
              </p>
            </div>
          </div>

          <div>
            <button onClick={refetch} className="btn btn-teal btn-sm">
              <RotateCw size={15} />
              <span>Reintentar Conexión Médica</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. DATA STATE / RENDERIZADO ITERATIVO */}
      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                padding: '3rem',
                borderRadius: '24px',
                textAlign: 'center',
                color: '#64748b',
                background: '#ffffff'
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🔍</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                No encontramos pacientes que coincidan con "{searchQuery}"
              </p>
              <button onClick={() => setSearchQuery('')} className="btn btn-glass btn-sm">
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
