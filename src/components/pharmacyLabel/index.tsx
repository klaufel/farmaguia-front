interface PharmacyLabelProps {
  isOnGuard?: boolean;
  isOpen?: boolean;
  schedule: PharmacyShedule;
  currentDate: Date;
}

export default function PharmacyLabel({
  currentDate,
  isOnGuard,
  isOpen,
  schedule,
}: PharmacyLabelProps) {
  const currentDay = currentDate.getDay() - 1;

  const nextDay = schedule[currentDay + 1];

  const lastTurnHour = Number(schedule[currentDay][0][1].split(':')[0]);
  const turn = currentDate.getHours() > lastTurnHour ? 1 : 0;

  const openHourNextDay = schedule[currentDay][0][turn] || nextDay[0][0];

  return (
    <div className="inline-flex items-center">
      {isOnGuard || isOpen ? (
        <>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
            Abierta
          </span>
          {isOnGuard && (
            <span className="text-xs pl-1">En turno de guardia</span>
          )}
        </>
      ) : (
        <>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 last:mr-0 mr-1">
            Cerrada
          </span>
          {openHourNextDay && (
            <span className="text-xs pl-1">Abre a las {openHourNextDay}</span>
          )}
        </>
      )}
    </div>
  );
}
