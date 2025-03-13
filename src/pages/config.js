const config = {
  port: import.meta.env.PORT || 5000,
  db: {
    host: import.meta.env.DB_HOST,
    user: import.meta.env.DB_USER,
    password: import.meta.env.DB_PASS,
    database: import.meta.env.DB_NAME,
  },
  jwtSecret: import.meta.env.JWT_SECRET,
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
};

export default config;
