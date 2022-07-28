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
  const openHourNextDay = schedule[currentDay + 1][0][1] || nextDay[0][0];

  return isOnGuard || isOpen ? (
    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
      Abierta {isOnGuard && `, de Guardia`}
    </span>
  ) : (
    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 last:mr-0 mr-1">
      Cerrada {openHourNextDay && `, abre a las ${openHourNextDay}`}
    </span>
  );
}
