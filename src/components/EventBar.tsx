import { memo } from 'react';

import '../styles/EventBar.css';

type EventBarProps = {
  name: string;
  title: string;
  style: React.CSSProperties;
};

export default memo(function EventBar({ name, title, style }: EventBarProps) {
  return (
    <div
      className="event-bar"
      title={title}
      style={style}
    >
      <span className="event-name">
        {name}
      </span>
      <div className="event-tooltip">
        <span className="event-tooltip-text">
          {name}
        </span>
      </div>
    </div>
  );
});
