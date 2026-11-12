import { request } from '../../shared/api/http.js';
export const listReturns = (params = {}) => request(`/returns?${new URLSearchParams(params)}`);
export const createReturn = (data) => request('/returns', { method: 'POST', body: JSON.stringify(data) });
