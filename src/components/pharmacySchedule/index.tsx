import cx from 'classnames';
import config from '@pod/config';

interface PharmacyScheduleProps {
  hours: string[][][];
}

export default function PharmacySchedule({ hours }: PharmacyScheduleProps) {
  const { WEEK } = config;
  const { DAYS } = WEEK;

  const currentDay = new Date().getDay() - 1;

  return (
    <ul className="text-md text-gray-600">
      {hours.map((hour, day) => {
        const isCurrentDay = currentDay === day;
        const shedule = hour.map(([x, y]) => `${x} - ${y}`).join(', ');

        return (
          <li key={day} className={cx('flex', isCurrentDay && 'font-bold')}>
            <h4 className="mr-1 w-20">{DAYS[day]}</h4>
            <p>{shedule || 'Cerrado'}</p>
          </li>
        );
      })}
    </ul>
  );
}
