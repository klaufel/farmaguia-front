interface TitleProps {
  currentDate: Date;
}

export default function Title({ currentDate }: TitleProps) {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-2">
        Farmacias de guardia en Jumilla
      </h1>
      <h2 className="text-md md:text-lg font-semibold mb-6">
        Hoy{' '}
        {currentDate.toLocaleString('es-ES', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
          year: 'numeric',
        })}
      </h2>
    </div>
  );
}
