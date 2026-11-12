import * as repository from './returns.repository.js';

export function listReturns(query) {
  return repository.findMany({
    search: query.search?.trim() || '',
    status: query.status || '',
    limit: Math.min(Number(query.limit) || 100, 250)
  });
}

export function registerReturn(data) {
  return repository.create(data);
}
