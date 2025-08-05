import '../styles/App.css';

import { items } from '../data/items';

import Timeline from './Timeline';

export default function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Timeline Visualization</h1>

      {items.length > 0 ? (
        <Timeline events={items} />
      ) : (
        <div className="empty-container" data-testid="empty-container">
          No events to display.
        </div>
      )}
    </div>
  );
}
