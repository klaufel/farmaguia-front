/*
 * @param date <Date>
 * Returned date formated date string elements with left zero digits
 * { day: '02', month: '03', year: '2022' }
 */
export const getDateSegments = (
  date: Date
): { day: string; month: string; year: string } => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return { day, month, year };
};

/*
 * @param date <Date>
 * Format date to format 'dd/mm/yyyy' | 'mm/dd/yyyy'
 */
export const formatDate = (
  date: Date,
  format: 'dd/mm/yyyy' | 'mm/dd/yyyy' = 'dd/mm/yyyy'
): string => {
  const { day, month, year } = getDateSegments(date);

  return format.replace('dd', day).replace('mm', month).replace('yyyy', year);
};

/*
 * @params date <Date>, locale <string> 'es-ES'
 * Format date to weekdaay an locale string: 'weekday, {day} {month} {year}'
 */

export const getFormatedDateString = (date: Date, locale: string = 'es-ES') => {
  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  });
};
