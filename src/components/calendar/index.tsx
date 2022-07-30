import { useState } from 'react';
import cx from 'classnames';

import { formatDate } from '../../date-utils';
import {
  getCalendarDate,
  getCalendarDays,
  getDateFormat,
  getMonthName,
  getNextMonth,
  getPrevMonth,
  WEEKDAYS_NAMES,
} from './dates';

interface CalendarProps {
  currentDate: Date;
  date?: string;
  month?: number;
  selectedDates?: string[];
  year?: number;
}
export default function Calendar({
  currentDate,
  date,
  month,
  year,
  selectedDates,
}: CalendarProps) {
  const dateCurrent = getCalendarDate(formatDate(currentDate));
  const [dateCalendar, setDateCalendar] = useState({
    year: year || dateCurrent.year,
    month: month || dateCurrent.month,
  });

  const calendarDays = getCalendarDays(dateCalendar.year, dateCalendar.month);

  const dateSelected = date
    ? // @ts-ignore
      getDateFormat(dateCurrent.year, dateCurrent.month, dateCurrent.day)
    : null;

  const handleNextMonth = () => {
    setDateCalendar(getNextMonth(dateCalendar.year, dateCalendar.month));
  };

  const handlePrevMonth = () => {
    setDateCalendar(getPrevMonth(dateCalendar.year, dateCalendar.month));
  };

  return (
    <div className="text-center" style={{ maxWidth: '334px' }}>
      <div className="flex items-center">
        <span className="cursor-pointer p-2" onClick={handlePrevMonth}>
          {'<'}
        </span>
        <span className="flex-1 text-center font-semibold">
          {getMonthName(dateCalendar.month)} {dateCalendar.year}
        </span>
        <span className="cursor-pointer p-2" onClick={handleNextMonth}>
          {'>'}
        </span>
      </div>
      <div className="grid grid-cols-7 grid-rows-8 gap-0.5">
        {WEEKDAYS_NAMES.map(({ name }) => (
          <div key={name} className="text-xs py-1 text-gray-400 font-semibold">
            {name}
          </div>
        ))}
        {calendarDays.map(({ day, date }) => (
          <div
            key={date}
            className={cx(
              'text-sm w-11 h-11 rounded-full flex items-center justify-center',
              (date === dateSelected || selectedDates?.includes(date)) &&
                'bg-primary text-white'
            )}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
