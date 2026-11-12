import { useState } from 'react';
import { Activity, Archive, ArrowDownLeft, BarChart3, Bell, Boxes, ChevronDown, CircleUserRound, Clock3, Command, FileBarChart2, LayoutDashboard, Menu, PackageCheck, Search, Settings2, ShieldCheck, Truck, Users, X } from 'lucide-react';
import DashboardPage from './modules/dashboard/DashboardPage.jsx';
import ReturnsPage from './modules/returns/ReturnsPage.jsx';
import ModulePage from './modules/placeholder/ModulePage.jsx';
import ReturnForm from './modules/returns/ReturnForm.jsx';

const navGroups = [
  { label: 'GENERAL', items: [{ id: 'dashboard', label: 'Panel principal', icon: LayoutDashboard }] },
  { label: 'OPERACIÓN', items: [
    { id: 'returns', label: 'Devoluciones', icon: ArrowDownLeft, badge: '01' },
    { id: 'inventory', label: 'Inventario', icon: Boxes },
    { id: 'dispatches', label: 'Despachos', icon: Truck }
  ] },
  { label: 'CONTROL', items: [
    { id: 'traceability', label: 'Trazabilidad', icon: Clock3 },
    { id: 'reports', label: 'Informes', icon: FileBarChart2 },
    { id: 'users', label: 'Usuarios y roles', icon: Users }
  ] }
];
const moduleInfo = {
  inventory: { title: 'Inventario', description: 'Consulta existencias, estados y movimientos registrados.', icon: Boxes },
  dispatches: { title: 'Despachos', description: 'Organiza las salidas y nuevos despachos de materiales.', icon: Truck },
  traceability: { title: 'Trazabilidad', description: 'Consulta el historial de cada material y sus cambios de estado.', icon: Activity },
  reports: { title: 'Informes', description: 'Revisa indicadores y genera reportes de la operación.', icon: BarChart3 },
  users: { title: 'Usuarios y roles', description: 'Administra el acceso a los módulos según las responsabilidades del equipo.', icon: ShieldCheck }
};

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const pageTitle = active === 'dashboard' ? 'Panel principal' : moduleInfo[active]?.title || 'GENIKA';

  function navigate(id) { setActive(id); setSidebarOpen(false); }
  function showNotice(message) { setNotice(message); window.setTimeout(() => setNotice(''), 4000); }

  return <div className="app-shell">
    {sidebarOpen && <button className="sidebar-scrim" aria-label="Cerrar menú" onClick={() => setSidebarOpen(false)} />}
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark"><Archive size={21} strokeWidth={2.2} /></div><div className="brand-name">GENIKA<span>GESTIÓN DE MATERIALES</span></div><button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú"><X size={19} /></button></div>
      <button className="workspace-switch"><span className="workspace-avatar">AR</span><span className="workspace-copy"><b>A Reciclar por Colombia</b><small>Área de operaciones</small></span><ChevronDown size={15} /></button>
      <nav className="main-nav" aria-label="Navegación principal">{navGroups.map((group) => <div className="nav-group" key={group.label}><div className="nav-label">{group.label}</div>{group.items.map(({ id, label, icon: Icon, badge }) => <button key={id} className={`nav-link ${active === id ? 'selected' : ''}`} onClick={() => navigate(id)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{badge && <i className="nav-count">{badge}</i>}{active === id && <i className="selected-bar" />}</button>)}</div>)}</nav>
      <div className="sidebar-spacer" />
      <div className="help-card"><span className="help-icon"><Command size={16} /></span><b>Tu operación, conectada</b><p>GENIKA organiza el ciclo de cada material.</p><button onClick={() => showNotice('La guía de uso estará disponible próximamente.')}>Conoce más <ChevronDown size={14} className="help-chevron" /></button></div>
      <button className="nav-link settings-link" onClick={() => showNotice('Configuración estará disponible próximamente.')}><Settings2 size={18} /><span>Configuración</span></button>
      <div className="sidebar-profile"><span className="profile-avatar">LP</span><span className="profile-copy"><b>Luis Puentes</b><small>Administrador</small></span><button aria-label="Menú de usuario"><ChevronDown size={16} /></button></div>
    </aside>

    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Menu size={21} /></button><div className="breadcrumbs"><span>GENIKA</span><i>/</i><b>{pageTitle}</b></div><div className="topbar-actions"><div className="topbar-date"><span className="status-dot" /> Sistema operativo</div><button className="icon-button notification-button" aria-label="Notificaciones" onClick={() => showNotice('No tienes notificaciones nuevas.')}><Bell size={19} /><i /></button><span className="topbar-divider" /><button className="topbar-user"><span className="profile-avatar small-avatar">LP</span><ChevronDown size={15} /></button></div></header>
      <div className="page-container">
        {active === 'dashboard' ? <DashboardPage onNavigate={navigate} onNewReturn={() => setFormOpen(true)} /> : active === 'returns' ? <ReturnsPage onNewReturn={() => setFormOpen(true)} /> : <ModulePage {...moduleInfo[active]} onNavigate={navigate} />}
      </div>
    </main>
    {formOpen && <ReturnForm onClose={() => setFormOpen(false)} onSuccess={() => { setFormOpen(false); showNotice('Devolución registrada correctamente.'); if (active === 'dashboard') setActive('returns'); }} />}
    {notice && <div className="toast-message"><PackageCheck size={17} />{notice}<button onClick={() => setNotice('')} aria-label="Cerrar aviso"><X size={16} /></button></div>}
  </div>;
}
