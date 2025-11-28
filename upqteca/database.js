import * as SQLite from 'expo-sqlite';

// CAMBIO IMPORTANTE: Cambiamos a v6 para forzar una base de datos nueva y limpia
export const db = SQLite.openDatabaseSync('upqteca_v9.db');

export const initDB = () => {
  try {
    // 1. Tabla USUARIOS (Ahora incluye 'foto')
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matricula TEXT UNIQUE,
        password TEXT,
        nombre TEXT,
        carrera TEXT,
        cuatrimestre TEXT,
        email TEXT,
        foto TEXT  -- <--- ESTA ES LA COLUMNA QUE FALTABA
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS espacios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        ubicacion TEXT,
        estado TEXT,
        capacidad INTEGER,
        equipamiento TEXT
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS reservas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        espacio_nombre TEXT,
        fecha TEXT,
        hora TEXT,
        ubicacion TEXT,
        estado TEXT,
        rating INTEGER DEFAULT 0
      );
    `);

    // --- DATOS DE PRUEBA ---
    
    const users = db.getAllSync('SELECT * FROM users');
    if (users.length === 0) {
      db.runSync(
        'INSERT INTO users (matricula, password, nombre, carrera, cuatrimestre, email, foto) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        ['122041657', '123456', 'Jesus Ramirez Delgado', 'Ing. Tecnologias de la Informacion e Innovacion Digital', '4°', '122041657@upq.edu.mx', null]
      );
    }

    // Espacios
    const espacios = db.getAllSync('SELECT * FROM espacios');
    if (espacios.length === 0) {
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Grupal 1', 'Biblioteca', 'disponible', 6, '6 Sillas, Mesa Grande']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Grupal 2', 'Biblioteca', 'disponible', 6, '6 Sillas, Mesa Grande']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 1', 'Biblioteca', 'ocupado', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 2', 'Biblioteca', 'disponible', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 3', 'Biblioteca', 'disponible', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 4', 'Biblioteca', 'ocupado', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 5', 'Biblioteca', 'disponible', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 6', 'Biblioteca', 'ocupado', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 7', 'Biblioteca', 'disponible', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 8', 'Biblioteca', 'disponible', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 9', 'Biblioteca', 'disponible', 1, '1 Computadora']);
      db.runSync('INSERT INTO espacios (nombre, ubicacion, estado, capacidad, equipamiento) VALUES (?, ?, ?, ?, ?)', ['Cubículo Individual 10', 'Biblioteca', 'ocupado', 1, '1 Computadora']);
    }

    // RESERVAS (NUEVO BLOQUE)

    const reservas = db.getAllSync('SELECT * FROM reservas');

    if (reservas.length === 0) {

        // 1. Reserva Activa (Para que aparezca en el Home)

        db.runSync('INSERT INTO reservas (usuario_id, espacio_nombre, fecha, hora, ubicacion, estado) VALUES (?, ?, ?, ?, ?, ?)', 

            [1, 'Cubículo Grupal 1', 'Hoy', '14:00 - 16:00', 'Biblioteca', 'Activa']);

        

        // 2. Reserva Completada (Historial)

        db.runSync('INSERT INTO reservas (usuario_id, espacio_nombre, fecha, hora, ubicacion, estado, rating) VALUES (?, ?, ?, ?, ?, ?, ?)', 

            [1, 'Cubículo Individual 2', '20 Nov 2025', '10:00 - 12:00', 'Biblioteca', 'Completada', 5]);



        // 3. Reserva Cancelada (Historial)

        db.runSync('INSERT INTO reservas (usuario_id, espacio_nombre, fecha, hora, ubicacion, estado, rating) VALUES (?, ?, ?, ?, ?, ?, ?)', 

            [1, 'Cubículo Individual 5', '18 Nov 2025', '08:00 - 10:00', 'Biblioteca', 'Cancelada', 0]);



        // 4. Otra Completada (Historial)

        db.runSync('INSERT INTO reservas (usuario_id, espacio_nombre, fecha, hora, ubicacion, estado, rating) VALUES (?, ?, ?, ?, ?, ?, ?)', 

            [1, 'Cubículo Individual 8', '15 Nov 2025', '12:00 - 14:00', 'Biblioteca', 'Completada', 4]);

    }

    console.log('Base de datos v9 inicializada correctamente');
  } catch (error) {
    console.error("Error al inicializar la DB:", error);
  }
};

// --- FUNCIONES ---

export const loginUser = (matricula, password) => {
  return db.getFirstSync('SELECT * FROM users WHERE matricula = ? AND password = ?', [matricula, password]);
};

export const updateUserInfo = (id, nombre, email, password, carrera, cuatrimestre) => {
    try {
        db.runSync(
            'UPDATE users SET nombre = ?, email = ?, password = ?, carrera = ?, cuatrimestre = ? WHERE id = ?',
            [nombre, email, password, carrera, cuatrimestre, id]
        );
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
};

// Función para actualizar la foto (Esta es la que estaba fallando)
export const updateUserPhoto = (id, fotoUri) => {
    try {
        db.runSync('UPDATE users SET foto = ? WHERE id = ?', [fotoUri, id]);
        return true;
    } catch (e) {
        console.error("Error al actualizar foto:", e);
        return false;
    }
};

export const registerUser = (matricula, password, nombre, carrera, cuatrimestre, email) => {
  try {
    db.runSync(
      'INSERT INTO users (matricula, password, nombre, carrera, cuatrimestre, email, foto) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [matricula, password, nombre, carrera, cuatrimestre, email, null]
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const performCheckIn = (reservaId) => {
    try {
        db.runSync("UPDATE reservas SET estado = 'En Curso' WHERE id = ?", [reservaId]);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const performCheckOut = (reservaId) => {
    try {
        db.runSync("UPDATE reservas SET estado = 'Completada' WHERE id = ?", [reservaId]);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getUserById = (id) => {
  return db.getFirstSync('SELECT * FROM users WHERE id = ?', [id]);
};

export const getEspacios = () => {
  return db.getAllSync('SELECT * FROM espacios');
};

export const getMisReservasActivas = (userId) => {
  return db.getAllSync(
    "SELECT * FROM reservas WHERE usuario_id = ? AND (estado = 'Activa' OR estado = 'En Curso')", 
    [userId]
  );
};

export const getHistorial = (userId) => {
  return db.getAllSync(
    "SELECT * FROM reservas WHERE usuario_id = ? AND estado != 'Activa'", 
    [userId]
  );
};


export const crearReserva = (userId, espacioNombre, ubicacion, fecha, hora) => {
  db.runSync(
    'INSERT INTO reservas (usuario_id, espacio_nombre, fecha, hora, ubicacion, estado) VALUES (?, ?, ?, ?, ?, ?)', 
    [userId, espacioNombre, fecha, hora, ubicacion, 'Activa']
  );
};

export const cancelarReserva = (id) => {
  db.runSync("UPDATE reservas SET estado = 'Cancelada' WHERE id = ?", [id]);
};