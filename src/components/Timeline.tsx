import { memo, useMemo } from 'react';

import '../styles/Timeline.css';

import { BAR_HEIGHT_PX, eventColors } from '../constants/timeline';
import { TimelineItem } from '../types/timeline';
import { dateStringToDate, getDiffInDays } from '../utils/dates';
import { getLanes } from '../utils/timeline';

import Dates from './Dates';
import EventBar from './EventBar';

type TimelineProps = {
  events: TimelineItem[];
};

export default memo(function Timeline({ events }: TimelineProps) {
  // Sort events by their start date to simplify the layout calculation.
  const sortedEvents = useMemo(() => {
    return [...events].sort(
      (a, b) => dateStringToDate(a.start).getTime() - dateStringToDate(b.start).getTime(),
    );
  }, [events]);

  // Flatten the dates from all events to determine the overall date range.
  const allDates = useMemo(() => {
    return sortedEvents.flatMap(
      (e) => [dateStringToDate(e.start), dateStringToDate(e.end)]
    );
  }, [sortedEvents]);

  // Determine the minimum date across all events.
  const minDate = useMemo(() => {
    return new Date(Math.min(...allDates.map(d => d.getTime())));
  }, [allDates]);

  // Determine the maximum date across all events.
  const maxDate = useMemo(() => {
    return new Date(Math.max(...allDates.map(d => d.getTime())));
  }, [allDates]);

  // Get the lanes for the timeline.
  const lanes = useMemo(() => getLanes(sortedEvents), [sortedEvents]);

  // Calculate the width of the entire timeline based on the date range.
  const totalDays = useMemo(() => getDiffInDays(
    minDate.toISOString().slice(0, 10),
    maxDate.toISOString().slice(0, 10),
  ), [minDate, maxDate]);

  // Calculate the grid template columns for the timeline.
  const timelineGridTemplateColumns = useMemo(
    () => `repeat(${totalDays}, minmax(0, 1fr))`,
    [totalDays],
  );

  return (
    <div className="timeline-wrapper" data-testid="timeline-wrapper">
      <div className="timeline-container">
        <div
          className="timeline-grid"
          style={{
            gridTemplateColumns: timelineGridTemplateColumns,
            gridTemplateRows: `repeat(${lanes.length}, minmax(${BAR_HEIGHT_PX}px, auto))`,
          }}
        >
          {lanes.map((lane, laneIndex) => (
            lane.map((event) => {
              // Calculate grid column start/end for each event bar.
              const startDay = getDiffInDays(minDate.toISOString().slice(0, 10), event.start);
              const endDay = getDiffInDays(minDate.toISOString().slice(0, 10), event.end);

              // Assign a random color to the event.
              const backgroundColor = eventColors[Math.floor(Math.random() * eventColors.length)];

              return (
                <EventBar
                  key={`${laneIndex}-${event.id}`}
                  name={event.name}
                  title={`${event.name}: From ${event.start} to ${event.end}`}
                  style={{
                    gridRowStart: laneIndex + 1,
                    gridColumnStart: startDay,
                    gridColumnEnd: endDay + 1,
                    backgroundColor,
                  }}
                />
              );
            })
          ))}
        </div>

        <Dates
          totalDays={totalDays}
          minDate={minDate}
          style={{
            gridTemplateColumns: timelineGridTemplateColumns,
          }}
        />
      </div>
    </div>
  );
});
