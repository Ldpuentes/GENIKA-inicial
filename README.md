# GENIKA

Aplicación modular para gestionar devoluciones, revisión, reclasificación y nuevo despacho de materiales reciclables. El frontend React y la API Node.js/Express son proyectos separados y se conectan por HTTP/JSON. SQL Server es la fuente de datos.

## Requisitos

- Node.js 20 o superior
- SQL Server accesible desde el backend
- ODBC Driver 18 for SQL Server (necesario para el paquete `mssql`)

## Inicio

1. Copiar `backend/.env.example` como `backend/.env` y configurar la conexión a SQL Server.
2. Ejecutar `database/schema.sql` en la instancia deseada.
3. Desde esta carpeta ejecutar `npm install`, `npm --prefix backend install` y `npm --prefix frontend install`.
4. Ejecutar `npm run dev`.

La interfaz queda en `http://localhost:5173` y la API en `http://localhost:4000/api/v1`. Vite envía las llamadas `/api` al backend en desarrollo.

## Estructura

- `frontend/src/modules`: cada módulo de interfaz mantiene sus vistas y servicios.
- `backend/src/modules`: cada módulo de API mantiene rutas, controlador, servicio y repositorio.
- `database`: scripts SQL versionables.

El primer flujo implementado es el registro y consulta de devoluciones. Las demás secciones quedan como módulos independientes con una pantalla inicial para ir incorporándolas. La integración directa con SIGGO no está activada: requiere interfaces y permisos autorizados; el diseño permite usar intercambio controlado de datos.

## Configuración

`backend/.env.example` documenta los parámetros de conexión. La aplicación valida la conexión al iniciar y expone `GET /api/v1/health` para consultar el estado de la API y la base de datos.
