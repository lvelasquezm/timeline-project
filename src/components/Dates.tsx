import { memo } from 'react';

import '../styles/Dates.css';

type DatesProps = {
  totalDays: number;
  minDate: Date;
  style: React.CSSProperties;
};

export default memo(function Dates({ totalDays, minDate, style }: DatesProps) {
  return (
    <div
      className="dates-container"
      style={style}
    >
      {Array.from({ length: totalDays }).map((_, index) => {
        const currentDate = new Date(minDate);
        currentDate.setDate(minDate.getDate() + index);

        const month = currentDate.toLocaleString('default', { month: 'short' });
        const day = currentDate.getDate();

        return (
          <div
            key={`date-label-${index}`}
            className="date-label"
          >
            {month} {day}
          </div>
        );
      })}
    </div>
  );
});
