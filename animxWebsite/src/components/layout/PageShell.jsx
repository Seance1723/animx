import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function PageShell({ children }) {
  return (
    <div className="page-shell">
      <AppHeader />
      <main className="main-content">{children}</main>
      <AppFooter />
    </div>
  );
}