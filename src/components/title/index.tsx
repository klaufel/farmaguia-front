interface TitleProps {
  currentDate: Date;
}

export default function Title({ currentDate }: TitleProps) {
  return (
    <h1 className="text-3xl font-bold mb-6 ">
      Hoy{' '}
      {currentDate.toLocaleString('es-ES', {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'long',
        weekday: 'long',
        year: 'numeric',
      })}
      h.
    </h1>
  );
}
