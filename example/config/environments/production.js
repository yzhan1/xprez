/**
 * Production environment config
 */
export default {
  port: process.env.PORT || 3000,

  db: 'mysql://host1:33060/prod-db'
};
