import { TimelineItem } from '../types/timeline';
import { dateStringToDate } from './dates';

/**
 * Check if two events overlap.
 * Logic: eventA starts before eventB ends and eventA ends after eventB starts.
 * @param eventA - The first event.
 * @param eventB - The second event.
 * @returns True if the events overlap, false otherwise.
 */
const eventsOverlap = (eventA: TimelineItem, eventB: TimelineItem): boolean => {
  return dateStringToDate(eventA.start).getTime() < dateStringToDate(eventB.end).getTime()
    && dateStringToDate(eventA.end).getTime() > dateStringToDate(eventB.start).getTime();
};

/**
 * Get the lanes for a timeline based on a list of events.
 * The algorithm places events in the first available lane
 * that does not overlap with the last event in the lane.
 * @param events - The events to get the lanes for (already ordered by date).
 * @returns The lanes for the timeline.
 */
export const getLanes = (events: TimelineItem[]): TimelineItem[][] => {
  // Each lane is an array of events.
  const lanes: TimelineItem[][] = [];

  events.forEach((event) => {
    // Track whether the event has been placed in a lane.
    let placed = false;

    // Try to find a spot in a lane for the current event.
    for (let i = 0; i < lanes.length; i++) {
      // Grab the last event in the current lane.
      const lastEventInLane = lanes[i][lanes[i].length - 1];

      // If the current event does not overlap with the last event in this lane,
      // we can place it in this lane.
      if (!eventsOverlap(event, lastEventInLane)) {
        lanes[i].push(event);
        placed = true;
        break; // Move to the next event.
      }
    }

    // If no suitable lane was found, create a new one for this event.
    if (!placed) {
      lanes.push([event]);
    }
  });

  return lanes;
};
