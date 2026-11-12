import { useEffect, useState } from 'react';
import { ArrowDownLeft, CircleAlert, ClipboardList, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { listReturns } from './returns.api.js';

function formatDate(value) {
  return value ? new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value)) : '—';
}

export default function ReturnsPage({ onNewReturn }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function refresh() {
    setLoading(true);
    try {
      setItems(await listReturns({ search, status }));
      setError('');
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally { setLoading(false); }
  }
  useEffect(() => { const timer = setTimeout(refresh, 250); return () => clearTimeout(timer); }, [search, status]);

  return <div className="page-stack">
    <section className="module-intro"><div><div className="eyebrow">OPERACIÓN / DEVOLUCIONES</div><h2>Devoluciones</h2><p>Registra, consulta y da seguimiento al material que retorna a la operación.</p></div><button className="button button-primary" onClick={onNewReturn}><Plus size={17} /> Nueva devolución</button></section>
    <section className="list-summary"><div className="list-summary-icon"><ArrowDownLeft size={20} /></div><div><strong>{loading ? '—' : items.length}</strong><span>registros encontrados</span></div><div className="summary-divider" /><div className="summary-caption"><ClipboardList size={17} /> El historial se conserva para mantener la trazabilidad de cada retorno.</div></section>
    <section className="panel table-panel">
      <div className="table-toolbar"><div className="search-field"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por referencia, cliente o material" /></div><label className="filter-field"><SlidersHorizontal size={16} /><select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Todos los estados</option><option>Recibida</option><option>En revisión</option><option>Pendiente de reclasificación</option><option>Cerrada</option><option>Cancelada</option></select></label></div>
      {error && <div className="inline-alert table-alert"><CircleAlert size={17} /><span>{error}</span></div>}
      <div className="table-wrap"><table><thead><tr><th>REFERENCIA</th><th>CLIENTE</th><th>MATERIAL</th><th>CANTIDAD</th><th>FECHA RECIBIDA</th><th>ESTADO</th></tr></thead>
        <tbody>{loading ? <tr><td colSpan="6" className="empty-cell">Cargando devoluciones…</td></tr> : items.length ? items.map((item) => <tr key={item.id}><td><b className="table-reference">{item.reference}</b></td><td>{item.customer}</td><td>{item.material}</td><td>{Number(item.quantityKg).toLocaleString('es-CO')} kg</td><td>{formatDate(item.receivedAt)}</td><td><span className={`status-pill ${item.status === 'Cerrada' ? 'done' : item.status === 'En revisión' ? 'review' : 'pending'}`}><i />{item.status}</span></td></tr>) : <tr><td colSpan="6" className="empty-cell"><div className="empty-state"><span className="empty-icon"><ClipboardList size={22} /></span><b>{error ? 'Sin conexión con los datos' : 'Aún no hay devoluciones'}</b><span>{error ? 'Configura la API y la conexión con SQL Server para consultar los registros.' : 'Cuando registres una devolución, aparecerá aquí.'}</span>{!error && <button className="text-button" onClick={onNewReturn}>Registrar la primera <Plus size={15} /></button>}</div></td></tr>}</tbody>
      </table></div>
    </section>
  </div>;
}
