import { useState } from 'react';
import { AlertCircle, ArrowDownLeft, Check, X } from 'lucide-react';
import { createReturn } from './returns.api.js';

const blank = { reference: '', customer: '', material: '', quantityKg: '', reason: '', condition: 'Requiere revisión' };

export default function ReturnForm({ onClose, onSuccess }) {
  const [form, setForm] = useState(blank);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  function update(event) { setForm((value) => ({ ...value, [event.target.name]: event.target.value })); }
  async function submit(event) {
    event.preventDefault(); setError(''); setSaving(true);
    try { await createReturn({ ...form, quantityKg: Number(form.quantityKg) }); onSuccess(); }
    catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="return-form-title">
    <div className="modal-heading"><div className="modal-icon"><ArrowDownLeft size={20} /></div><div><div className="eyebrow">OPERACIÓN / DEVOLUCIONES</div><h2 id="return-form-title">Registrar devolución</h2></div><button className="icon-button modal-close" onClick={onClose} aria-label="Cerrar"><X size={20} /></button></div>
    <p className="modal-description">Ingresa los datos básicos del material que retorna a la operación.</p>
    {error && <div className="inline-alert form-alert"><AlertCircle size={17} /><span>{error}</span></div>}
    <form onSubmit={submit} className="return-form">
      <label>Referencia <span>*</span><input name="reference" required maxLength="30" value={form.reference} onChange={update} placeholder="Ej. DEV-2026-001" /></label>
      <label>Cliente <span>*</span><input name="customer" required maxLength="120" value={form.customer} onChange={update} placeholder="Nombre de la empresa" /></label>
      <div className="form-row"><label>Material <span>*</span><input name="material" required maxLength="80" value={form.material} onChange={update} placeholder="Ej. Cartón, aluminio…" /></label><label>Cantidad (kg) <span>*</span><input name="quantityKg" required type="number" min="0.01" step="0.01" value={form.quantityKg} onChange={update} placeholder="0,00" /></label></div>
      <label>Motivo de devolución <span>*</span><textarea name="reason" required maxLength="500" rows="3" value={form.reason} onChange={update} placeholder="Describe brevemente el motivo" /></label>
      <label>Condición inicial<select name="condition" value={form.condition} onChange={update}><option>Requiere revisión</option><option>Bueno</option><option>Deteriorado</option></select></label>
      <div className="form-note"><AlertCircle size={15} /> Al guardar, el estado inicial será “Recibida”.</div>
      <div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="button button-primary" disabled={saving}>{saving ? 'Guardando…' : <><Check size={16} /> Guardar devolución</>}</button></div>
    </form>
  </section></div>;
}
