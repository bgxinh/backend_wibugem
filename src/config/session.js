import { Sequelize } from "sequelize";
import session from "express-session";

import passport from "passport";
const configSession = (app) => {
  const SequelizeStore = require("connect-session-sequelize")(session.Store);
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: false,
    }
  );

  // configure express
  // var app = express();

  const myStore = new SequelizeStore({
    db: sequelize,
  });

  app.use(
    session({
      secret: "keyboard cat",
      store: myStore,
      resave: false,
      proxy: true,
      saveUninitialized: false,
    })
  );
  myStore.sync();

  app.use(passport.authenticate("session"));

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, user);
    });
  });
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configSession;
