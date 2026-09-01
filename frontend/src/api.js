import axios from 'axios';

// En desarrollo el proxy de Vite redirige /api → localhost:3001, por lo que
// baseURL queda vacío y las rutas relativas funcionan igual que antes.
// En producción, VITE_API_URL debe apuntar al servidor EC2, p. ej.:
//   http://1.2.3.4:3001
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
});

export default api;
