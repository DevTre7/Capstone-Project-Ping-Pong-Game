require("dotenv").config(); //if this doesnt work use this require('dotenv').config({ path: '../.env' })

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.Bit_io, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        ` drop table if exists scoreboard;
        create table scoreboard (
                id serial primary key, 
                username varchar(100),
                playerpoints int,
                computerpoints int,
                winby_points int
        
            );`
      )
      .then(() => {
        console.log("success");
        res.sendStatus(200);
      })
      .catch((error) => console.log(error));
  },

  //
  addPoints: (req, res) => {
    const { username, playerpoints, computerpoints, winby_points } = req.body;
    sequelize
      .query(
        `insert into scoreboard ( username, playerpoints, computerpoints, winby_points ) 
    values ('${username}', ${playerpoints}, ${computerpoints}, ${winby_points})`
      )
      .then(() => res.sendStatus(200));
  },

  getsScore: (req, res) =>{
    sequelize.query(`SELECT * FROM "scoreboard";
    `).then((db)=> res.status(200).send(db[0]))
  }
};
