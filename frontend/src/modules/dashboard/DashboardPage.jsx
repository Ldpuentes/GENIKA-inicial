import { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Boxes, CircleAlert, ClipboardCheck, Clock3, PackageCheck, Plus, RefreshCw, Truck } from 'lucide-react';
import { getDashboardSummary } from './dashboard.api.js';

const initialSummary = { openReturns: 0, returnsToday: 0, underReview: 0, awaitingClassification: 0 };

export default function DashboardPage({ onNavigate, onNewReturn }) {
  const [summary, setSummary] = useState(initialSummary);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      setSummary(await getDashboardSummary());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { refresh(); }, []);

  const metrics = [
    { label: 'Devoluciones abiertas', value: summary.openReturns, note: 'Pendientes de proceso', icon: ArrowDownLeft, tone: 'blue' },
    { label: 'Recibidas hoy', value: summary.returnsToday, note: 'Ingresos registrados', icon: PackageCheck, tone: 'green' },
    { label: 'En revisión', value: summary.underReview, note: 'Requieren inspección', icon: ClipboardCheck, tone: 'amber' },
    { label: 'Por reclasificar', value: summary.awaitingClassification, note: 'Siguiente paso: clasificar', icon: Boxes, tone: 'violet' }
  ];

  return <div className="page-stack">
    <section className="welcome-card">
      <div className="welcome-copy">
        <div className="eyebrow light-eyebrow"><span className="live-dot" /> CENTRO DE OPERACIONES</div>
        <h2>Control claro, materiales en movimiento.</h2>
        <p>Consulta devoluciones y sigue cada material desde su recepción hasta el nuevo despacho.</p>
        <button className="button button-light" onClick={onNewReturn}><Plus size={17} /> Registrar devolución</button>
      </div>
      <div className="welcome-art" aria-hidden="true">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="art-box"><Boxes size={68} strokeWidth={1.25} /></div>
        <div className="float-chip chip-top"><ArrowDownLeft size={15} /> Recepción</div>
        <div className="float-chip chip-bottom"><Truck size={15} /> Despacho</div>
      </div>
    </section>

    {error && <div className="inline-alert"><CircleAlert size={17} /><span>{error} Los indicadores aparecen en cero hasta que se conecte la base de datos.</span><button onClick={refresh} aria-label="Reintentar conexión"><RefreshCw size={15} /></button></div>}

    <section className="metric-grid" aria-label="Resumen operativo">
      {metrics.map(({ label, value, note, icon: Icon, tone }) => <article className="metric-card" key={label}>
        <div className={`metric-icon ${tone}`}><Icon size={19} /></div>
        <div className="metric-info"><span>{label}</span><strong>{loading ? '—' : Number(value || 0).toLocaleString('es-CO')}</strong><small>{note}</small></div>
        <span className={`metric-arrow ${tone}`}><ArrowUpRight size={17} /></span>
      </article>)}
    </section>

    <section className="content-grid">
      <article className="panel process-panel">
        <div className="panel-heading"><div><div className="eyebrow">FLUJO DE TRABAJO</div><h3>Ruta de una devolución</h3></div><button className="text-button" onClick={() => onNavigate('returns')}>Ver devoluciones <ArrowRight size={15} /></button></div>
        <div className="process-flow">
          <button className="process-step active" onClick={() => onNavigate('returns')}><span className="process-icon"><ArrowDownLeft size={19} /></span><b>Recepción</b><small>Registrar ingreso</small></button>
          <span className="process-connector"><i /></span>
          <button className="process-step" onClick={() => onNavigate('returns')}><span className="process-icon"><ClipboardCheck size={19} /></span><b>Inspección</b><small>Revisar estado</small></button>
          <span className="process-connector"><i /></span>
          <button className="process-step" onClick={() => onNavigate('inventory')}><span className="process-icon"><Boxes size={19} /></span><b>Reclasificación</b><small>Actualizar material</small></button>
          <span className="process-connector"><i /></span>
          <button className="process-step" onClick={() => onNavigate('dispatches')}><span className="process-icon"><Truck size={19} /></span><b>Nuevo despacho</b><small>Registrar salida</small></button>
        </div>
      </article>
      <article className="panel quick-panel">
        <div className="panel-heading"><div><div className="eyebrow">ACCESO RÁPIDO</div><h3>¿Qué necesitas hacer?</h3></div></div>
        <button className="quick-action" onClick={onNewReturn}><span className="quick-icon blue"><Plus size={18} /></span><span><b>Registrar devolución</b><small>Ingresar material retornado</small></span><ArrowRight size={17} /></button>
        <button className="quick-action" onClick={() => onNavigate('inventory')}><span className="quick-icon green"><Boxes size={18} /></span><span><b>Consultar inventario</b><small>Revisar existencias actuales</small></span><ArrowRight size={17} /></button>
        <button className="quick-action" onClick={() => onNavigate('traceability')}><span className="quick-icon violet"><Clock3 size={18} /></span><span><b>Buscar trazabilidad</b><small>Consultar historial de material</small></span><ArrowRight size={17} /></button>
      </article>
    </section>
    <div className="page-footnote"><span className="status-dot" /> Información conectada a GENIKA · Actualizada al consultar el panel</div>
  </div>;
}
