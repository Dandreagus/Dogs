const express = require("express");
const dog = express.Router();
const { Dog } = require("../db.js");

dog.post("/", async (req, res) => {
  const {
    name,
    altura_max,
    altura_min,
    peso_max,
    peso_min,
    años_vida,
  } = req.body;
  const creado = await Dog.create({
    name: name,
    weight_minimo: altura_max,
    weight_maximo: altura_min,
    height_minimo: peso_min,
    height_maximo: peso_max,
    añosDeVida: años_vida,
  });
  await creado.setCategories([1, 5, 9]);
  res.json(creado);
});

module.exports = dog;
