import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { fetchUsersService, simulateApiErrorService } from '../services/api';

/**
 * Custom Hook: useUsers
 * Gestiona el ciclo de vida del consumo de API con Axios, async/await y AbortController.
 * Documentación de laboratorio:
 * // IA: useEffect se ejecuta 2 veces en desarrollo (StrictMode)
 * // Solución manual: usar AbortController para cancelar peticiones duplicadas y limpiar en el return.
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Iniciando sincronización...');
  const [responseTime, setResponseTime] = useState(null);
  const abortControllerRef = useRef(null);

  // Carga inicial o recarga
  const loadUsers = useCallback(async (forcedMode = 'normal') => {
    // Si hay una petición en curso, cancelarla antes de la nueva
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setStatusMessage('Cargando usuarios desde API... GET https://jsonplaceholder.typicode.com/users');
    const startTime = performance.now();

    try {
      if (forcedMode === 'error') {
        // Simulación de error 500 para la práctica de laboratorio
        await simulateApiErrorService();
      } else {
        const data = await fetchUsersService(controller.signal);
        setUsers(data);
        setStatusMessage('Datos cargados exitosamente (200 OK)');
      }
    } catch (err) {
      // Ignorar cancelaciones intencionadas por desmontaje o nuevo fetch
      if (axios.isCancel(err) || err.name === 'CanceledError' || err.name === 'AbortError') {
        return;
      }
      setError(err.message || 'Error de conexión con la API de usuarios');
      setStatusMessage('Fallo en la comunicación con el servidor');
    } finally {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setLoading(false);
    }
  }, []);

  // Simular estado de carga prolongado (para validar Spinners en la práctica)
  const triggerSimulatedLoading = useCallback(() => {
    setLoading(true);
    setStatusMessage('Simulación de carga prolongada activa (Testing de UI)...');
    setTimeout(() => {
      setLoading(false);
      setStatusMessage('Carga simulada finalizada.');
    }, 2500);
  }, []);

  // Simular éxito inmediato
  const triggerSimulatedSuccess = useCallback(() => {
    loadUsers('normal');
  }, [loadUsers]);

  // Simular error 500 inmediato
  const triggerSimulatedError = useCallback(() => {
    loadUsers('error');
  }, [loadUsers]);

  // Agregar nuevo usuario de forma reactiva (generado desde el formulario controlado)
  const addUserLocally = useCallback((newUser) => {
    setUsers((prev) => [
      {
        ...newUser,
        id: prev.length ? Math.max(...prev.map((u) => u.id || 0)) + 1 : 1,
        isCustom: true
      },
      ...prev
    ]);
  }, []);

  useEffect(() => {
    loadUsers('normal');

    // Cleanup con AbortController para prevenir memory leaks y doble petición en StrictMode
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    statusMessage,
    responseTime,
    refetch: () => loadUsers('normal'),
    triggerSimulatedLoading,
    triggerSimulatedSuccess,
    triggerSimulatedError,
    addUserLocally
  };
};
