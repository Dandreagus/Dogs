const express = require("express");
const dog = express.Router();
const { Dog } = require("../db.js");

dog.post("/", async (req, res) => {
  console.log(req.body.name);
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
    weight_minimo: peso_min,
    weight_maximo: peso_max,
    height_minimo: altura_min,
    height_maximo: altura_max,
    añosDeVida: años_vida,
  });
  await creado.setCategories([1, 5, 9]);
  res.json(creado);
});

module.exports = dog;
