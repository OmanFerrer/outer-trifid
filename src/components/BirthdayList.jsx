import { useMemo } from 'react';

const BirthdayList = ({ birthdays, loading }) => {
  const monthsAbbr = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ];

  const groupedBirthdays = useMemo(() => {
    const today = new Date();
    const todayStripped = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const allUpcoming = birthdays
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

        return { 
          ...b, 
          month: monthsAbbr[month - 1], 
          day: day.toString().padStart(2, '0'), 
          diffDays,
          nextBdayDate: nextBday.getTime()
        };
      })
      .filter(b => b !== null)
      .sort((a, b) => a.diffDays - b.diffDays);

    const groups = [];
    allUpcoming.forEach(person => {
      const groupKey = `${person.day} ${person.month}`;
      const existingGroup = groups.find(g => g.key === groupKey);
      
      if (existingGroup) {
        existingGroup.people.push(person);
      } else {
        groups.push({
          key: groupKey,
          day: person.day,
          month: person.month,
          diffDays: person.diffDays,
          people: [person]
        });
      }
    });

    return groups;
  }, [birthdays]);

  if (loading) {
    return <div className="loading-spinner">Cargando cumpleaños...</div>;
  }

  return (
    <div className="card timeline-container">
      <h2 className="section-title">
        <span>🗓️</span> Cronograma de Cumpleaños
      </h2>
      {groupedBirthdays.length > 0 ? (
        <div className="timeline">
          {groupedBirthdays.map((group, idx) => (
            <div key={idx} className="timeline-group">
              <div className="timeline-date">
                <span className="timeline-day">{group.day}</span>
                <span className="timeline-month">{group.month}</span>
              </div>
              <span className="timeline-date-label">{group.day} {group.month}</span>
              <div className="timeline-content">
                {group.people.map((person, pIdx) => (
                  <div key={pIdx} className="timeline-person">
                    <div className="person-info">
                      <span className="person-name">{person.nombre} {person.apellido}</span>
                      <span className="person-diff">
                        {person.diffDays === 0 ? '¡Hoy!' : `Faltan ${person.diffDays} días`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">No hay próximos cumpleaños registrados.</p>
      )}
    </div>
  );
};

export default BirthdayList;
