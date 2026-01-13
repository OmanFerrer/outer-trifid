import { useState } from 'react';
import { submitBirthday } from '../services/api';

const BirthdayForm = ({ onSubmissionSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      await submitBirthday(formData);
      setMessage({ text: '¡Registro completado con éxito! 🎉', type: 'success' });
      setFormData({ nombre: '', apellido: '', fechaNacimiento: '' });
      if (onSubmissionSuccess) onSubmissionSuccess();
    } catch (error) {
      setMessage({ text: 'Hubo un error al registrar. Inténtalo de nuevo.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">
        <span>📝</span> Nuevo Registro
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej. Juan"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            placeholder="Ej. Pérez"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {message.text && (
        <p style={{ 
          marginTop: '15px', 
          color: message.type === 'success' ? 'var(--primary-color)' : '#d32f2f',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default BirthdayForm;
