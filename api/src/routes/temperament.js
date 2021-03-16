const express = require("express");
const axios = require("axios");
const { Category } = require("../db.js");
const temp = express.Router();

temp.get("/", async (req, res) => {
  try {
    const cargadas = await Category.findAll();
    if (cargadas.length === 0) {
      let resp = await axios.get("https://api.thedogapi.com/v1/breeds");
      resp = resp.data;
      var temps = resp
        .map((e) => e.temperament)
        .join("")
        .split(", ");

      var unique = [...new Set(temps)];
      unique.map((e) =>
        Category.create({
          name: e,
        })
      );
      res.json(temps);
    } else {
      return res.send("Categorias ya cargadas");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = temp;
