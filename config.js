"use strict";
const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eaxpnr0.mongodb.net/addventuresDB?retryWrites=true&w=majority`
const PORT = process.env.PORT || 8081;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  DATABASE_URL,
  PORT,
  JWT_SECRET
};
//:warning:***NOTE: IF YOU CHANGE ENVIRONMENT VARIABLES, YOU ***MUST**** RESTART SERVER EVEN IF USING NODEMON:warning: