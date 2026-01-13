import { useState, useEffect, useCallback } from 'react';
import BirthdayForm from './components/BirthdayForm';
import BirthdayList from './components/BirthdayList';
import { getBirthdays } from './services/api';
import './index.css';

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBirthdays = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBirthdays();
      setBirthdays(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBirthdays();
  }, [fetchBirthdays]);

  const todayBirthdays = birthdays.filter(b => {
    const parts = b.fecha_nacimiento.split('-');
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    const today = new Date();
    return month === (today.getMonth() + 1) && day === today.getDate();
  });

  return (
    <div className="container">
      <header>
        <h1>Promoción GAD 2006B</h1>
        <p className="subtitle"></p>
      </header>
      
      <main className="main-grid">
        {todayBirthdays.length > 0 && (
          <div className="today-banner">
            <h2>🎂 ¡Hoy cumple años!</h2>
            <div style={{ marginTop: '10px' }}>
              {todayBirthdays.map((person, idx) => (
                <h3 key={idx} style={{ fontSize: '1.4rem' }}>
                  {person.nombre} {person.apellido}
                </h3>
              ))}
            </div>
          </div>
        )}
        
        <BirthdayForm onSubmissionSuccess={fetchBirthdays} />
        <BirthdayList birthdays={birthdays} loading={loading} />
      </main>
    </div>
  );
}

export default App;
