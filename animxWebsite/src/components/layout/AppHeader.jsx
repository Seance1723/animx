import { NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header className="app-header">
      <h1>AnimX Demo Hub</h1>
      <p className="subtitle">Zero-Dependency Animation Engine v3.41.0</p>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/playground" className={({ isActive }) => isActive ? "active" : ""}>Playground</NavLink>
        <NavLink to="/docs" className={({ isActive }) => isActive ? "active" : ""}>Docs</NavLink>
      </nav>
    </header>
  );
}