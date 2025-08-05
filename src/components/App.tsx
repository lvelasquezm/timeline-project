import '../styles/App.css';

import { items } from '../data/items';

import Timeline from './Timeline';

export default function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Timeline Visualization</h1>
      <Timeline events={items} />
    </div>
  );
}
