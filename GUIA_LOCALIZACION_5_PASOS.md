# GUÍA DE LOCALIZACIÓN TÉCNICA: LOS 5 PASOS EN EL PROYECTO
## SEMANA 06: DESARROLLO DE APLICACIONES WEB (IS093A)

**Estudiante:** Juan Carlos Chahuayo Martinez  
**Ciclo:** 9no ciclo UNCP - FIS  
**Proyecto:** VetCare Plus · Clínica Veterinaria  
**Objetivo de este documento:** Detallar con precisión milimétrica en qué archivos, funciones y líneas de código se encuentra implementado cada uno de los **5 Pasos del Laboratorio**, y cómo se evidencia en la página web real.

---

## TABLA RESUMEN DE LOCALIZACIÓN

| Paso | Concepto Clave del Laboratorio | Archivos Principales | Líneas Clave |
| :--- | :--- | :--- | :--- |
| **Paso 1** | Configuración Vite, Dependencias y Árbol de Carpetas | `package.json`, `index.html`, estructura `src/` | `package.json` L12-L22 |
| **Paso 2** | Enrutamiento SPA con BrowserRouter, Routes y NavLink (isActive) | `src/App.jsx`, `src/components/Navbar.jsx` | `App.jsx` L16-L32, `Navbar.jsx` L54-L86 |
| **Paso 3** | Consumo de API con Axios, async/await y AbortController (Loading/Data/Error) | `src/services/api.js`, `src/hooks/useUsers.js`, `src/pages/List.jsx` | `api.js` L4-L24, `useUsers.js` L20-L84, `List.jsx` L98-L162 |
| **Paso 4** | Renderizado Iterativo (.map con key), Condicional (&&/ternario) y Formulario useState | `src/pages/List.jsx`, `src/components/UserCard.jsx`, `src/pages/Form.jsx` | `List.jsx` L170-L174, `UserCard.jsx` L30-L150, `Form.jsx` L24-L180 |
| **Paso 5** | Integración, Context API, Auditoría de Red DevTools y 0 Recargas | `src/context/AppContext.jsx`, `src/App.jsx`, `src/pages/Home.jsx` | `AppContext.jsx` L6-L55, `Home.jsx` L120-L185 |

---

## DETALLE PASO A PASO

---

### PASO 1: CONFIGURAR PROYECTO Y ESTRUCTURA MODULAR

#### 1. ¿Qué exigía el laboratorio?
- Crear el proyecto utilizando herramientas modernas (`npm create vite@latest`).
- Instalar dependencias esenciales: `react-router-dom` y `axios`.
- Establecer una arquitectura de carpetas limpia y desacoplada: `src/pages/`, `src/components/`, `src/services/`, `src/hooks/`, `src/context/`.
- **Restricción técnica:** No usar `HashRouter`, utilizar `BrowserRouter`.

#### 2. ¿Dónde está ubicado en el código?
1. **Dependencias:** En [package.json](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/package.json):
   ```json
   "dependencies": {
     "axios": "^1.14.0",
     "canvas-confetti": "^1.9.4",
     "lucide-react": "^1.16.0",
     "react": "^19.2.8",
     "react-dom": "^19.2.8",
     "react-router-dom": "^7.13.1"
   }
   ```
2. **Estructura de Carpetas:** En la raíz del proyecto `src/`:
   - `src/components/` -> Componentes visuales reutilizables (`Navbar.jsx`, `Footer.jsx`, `UserCard.jsx`, `ParticleBackground.jsx`).
   - `src/pages/` -> Vistas enrutadas (`Home.jsx`, `List.jsx`, `Form.jsx`, `NotFound.jsx`).
   - `src/services/` -> Capa de conexión HTTP (`api.js`).
   - `src/hooks/` -> Lógica desacoplada de ciclo de vida (`useUsers.js`).
   - `src/context/` -> Estado global reactivo (`AppContext.jsx`).

#### 3. ¿Cómo se evidencia en la página web?
- La aplicación carga de manera instantánea en `http://localhost:5174/` utilizando el contenedor semántico de [index.html](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/index.html) sin bloqueos de renderizado.

---

### PASO 2: ENRUTAMIENTO CLIENT-SIDE CON REACT ROUTER

#### 1. ¿Qué exigía el laboratorio?
- Implementar enrutamiento mediante `<BrowserRouter>`, `<Routes>`, `<Route>`.
- Crear las 4 páginas obligatorias: `Home`, `List` (Pacientes), `Form` (Registro), y `NotFound` (404).
- Usar `<NavLink>` con función `isActive` para aplicar retroalimentación visual al enlace actual.
- Garantizar que la navegación **no recargue la página web** (Client-Side Routing).

#### 2. ¿Dónde está ubicado en el código?
1. **Configuración del Router:** En [src/App.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/App.jsx#L16-L34):
   ```jsx
   <BrowserRouter>
     <Navbar />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/users" element={<List />} />
         <Route path="/form" element={<Form />} />
         <Route path="/404" element={<NotFound />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
     </main>
     <Footer />
   </BrowserRouter>
   ```
2. **Feedback Activo de Navegación:** En [src/components/Navbar.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/components/Navbar.jsx#L54-L86):
   ```jsx
   <NavLink
     to="/users"
     className={({ isActive }) => (isActive ? 'nav-item active-nav' : 'nav-item')}
   >
     <Users size={16} />
     <span>Pacientes & Staff</span>
   </NavLink>
   ```

#### 3. ¿Cómo se evidencia en la página web?
- Al hacer clic en los enlaces de la barra superior ("Inicio", "Pacientes & Staff", "Registrar Mascota", "Centro de Ayuda"), el contenido cambia inmediatamente sin parpadeo ni recarga del navegador.
- El enlace activo se resalta en un botón cápsula con fondo verde teal y texto blanco (`.active-nav`).
- Si se ingresa una URL inexistente como `http://localhost:5174/ruta-inexistente`, el enrutador muestra la vista 404 personalizada de la mascota extraviada sin que el servidor responda con error.

---

### PASO 3: CONSUMO DE API CON AXIOS, ASYNC/AWAIT Y ABORTCONTROLLER

#### 1. ¿Qué exigía el laboratorio?
- Consumo de API REST externa (`https://jsonplaceholder.typicode.com/users`) mediante Axios.
- Uso obligatorio de `async/await` con `try/catch` (estricta prohibición de encadenamientos `.then().catch()` anidados).
- Manejo explícito de 3 estados de UI: `loading`, `data` (éxito), `error`.
- Cancelación con `AbortController` en el `cleanup` de `useEffect` para evitar duplicación de peticiones en React StrictMode.

#### 2. ¿Dónde está ubicado en el código?
1. **Instancia Axios:** En [src/services/api.js](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/services/api.js#L4-L24):
   ```javascript
   const apiClient = axios.create({
     baseURL: 'https://jsonplaceholder.typicode.com',
     timeout: 10000
   });

   export const fetchUsersService = async (signal) => {
     const response = await apiClient.get('/users', { signal });
     return response.data;
   };
   ```
2. **Ciclo de vida y AbortController:** En [src/hooks/useUsers.js](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/hooks/useUsers.js#L20-L55):
   ```javascript
   // Regla de laboratorio - Uso de IA documentado:
   // IA: useEffect se ejecuta 2 veces en desarrollo (StrictMode)
   // Solución manual: usar AbortController para cancelar petición duplicada

   useEffect(() => {
     const controller = new AbortController();

     const fetchData = async () => {
       setLoading(true);
       try {
         const data = await fetchUsersService(controller.signal);
         setUsers(data);
       } catch (err) {
         if (!axios.isCancel(err) && err.name !== 'CanceledError') {
           setError(err.message);
         }
       } finally {
         setLoading(false);
       }
     };

     fetchData();
     return () => controller.abort(); // Cleanup esencial
   }, []);
   ```
3. **Manejo Visual de Estados en la UI:** En [src/pages/List.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/pages/List.jsx#L98-L162):
   - Estado `loading`: Renderiza el Spinner orbital y huella médica (L98-L128).
   - Estado `error`: Renderiza el banner de alerta médica con botón de reintento `refetch` (L131-L162).
   - Estado `data`: Renderiza las tarjetas de los pacientes.

#### 3. ¿Cómo se evidencia en la página web?
- Al ingresar a **"Pacientes & Staff"**, se aprecia una animación de carga suave mientras Axios consulta la API.
- Al pulsar el botón **"Actualizar Registros"**, se re-ejecuta la llamada asíncrona de manera imperceptible para el usuario.

---

### PASO 4: RENDERIZADO ITERATIVO (.map) Y FORMULARIO CONTROLADO CON useState

#### 1. ¿Qué exigía el laboratorio?
- Renderizado iterativo con `.map()` usando una propiedad `key` única y estable (prohibido usar index si la lista muta).
- Renderizado condicional mediante operadores lógicos `&&` y operadores ternarios `? :`.
- Formulario controlado mediante `useState` con eventos `onChange` y `onSubmit` previniendo la recarga con `e.preventDefault()`.

#### 2. ¿Dónde está ubicado en el código?
1. **Renderizado Iterativo:** En [src/pages/List.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/pages/List.jsx#L170-L174):
   ```jsx
   {filteredUsers.map((user) => (
     <UserCard key={user.id} user={user} />
   ))}
   ```
   *Se utiliza `user.id` único para garantizar estabilidad del reconciliador de React.*

2. **Renderizado Condicional:** En [src/components/UserCard.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/components/UserCard.jsx#L25-L135):
   - **Ternario:** Asignación dinámica del color del badge según el estado clínico (L25-L32).
   - **Operador `&&`:** Muestra la historia clínica extendida solo si el usuario pulsa *"Ficha Médica"* (`showMore && (...)`, L95-L130).

3. **Formulario Controlado con `useState`:** En [src/pages/Form.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/pages/Form.jsx#L24-L180):
   ```jsx
   const [formData, setFormData] = useState({
     name: 'Max',
     species: 'Canino (Golden Retriever)',
     owner: 'Carlos Mendoza',
     email: 'carlos.mendoza@email.com',
     phone: '+51 964 123 456',
     status: 'Vacunado al Día',
     city: 'Sede Central (El Tambo)',
     bio: 'Paciente dócil...'
   });

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e) => {
     e.preventDefault(); // Previene la recarga de página
     addUserLocally(formData); // Inyecta la mascota a la lista global
     setSubmitted(true);
   };
   ```

#### 3. ¿Cómo se evidencia en la página web?
- En la sección **"Registrar Mascota"**, al escribir en los inputs de nombre, dueño o especie, la tarjeta derecha (**Carnet Médico en Tiempo Real**) se actualiza automáticamente letra por letra.
- Al hacer clic en **"Registrar Mascota"**, se disparan partículas de confeti, aparece una notificación verde de éxito y se permite navegar directamente al directorio para ver al nuevo paciente en la lista.

---

### PASO 5: INTEGRACIÓN, AUDITORÍA DE RED Y CICLO DE VIDA DEL DOM

#### 1. ¿Qué exigía el laboratorio?
- Validar el flujo de datos sincronizado entre componentes.
- Auditar la red con las DevTools del navegador verificando que no existan peticiones duplicadas ni recargas completas.
- Evitar renderizados innecesarios tras el fetch.

#### 2. ¿Dónde está ubicado en el código?
1. **Sincronización Global sin Renderizados Innecesarios:** En [src/context/AppContext.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/context/AppContext.jsx#L6-L45):
   - Comparte las mascotas registradas en `/form` con el listado en `/users` sin requerir recargar la página ni consultar nuevamente la base de datos externa.
2. **Optimización con `useMemo`:** En [src/pages/List.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/pages/List.jsx#L27-L44):
   - Evita recomputar el filtrado de pacientes en renders ajenos al campo de búsqueda o selector de especies.
3. **Crédito Académico:** En [src/components/Footer.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%206/PRACTICA/src/components/Footer.jsx#L125-L140):
   - Se mantiene de forma elegante y discreta en el pie de página el crédito solicitado:
     `Juan Carlos Chahuayo Martinez • 9no ciclo UNCP - FIS`.

#### 3. ¿Cómo se comprueba en el navegador con DevTools?
1. Abre tu navegador y pulsa `F12` (Herramientas de Desarrollador).
2. Dirígete a la pestaña **Network** (Red) y filtra por `Fetch/XHR` o `Doc`.
3. Navega libremente por todos los enlaces del Navbar:
   - **Resultado:** Notarás que el documento `index.html` solo se descargó una sola vez (0 recargas de página). Todas las transiciones ocurren 100% en el cliente (CSR).
4. En la pestaña **Console** (Consola):
   - **Resultado:** No existe ningún warning de React sobre keys duplicadas ni errores no controlados.

---

*Documento técnico elaborado por: Juan Carlos Chahuayo Martinez · 9no ciclo UNCP - FIS*
