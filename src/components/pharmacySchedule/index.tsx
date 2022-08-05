import cx from 'classnames';
import config from '@farmainfo/config';

interface PharmacyScheduleProps {
  schedule: string[][][];
}

export default function PharmacySchedule({ schedule }: PharmacyScheduleProps) {
  const { WEEK } = config;
  const { DAYS } = WEEK;

  const currentDay = new Date().getDay() - 1;

  return (
    <ul className="text-md text-gray-600">
      {schedule.map((hour, day) => {
        const isCurrentDay = currentDay === day;
        const schedule = hour.map(([x, y]) => `${x} - ${y}`).join(', ');

        return (
          <li
            key={day}
            className={cx('flex pb-1', isCurrentDay && 'font-semibold')}
          >
            <h4 className="mr-1 w-20">{DAYS[day]}</h4>
            <p>{schedule || 'Cerrada'}</p>
          </li>
        );
      })}
    </ul>
  );
}
