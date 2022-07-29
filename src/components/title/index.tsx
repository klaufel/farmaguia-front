import { getFormatedDateString } from '../../date-utils';

interface TitleProps {
  currentDate: Date;
  municipality: string;
}

export default function Title({ currentDate, municipality }: TitleProps) {
  return (
    <div className="py-4 sm:py-6 mb-4">
      <h1 className="text-lg md:text-2xl font-semibold">
        Farmacias de guardia en {municipality}
      </h1>
      <h2 className="text-md md:text-lg">
        Hoy {getFormatedDateString(currentDate)}
      </h2>
    </div>
  );
}
