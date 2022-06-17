module.exports = {
  client: 'better-sqlite3',
  connection: process.env.DATABASE_URL || {
    filename: './database.sqlite'
  },
};
