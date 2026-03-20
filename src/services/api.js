import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const submitBirthday = async (data) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Simulating success.');
    return new Promise((resolve) => {
      setTimeout(() => {
        const existing = JSON.parse(localStorage.getItem('birthdays') || '[]');
        localStorage.setItem('birthdays', JSON.stringify([...existing, data]));
        resolve({ success: true });
      }, 1000);
    });
  }

  const { error } = await supabase
    .from('cumpleaños')
    .insert([
      { 
        nombre: data.nombre, 
        apellido: data.apellido, 
        fecha_nacimiento: data.fechaNacimiento 
      }
    ]);

  if (error) throw error;
  return { success: true };
};

export const getBirthdays = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    const local = JSON.parse(localStorage.getItem('birthdays') || '[]');
    // Transform local storage keys to match Supabase for consistency
    return local.map(b => ({
        nombre: b.nombre,
        apellido: b.apellido,
        fecha_nacimiento: b.fechaNacimiento
    }));
  }

  const { data, error } = await supabase
    .from('cumpleaños')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error fetching birthdays:', error);
    return [];
  }

  return data;
};

export const checkNumberExists = async (number) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    const existing = JSON.parse(localStorage.getItem('camisetas') || '[]');
    return existing.some(j => j.numero === number);
  }

  const { data, error } = await supabase
    .from('camisetas')
    .select('numero')
    .eq('numero', number)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking number:', error);
    return false;
  }

  return !!data;
};

export const submitJersey = async (data) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existing = JSON.parse(localStorage.getItem('camisetas') || '[]');
        localStorage.setItem('camisetas', JSON.stringify([...existing, data]));
        resolve({ success: true });
      }, 1000);
    });
  }

  const { error } = await supabase
    .from('camisetas')
    .insert([{
      nombre_completo: data.fullName,
      fecha_nacimiento: data.dateOfBirth,
      nombre_camiseta: data.playerName,
      numero: data.squadNumber,
      talla: data.size
    }]);

  if (error) throw error;
  return { success: true };
};
