import { useMemo } from 'react';

const BirthdayList = ({ birthdays, loading }) => {
  const monthsAbbr = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ];

  const upcomingBirthdays = useMemo(() => {
    const today = new Date();
    const todayStripped = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return birthdays
      .map(b => {
        const dateString = b.fecha_nacimiento;
        if (!dateString) return null;
        
        const parts = dateString.split('-');
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        
        let nextBday = new Date(today.getFullYear(), month - 1, day);
        if (nextBday < todayStripped) {
          nextBday.setFullYear(today.getFullYear() + 1);
        }
        
        const diffTime = nextBday - todayStripped;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return { ...b, month: monthsAbbr[month - 1], day: day.toString().padStart(2, '0'), diffDays };
      })
      .filter(b => b !== null && b.diffDays > 0)
      .sort((a, b) => a.diffDays - b.diffDays)
      .slice(0, 3);
  }, [birthdays]);

  if (loading) {
    return <div className="loading-spinner">Cargando cumpleaños...</div>;
  }

  return (
    <div className="card">
      <h2 className="section-title">
        <span>📅</span> Próximos Cumpleaños
      </h2>
      {upcomingBirthdays.length > 0 ? (
        <div className="birthday-list">
          {upcomingBirthdays.map((person, idx) => (
            <div key={idx} className="birthday-item">
              <div className="birthday-info">
                <h3>{person.nombre} {person.apellido}</h3>
                <p>Faltan {person.diffDays} días</p>
              </div>
              <div className="birthday-date" style={{ whiteSpace: 'nowrap' }}>
                {person.day} {person.month}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">No hay próximos cumpleaños.</p>
      )}
    </div>
  );
};

export default BirthdayList;
