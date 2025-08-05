/**
 * Convert a date string to a Date object
 * @param dateString - The date string to convert
 * @returns The Date object
 */
export const dateStringToDate = (dateString: string): Date => new Date(dateString);

/**
 * Get the number of days between two dates.
 * @param start - The start date
 * @param end - The end date
 * @returns The number of days between the two dates
 */
export const getDiffInDays = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the end day.
};
