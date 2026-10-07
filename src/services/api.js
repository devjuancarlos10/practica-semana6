import axios from 'axios';

// Instancia configurada de Axios para el servicio de usuarios
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

/**
 * Obtiene la lista de usuarios mediante Axios soportando AbortController signal
 * Cumple con el estándar de la práctica: async/await y sin .then().catch() anidados
 */
export const fetchUsersService = async (signal) => {
  const response = await apiClient.get('/users', { signal });
  return response.data;
};

/**
 * Simulación de error 500 para evaluar el manejo de estados de la UI (Paso 3 del laboratorio)
 */
export const simulateApiErrorService = async () => {
  // Simulamos una demora y un error explícito de red/servidor
  await new Promise((resolve) => setTimeout(resolve, 800));
  const customError = new Error('ERR_CONNECTION_FAILED: 500 Internal Server Error en el Gateway de Usuarios');
  customError.response = { status: 500, statusText: 'Internal Server Error' };
  throw customError;
};

export default apiClient;
