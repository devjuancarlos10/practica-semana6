import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  FilePlus2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowRight,
  Mail,
  Heart,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Stethoscope,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Form = () => {
  const navigate = useNavigate();
  const { addUserLocally } = useApp();

  // Estados del Formulario Controlado con useState
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    owner: '',
    email: '',
    phone: '',
    city: '',
    status: '',
    bio: ''
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Reglas de validación exhaustiva por cada campo
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value || !value.trim()) {
          error = 'El nombre de la mascota es obligatorio.';
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres.';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          error = 'El nombre solo debe contener letras.';
        }
        break;

      case 'species':
        if (!value || !value.trim()) {
          error = 'Debe seleccionar la especie y raza de la mascota.';
        }
        break;

      case 'owner':
        if (!value || !value.trim()) {
          error = 'El nombre del tutor o dueño es obligatorio.';
        } else if (value.trim().length < 3) {
          error = 'El nombre del dueño debe tener al menos 3 caracteres.';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          error = 'El nombre del dueño solo debe contener letras y espacios.';
        }
        break;

      case 'email':
        if (!value || !value.trim()) {
          error = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Ingrese un correo electrónico válido (ej: tutor@correo.com).';
        }
        break;

      case 'phone':
        if (!value || !value.trim()) {
          error = 'El número de teléfono o celular es obligatorio.';
        } else {
          const digitsOnly = value.replace(/\D/g, '');
          if (digitsOnly.length < 9) {
            error = 'El número telefónico debe tener al menos 9 dígitos.';
          }
        }
        break;

      case 'city':
        if (!value || !value.trim()) {
          error = 'Debe indicar la sede o ciudad de atención.';
        } else if (value.trim().length < 3) {
          error = 'La sede debe contener al menos 3 caracteres.';
        }
        break;

      case 'status':
        if (!value || !value.trim()) {
          error = 'Debe seleccionar el estado clínico actual de la mascota.';
        }
        break;

      case 'bio':
        if (!value || !value.trim()) {
          error = 'El motivo de consulta o historial es obligatorio.';
        } else if (value.trim().length < 10) {
          error = 'Describa el motivo con al menos 10 caracteres.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validación completa de todo el formulario
  const validateAll = () => {
    const allErrors = {};
    const fieldKeys = ['name', 'species', 'owner', 'email', 'phone', 'city', 'status', 'bio'];

    fieldKeys.forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) {
        allErrors[key] = err;
      }
    });

    return allErrors;
  };

  // Manejo de cambio reactivo con validación inmediata
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Si el campo ya fue tocado o hay error previo, re-validar al tipear
    if (touched[name] || errors[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  // Manejo al perder foco (onBlur) para validación profesional campo por campo
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recarga en la SPA

    // Marcamos todos como tocados
    setTouched({
      name: true,
      species: true,
      owner: true,
      email: true,
      phone: true,
      city: true,
      status: true,
      bio: true
    });

    const validationErrors = validateAll();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si todo es válido: inyectar al estado global
    addUserLocally({
      name: `${formData.name} (${formData.owner})`,
      species: formData.species,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      address: { city: formData.city },
      bio: formData.bio,
      company: { name: 'Ficha Clínica VetCare' }
    });

    setSubmitted(true);
    setSuccessToast(true);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignorar si no está soportado
    }

    setTimeout(() => {
      setSuccessToast(false);
    }, 4500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      species: '',
      owner: '',
      email: '',
      phone: '',
      city: '',
      status: '',
      bio: ''
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  // Cargar datos de prueba rápidos
  const handleLoadSample = () => {
    setFormData({
      name: 'Max',
      species: 'Canino (Golden Retriever)',
      owner: 'Carlos Mendoza',
      email: 'carlos.mendoza@email.com',
      phone: '+51 964 123 456',
      city: 'Sede Central (El Tambo)',
      status: 'Vacunado al Día',
      bio: 'Paciente dócil, acude para control anual de vacunas y desparasitación preventiva.'
    });
    setErrors({});
    setTouched({});
  };

  const getInputStyle = (fieldName) => {
    if (errors[fieldName] && touched[fieldName]) {
      return { borderColor: '#f43f5e', backgroundColor: '#fff1f2' };
    }
    if (!errors[fieldName] && touched[fieldName] && formData[fieldName]) {
      return { borderColor: '#10b981', backgroundColor: '#f0fdf4' };
    }
    return {};
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2.2rem',
          borderRadius: '26px',
          background: '#ffffff',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-coral">Servicio de Admisión</span>
              <span className="badge badge-teal">Validación en Tiempo Real</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.4rem' }}>
              Registro de Mascota & Emisión de Carnet
            </h1>
            <p style={{ color: '#475569', fontSize: '0.92rem', maxWidth: '850px' }}>
              Complete todos los datos requeridos. Cada campo es validado de forma reactiva para asegurar la integridad de la historia clínica.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLoadSample}
            className="btn btn-glass btn-sm"
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
          >
            <Sparkles size={14} color="#0d9488" />
            <span>Cargar Datos de Ejemplo</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            padding: '1.25rem 1.75rem',
            borderRadius: '18px',
            border: '2px solid #a7f3d0',
            background: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle2 size={22} color="#fff" />
            </div>
            <div>
              <h4 style={{ color: '#065f46', fontWeight: 800, fontSize: '1rem' }}>
                ¡Carnet emitido con éxito!
              </h4>
              <p style={{ color: '#047857', fontSize: '0.85rem' }}>
                La mascota <strong>{formData.name}</strong> ha sido registrada en el sistema de la clínica.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/users')}
            className="btn btn-teal btn-sm"
          >
            <span>Ver en Directorio</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Main Grid: Form + Live Medical Carnet Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Left: Controlled Form */}
        <div
          className="glass-panel"
          style={{
            padding: '2.2rem',
            borderRadius: '24px',
            background: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📋</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                Datos de la Mascota y Tutor
              </h2>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>* Campos obligatorios</span>
          </div>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            {/* 1. Nombre Mascota */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="name" style={{ margin: 0 }}>
                  1. Nombre de la Mascota *
                </label>
                {touched.name && !errors.name && formData.name && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ej: Max, Luna, Toby..."
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                style={getInputStyle('name')}
              />
              {errors.name && touched.name && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.name}
                </span>
              )}
            </div>

            {/* 2. Especie y Raza */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="species" style={{ margin: 0 }}>
                  2. Especie & Raza *
                </label>
                {touched.species && !errors.species && formData.species && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <select
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-select"
                style={getInputStyle('species')}
              >
                <option value="">-- Seleccione especie y raza --</option>
                <option value="Canino (Golden Retriever)">Canino • Golden Retriever</option>
                <option value="Canino (Bulldog Francés)">Canino • Bulldog Francés</option>
                <option value="Canino (Pastor Alemán)">Canino • Pastor Alemán</option>
                <option value="Canino (Poodle / Puddle)">Canino • Poodle</option>
                <option value="Felino (Siamés)">Felino • Siamés</option>
                <option value="Felino (Persa)">Felino • Persa</option>
                <option value="Felino (Común Europeo)">Felino • Común Europeo</option>
                <option value="Exótico (Conejo Belier)">Exótico • Conejo Belier</option>
                <option value="Exótico (Ave / Loro)">Exótico • Ave de compañía</option>
              </select>
              {errors.species && touched.species && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.species}
                </span>
              )}
            </div>

            {/* 3. Nombre del Dueño */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="owner" style={{ margin: 0 }}>
                  3. Nombre del Dueño / Tutor *
                </label>
                {touched.owner && !errors.owner && formData.owner && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <input
                id="owner"
                type="text"
                name="owner"
                placeholder="Ej: Carlos Mendoza"
                value={formData.owner}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                style={getInputStyle('owner')}
              />
              {errors.owner && touched.owner && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.owner}
                </span>
              )}
            </div>

            {/* 4. Correo Electrónico */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="email" style={{ margin: 0 }}>
                  4. Correo Electrónico del Tutor *
                </label>
                {touched.email && !errors.email && formData.email && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="tutor@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                style={getInputStyle('email')}
              />
              {errors.email && touched.email && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.email}
                </span>
              )}
            </div>

            {/* 5. Teléfono */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="phone" style={{ margin: 0 }}>
                  5. Teléfono de Contacto *
                </label>
                {touched.phone && !errors.phone && formData.phone && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Ej: +51 987 654 321 (mínimo 9 dígitos)"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                style={getInputStyle('phone')}
              />
              {errors.phone && touched.phone && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.phone}
                </span>
              )}
            </div>

            {/* 6. Sede / Ciudad */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="city" style={{ margin: 0 }}>
                  6. Sede / Ciudad de Atención *
                </label>
                {touched.city && !errors.city && formData.city && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Ej: Sede Central (El Tambo), Huancayo..."
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                style={getInputStyle('city')}
              />
              {errors.city && touched.city && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.city}
                </span>
              )}
            </div>

            {/* 7. Estado Clínico */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="status" style={{ margin: 0 }}>
                  7. Estado Clínico Actual *
                </label>
                {touched.status && !errors.status && formData.status && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-select"
                style={getInputStyle('status')}
              >
                <option value="">-- Seleccione estado clínico --</option>
                <option value="Vacunado al Día">Vacunado al Día</option>
                <option value="Control Preventivo">Control Preventivo</option>
                <option value="En Tratamiento">En Tratamiento Médico</option>
                <option value="Alta Médica">Alta Médica</option>
              </select>
              {errors.status && touched.status && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.status}
                </span>
              )}
            </div>

            {/* 8. Motivo Consulta / Historial */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="bio" style={{ margin: 0 }}>
                  8. Motivo de Consulta / Historial Médico *
                </label>
                {touched.bio && !errors.bio && formData.bio && (
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={13} /> Válido
                  </span>
                )}
              </div>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                placeholder="Describa el motivo de la consulta, síntomas, alergias o vacunas previas (mínimo 10 caracteres)..."
                value={formData.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-textarea"
                style={{ resize: 'vertical', ...getInputStyle('bio') }}
              />
              {errors.bio && touched.bio && (
                <span style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={14} /> {errors.bio}
                </span>
              )}
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn btn-teal"
                style={{ flex: 1, padding: '0.95rem' }}
              >
                <Send size={16} />
                <span>Registrar Mascota</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-glass"
                style={{ padding: '0.95rem 1.4rem' }}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Medical Carnet Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            className="glass-panel"
            style={{
              padding: '1.8rem',
              borderRadius: '24px',
              background: '#ffffff',
              border: '2px solid #ccfbf1',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={18} color="#0d9488" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  Carnet Médico en Tiempo Real
                </h3>
              </div>
              <span className="badge badge-teal">Chip Activo</span>
            </div>

            {/* Carnet Card */}
            <div
              style={{
                borderRadius: '20px',
                padding: '1.6rem',
                background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #fef2f2 100%)',
                border: '1px solid #99f6e4',
                boxShadow: '0 8px 24px rgba(13, 148, 136, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>🐾</span>
                  <span style={{ fontWeight: 900, color: '#0f766e', fontSize: '1.1rem' }}>VETCARE PASSPORT</span>
                </div>
                <span className="badge badge-coral" style={{ fontSize: '0.72rem' }}>
                  {formData.status || 'Pendiente de Control'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #0d9488, #38bdf8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)',
                    flexShrink: 0
                  }}
                >
                  🐶
                </div>
                <div>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a' }}>
                    {formData.name || 'Nombre Mascota'}
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: 700 }}>
                    {formData.species || 'Especie / Raza no especificada'}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
                <div><strong>Dueño / Tutor:</strong> {formData.owner || '—'}</div>
                <div><strong>Correo:</strong> {formData.email || '—'}</div>
                <div><strong>Teléfono:</strong> {formData.phone || '—'}</div>
                <div><strong>Sede de Atención:</strong> {formData.city || '—'}</div>
              </div>

              {formData.bio ? (
                <p style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic', background: '#ffffff', padding: '0.65rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  "{formData.bio}"
                </p>
              ) : (
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic', background: '#ffffff', padding: '0.65rem', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                  Aún no se ha redactado el motivo de consulta.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
