import { docsCategories } from '../../data/docsData';
export default function DocsSidebar() {
  return (
    <aside className="docs-sidebar">
      <ul>
        {docsCategories.map(cat => (
          <li key={cat.id}><a href={`#${cat.id}`}>{cat.label}</a></li>
        ))}
      </ul>
    </aside>
  );
}