# Guía de Despliegue con Supabase

Esta aplicación utiliza **React** para el frontend y **Supabase** como base de datos.

## 1. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com/).
2. En el Editor SQL, ejecuta el siguiente comando para crear la tabla:

```sql
create table cumpleaños (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  apellido text not null,
  fecha_nacimiento date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (opcional, para demo puedes desactivarlo o crear políticas)
alter table cumpleaños enable row level security;

-- Política simple: permitir inserción y lectura a todos (anon)
create policy "Permitir lectura para todos" on cumpleaños for select using (true);
create policy "Permitir inserción para todos" on cumpleaños for insert with check (true);
```

3. Ve a **Project Settings > API** y copia la **Project URL** y la **anon public key**.

## 2. Configurar la Aplicación

1. Abre el archivo `.env` en la raíz del proyecto.
2. Configura tus credenciales:
   ```env
   VITE_SUPABASE_URL=TU_PROJECT_URL
   VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
   ```

## 3. Desplegar en Vercel

1. Sube tu código a GitHub.
2. Conecta con Vercel.
3. Agrega las mismas variables de entorno (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`) en el panel de Vercel.
4. Build Command: `npm run build`, Output Directory: `dist`.
