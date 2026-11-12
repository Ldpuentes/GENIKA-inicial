import { ArrowRight, Construction } from 'lucide-react';

export default function ModulePage({ title, description, icon: Icon, onNavigate }) {
  return <div className="page-stack"><section className="module-intro"><div><div className="eyebrow">MÓDULO GENIKA</div><h2>{title}</h2><p>{description}</p></div></section><section className="panel module-coming"><div className="coming-icon"><Icon size={25} /></div><div className="eyebrow">ÁREA PREPARADA</div><h3>Este módulo está listo para desarrollarse</h3><p>La estructura de esta sección ya está separada del resto de la aplicación. Se conectará con su propia API y sus datos en SQL Server al implementar el flujo correspondiente.</p><button className="button button-secondary" onClick={() => onNavigate('dashboard')}>Volver al panel <ArrowRight size={16} /></button><span className="coming-mark"><Construction size={72} strokeWidth={1} /></span></section></div>;
}
