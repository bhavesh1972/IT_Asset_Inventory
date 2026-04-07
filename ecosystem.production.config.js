module.exports = {
  apps: [
    {
      name: 'it-asset-backend-prod',
      script: './backend/server.js',
      cwd: './',
      instances: 'max',  // Use all available CPUs
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    }
  ]
};
