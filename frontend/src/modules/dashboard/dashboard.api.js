import { request } from '../../shared/api/http.js';
export const getDashboardSummary = () => request('/dashboard/summary');
