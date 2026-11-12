import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRoutes from './modules/health/health.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import returnsRoutes from './modules/returns/returns.routes.js';
import inventoryRoutes from './modules/inventory/inventory.routes.js';
import dispatchRoutes from './modules/dispatches/dispatches.routes.js';
import traceabilityRoutes from './modules/traceability/traceability.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(',') || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

const api = '/api/v1';
app.use(`${api}/health`, healthRoutes);
app.use(`${api}/dashboard`, dashboardRoutes);
app.use(`${api}/returns`, returnsRoutes);
app.use(`${api}/inventory`, inventoryRoutes);
app.use(`${api}/dispatches`, dispatchRoutes);
app.use(`${api}/traceability`, traceabilityRoutes);
app.use(`${api}/reports`, reportsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
