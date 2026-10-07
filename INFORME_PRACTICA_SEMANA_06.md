# INFORME DE LABORATORIO: GUÍA PRÁCTICA SEMANA 06
## DESARROLLO DE APLICACIONES WEB (IS093A)

**Estudiante:** Juan Carlos Chahuayo Martinez  
**Ciclo:** 9no ciclo UNCP - FIS  
**Tema:** Framework JS: Eventos, Renderizado Condicional/Iterativo, Formularios, Routing y Consumo de APIs (Async/Await, Axios)  
**Herramientas:** Visual Studio Code + Vite + React 19 + React Router + Axios  
**Proyecto:** VetCare Plus · Sistema de Fichas Médicas y Clínica Veterinaria  
**URL Local:** `http://localhost:5174/`  
**Repositorio GitHub:** `https://github.com/tu-usuario/practica-semana-06` *(Reemplazar con tu enlace)*  

---

## ESTRUCTURA DEL INFORME CON GUÍA DE CAPTURAS DE PANTALLA

Este informe describe los **5 Pasos Fundamentales** desarrollados en el laboratorio, indicando exactamente **dónde, qué archivo abrir en Visual Studio Code** y **qué vista capturar en el Navegador Web** para cada paso.

---

# PASO 1: CONFIGURAR PROYECTO Y ESTRUCTURA DE CARPETAS

### 1.1 Descripción Técnica
Se creó el entorno de desarrollo utilizando Vite y React 19, instalando los paquetes `react-router-dom` y `axios`. Se organizó la arquitectura del proyecto en carpetas desacopladas según la guía técnica:

```bash
npm create vite@latest . -- --template react
npm install
npm install react-router-dom axios lucide-react canvas-confetti
```

### 1.2 Estructura de Directorios Creada
```text
PRACTICA/
├── index.html                   # HTML raíz con tipografía y favicon clínico
├── package.json                 # Dependencias (React 19, Axios, React Router)
├── vite.config.js               # Configuración del bundler Vite
├── src/
│   ├── main.jsx                 # Montaje en StrictMode
│   ├── App.jsx                  # Enrutador principal y layout
│   ├── index.css                # Sistema de diseño en tema blanco
│   ├── services/
│   │   └── api.js               # Cliente Axios configurado para la API
│   ├── hooks/
│   │   └── useUsers.js          # Custom Hook con ciclo de vida y AbortController
│   ├── context/
│   │   └── AppContext.jsx       # Context API de pacientes
│   ├── components/
│   │   ├── Navbar.jsx           # Navegación con NavLink y feedback activo
│   │   ├── Footer.jsx           # Footer con datos del estudiante en 9no ciclo
│   │   ├── UserCard.jsx         # Tarjeta de paciente con renderizado condicional
│   │   ├── LabInspector.jsx     # Panel interactivo didáctico de los 5 pasos
│   │   └── ParticleBackground.jsx # Burbujas animadas sobre fondo blanco
│   └── pages/
│       ├── Home.jsx             # Vista de inicio de la clínica
│       ├── List.jsx             # Directorio de pacientes
│       ├── Form.jsx             # Formulario controlado y carnet en tiempo real
│       └── NotFound.jsx         # Página 404 personalizada
```

---

### 📷 CAPTURAS DE PANTALLA REQUERIDAS - PASO 1

> 🖼️ **[CAPTURA 1.1 - EN VISUAL STUDIO CODE]:**
> - **Qué mostrar:** La ventana de Visual Studio Code con el panel lateral izquierdo abierto mostrando la estructura completa de carpetas (`src/pages`, `src/components`, `src/services`, `src/hooks`, `src/context`), el archivo `package.json` abierto en el editor y la terminal integrada donde se vea `npm install` o `npm run dev`.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 1.1 DE VISUAL STUDIO CODE ]
> ```

> 🖼️ **[CAPTURA 1.2 - EN EL NAVEGADOR WEB]:**
> - **Qué mostrar:** El navegador en `http://localhost:5174/` mostrando la página de inicio (Home) con la barra de navegación superior, los badges de la clínica y las estadísticas en tiempo real cargadas en el tema blanco.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 1.2 DE LA PÁGINA WEB LOCAL ]
> ```

---

# PASO 2: IMPLEMENTAR ENRUTAMIENTO (REACT ROUTER)

### 2.1 Descripción Técnica
Se implementó enrutamiento del lado del cliente (Client-Side Routing) mediante `<BrowserRouter>`, `<Routes>`, `<Route>` y `<NavLink>` en `src/App.jsx` y `src/components/Navbar.jsx`. 

**Restricción técnica cumplida:** No usar `HashRouter`, preferir `BrowserRouter` para garantizar URLs limpias. Se validó que la navegación no recargue la página mediante manipulación del historial del navegador (`pushState`).

### 2.2 Código Implementado en `App.jsx`
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Form from './pages/Form';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/404" element={<NotFound />} />
          {/* Ruta comodín para URLs no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

### 2.3 Retroalimentación Visual con `NavLink` e `isActive`
En `src/components/Navbar.jsx` se aplicó la clase activa dinámicamente:
```jsx
<NavLink
  to="/users"
  className={({ isActive }) => (isActive ? 'nav-item active-nav' : 'nav-item')}
>
  <Users size={16} />
  <span>Pacientes & Staff</span>
</NavLink>
```

---

### 📷 CAPTURAS DE PANTALLA REQUERIDAS - PASO 2

> 🖼️ **[CAPTURA 2.1 - EN VISUAL STUDIO CODE]:**
> - **Qué mostrar:** El archivo `src/App.jsx` abierto en el editor de código mostrando la configuración de `<BrowserRouter>`, `<Routes>`, `<Route>` y las importaciones de las 4 páginas (`Home`, `List`, `Form`, `NotFound`).
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 2.1 DE APP.JSX EN VS CODE ]
> ```

> 🖼️ **[CAPTURA 2.2 - EN EL NAVEGADOR WEB (RUTA ACTIVA & 404)]:**
> - **Qué mostrar:** El navegador con la pestaña `/users` o `/404` seleccionada, destacando el botón activo en color verde teal en el Navbar, la sub-barra indicando `Ruta SPA actual: /users` (o `/404`) y la pantalla 404 amigable de la mascota extraviada demostrando que no hubo error del servidor HTTP.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 2.2 DEL NAVEGADOR CON NAVLINK ACTIVO O 404 ]
> ```

---

# PASO 3: CONSUMO DE API CON AXIOS + ASYNC/AWAIT EN USEEFFECT

### 3.1 Descripción Técnica
Se consumió la API REST externa `https://jsonplaceholder.typicode.com/users` utilizando Axios con arquitectura `async/await` dentro de `useEffect`.

**Restricciones técnicas cumplidas:**
- **Prohibido:** No usar `.then().catch()` anidados.
- **Manejo explícito de errores:** Bloque `try/catch/finally`.
- **Cleanup en useEffect:** Uso de `AbortController` para cancelar solicitudes pendientes al desmontar el componente o al re-renderizar en React StrictMode.
- **Manejo de estados:** `loading`, `data` (éxito) y `error`.

### 3.2 Código Implementado en `src/hooks/useUsers.js`
```javascript
// Regla de laboratorio - Uso de IA documentado:
// IA: useEffect se ejecuta 2 veces en desarrollo (StrictMode)
// Solución manual: usar AbortController para cancelar petición duplicada

useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal
      });
      setData(res.data);
    } catch (err) {
      if (err.name !== 'CanceledError' && !axios.isCancel(err)) {
        setError(err.message || 'Error al conectar con la API');
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  // Cleanup con AbortController
  return () => controller.abort();
}, []);
```

---

### 📷 CAPTURAS DE PANTALLA REQUERIDAS - PASO 3

> 🖼️ **[CAPTURA 3.1 - EN VISUAL STUDIO CODE]:**
> - **Qué mostrar:** El archivo `src/hooks/useUsers.js` abierto en VS Code, mostrando la función `useEffect`, la creación del `new AbortController()`, el `try/catch` con `axios.get` y el comentario de la regla de laboratorio de IA sobre StrictMode.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 3.1 DE USEUSERS.JS EN VS CODE ]
> ```

> 🖼️ **[CAPTURA 3.2 - EN EL NAVEGADOR WEB (ESTADO LOADING & ERROR 500)]:**
> - **Qué mostrar:** En la sección **Pacientes & Staff** (`/users`), hacer clic en el botón **[Simular Loading]** (capturando el spinner animado de carga) O hacer clic en **[Simular Error 500]** (capturando la alerta roja de *Error de Red: Status 500 Internal Server Error* y el botón de reintento).
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 3.2 DEL NAVEGADOR SIMULANDO LOADING O ERROR ]
> ```

---

# PASO 4: RENDERIZADO ITERATIVO (.map) Y FORMULARIO CONTROLADO CON useState

### 4.1 Descripción Técnica
- **Renderizado Iterativo:** Se renderizó la colección de pacientes utilizando `.map()` asignando la propiedad `key={user.id}` (key único y estable, sin usar index de array).
- **Renderizado Condicional:** 
  - Con operador `&&` para mostrar/ocultar los detalles de la ficha médica al hacer clic en *"Ficha Médica"*.
  - Con operador ternario `? :` para alternar colores de badges clínicos según el estado de vacunación.
- **Formulario Controlado con `useState`:** Entradas controladas (`name`, `species`, `owner`, `email`, `phone`, `status`, `bio`) sincronizadas con `onChange` y validación en `onSubmit` con `e.preventDefault()`.

### 4.2 Código Implementado en `src/pages/Form.jsx`
```jsx
const [formData, setFormData] = useState({
  name: 'Max',
  species: 'Canino (Golden Retriever)',
  owner: 'Carlos Mendoza',
  email: 'carlos@email.com',
  status: 'Vacunado al Día'
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault(); // Evita recarga en la SPA
  addUserLocally(formData); // Sincroniza al estado global
  setSubmitted(true);
};
```

---

### 📷 CAPTURAS DE PANTALLA REQUERIDAS - PASO 4

> 🖼️ **[CAPTURA 4.1 - EN VISUAL STUDIO CODE]:**
> - **Qué mostrar:** El archivo `src/pages/Form.jsx` o `src/pages/List.jsx` abierto en VS Code mostrando el `useState` con los manejadores `handleChange` / `handleSubmit`, o el `.map()` con `key={user.id}`.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 4.1 DE FORM.JSX O LIST.JSX EN VS CODE ]
> ```

> 🖼️ **[CAPTURA 4.2 - EN EL NAVEGADOR WEB (CARNET EN VIVO & INSPECTOR JSON)]:**
> - **Qué mostrar:** En la sección **Registro Mascota** (`/form`), escribir datos en el formulario y capturar la pantalla mostrando a la derecha el **Carnet Médico en Tiempo Real** actualizándose y el recuadro **Estado Interno de useState (Inspección Técnica)** imprimiendo el JSON reactivo.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 4.2 DEL NAVEGADOR CON EL FORMULARIO Y CARNET EN VIVO ]
> ```

---

# PASO 5: INTEGRACIÓN, AUDITORÍA DE RED Y CICLO DE VIDA DEL DOM

### 5.1 Descripción Técnica
Se verificó el comportamiento integral de la SPA auditando el navegador con las **Herramientas de Desarrollador (DevTools)**:
1. **Pestaña Network (Red):** Se comprobó que al navegar entre páginas no existe descarga repetida de `index.html` (0 recargas de página / 100% Client-Side Rendering).
2. **Pestaña Console (Consola):** Cero advertencias (`warnings`) de keys duplicadas en React y cero errores de peticiones canceladas gracias a `AbortController`.
3. **Persistencia y Sincronización:** Las mascotas agregadas en el formulario aparecen de inmediato en el directorio de pacientes (`/users`) gracias a `AppContext`.
4. **Panel de Inspección Integrado (`LabInspector.jsx`):** Al presionar el botón *"Panel de Práctica"* en el Navbar, se despliega el modal donde se puede auditar el código fuente de los 5 pasos y probar las simulaciones en vivo.

---

### 📷 CAPTURAS DE PANTALLA REQUERIDAS - PASO 5

> 🖼️ **[CAPTURA 5.1 - EN VISUAL STUDIO CODE]:**
> - **Qué mostrar:** El archivo `src/context/AppContext.jsx` o `src/components/LabInspector.jsx` abierto en VS Code mostrando la sincronización global del estado y los pasos de auditoría documentados.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 5.1 DE APPCONTEXT O LABINSPECTOR EN VS CODE ]
> ```

> 🖼️ **[CAPTURA 5.2 - EN EL NAVEGADOR WEB (DEVTOOLS NETWORK & PANEL DE PRÁCTICA)]:**
> - **Qué mostrar:** El navegador con las herramientas de desarrollador abiertas (F12 -> pestaña **Network** o **Console**) mostrando las peticiones de red limpias sin recargas, O con el modal del **"Panel de Práctica"** abierto en la pantalla mostrando el código y los pasos activos.
> *(Pega tu captura aquí)*
> ```text
> [ INSERTAR AQUÍ CAPTURA 5.2 DEL NAVEGADOR CON DEVTOOLS NETWORK O PANEL DE PRÁCTICA ]
> ```

---

## RESUMEN DE EVIDENCIAS A ENTREGAR

| Paso | Concepto Clave | Captura 1 (Visual Studio Code) | Captura 2 (Página Web Local) |
| :--- | :--- | :--- | :--- |
| **Paso 1** | Configuración Vite + Árbol de carpetas | Explorador de archivos y terminal `npm install` | Home de VetCare Plus en `http://localhost:5174/` |
| **Paso 2** | Routing con BrowserRouter y NavLink | `src/App.jsx` con rutas y `<BrowserRouter>` | Navbar con enlace activo (`isActive`) y página 404 |
| **Paso 3** | Axios, async/await y AbortController | `src/hooks/useUsers.js` con cleanup | Botón [Simular Loading] o [Simular Error 500] |
| **Paso 4** | .map() con key y formulario useState | `src/pages/Form.jsx` con inputs controlados | Carnet médico en vivo e inspector JSON reactivo |
| **Paso 5** | Auditoría CSR, DevTools y Sincronización | `src/context/AppContext.jsx` en VS Code | DevTools (Network tab sin recargas) o Panel de Práctica |

---

*Desarrollado por: Juan Carlos Chahuayo Martinez · 9no ciclo UNCP - FIS*
