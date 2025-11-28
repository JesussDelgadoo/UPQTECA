import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('upqteca_v2.db');

export const initDB = () => {
  try {
    // Tablas (Usuarios, Espacios, Reservas)
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matricula TEXT UNIQUE,
        password TEXT,
        nombre TEXT,
        carrera TEXT,
        email TEXT
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
    
    // Usuario con datos completos
    const users = db.getAllSync('SELECT * FROM users');
    if (users.length === 0) {
      db.runSync(
        'INSERT INTO users (matricula, password, nombre, carrera, email) VALUES (?, ?, ?, ?, ?)', 
        ['122041657', '123456', 'Jesus Ramirez Delgado', 'Ing. Tecnologias de la Informacion e Innovacion Digital', '122041657@upq.edu.mx']
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

    console.log('Base de datos actualizada');
  } catch (error) {
    console.error("Error al inicializar la DB:", error);
  }
};

// --- FUNCIONES ---

export const loginUser = (matricula, password) => {
  return db.getFirstSync('SELECT * FROM users WHERE matricula = ? AND password = ?', [matricula, password]);
};

// NUEVA: Obtener usuario por ID para el Perfil
export const getUserById = (id) => {
  return db.getFirstSync('SELECT * FROM users WHERE id = ?', [id]);
};

export const getEspacios = () => {
  return db.getAllSync('SELECT * FROM espacios');
};

export const getMisReservasActivas = (userId) => {
  return db.getAllSync("SELECT * FROM reservas WHERE usuario_id = ? AND estado = 'Activa'", [userId]);
};

export const getHistorial = (userId) => {
  return db.getAllSync("SELECT * FROM reservas WHERE usuario_id = ? AND estado != 'Activa'", [userId]);
};

// ACTUALIZADA: Ahora recibe fecha y hora
export const crearReserva = (userId, espacioNombre, ubicacion, fecha, hora) => {
  db.runSync(
    'INSERT INTO reservas (usuario_id, espacio_nombre, fecha, hora, ubicacion, estado) VALUES (?, ?, ?, ?, ?, ?)', 
    [userId, espacioNombre, fecha, hora, ubicacion, 'Activa']
  );
};

export const cancelarReserva = (id) => {
  db.runSync("UPDATE reservas SET estado = 'Cancelada' WHERE id = ?", [id]);
};