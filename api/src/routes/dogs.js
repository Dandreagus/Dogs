const express = require("express");
const axios = require("axios");
const dogs = express.Router();
const { Dog, Category } = require("../db.js");

dogs.get("/", async (req, res) => {
  var name = req.query.name;
  var responde = await axios("https://api.thedogapi.com/v1/breeds");
  responde = responde.data;

  if (!name) {
    // si no me da un name
    const eight = await responde.filter((x) => x.id < 9);
    const dateDogs = await eight.reduce(
      (acc, e) => [
        ...acc,
        { name: e.name, image: e.image, temperament: e.temperament, id: e.id },
      ],
      []
    );
    res.json(dateDogs);
  } else {
    //busca
    const arr = [];
    responde.map((e) =>
      e.name.includes(name) && arr.length < 9 ? arr.push(e) : undefined
    );
    res.json(arr);
  }
});

dogs.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let api = await axios("https://api.thedogapi.com/v1/breeds");
    api = api.data
      .filter((e) => e.id == id)
      .reduce(
        (acc, e) => [
          ...acc,
          {
            name: e.name,
            image: e.image,
            temperament: e.temperament,
            height: e.height,
            life_span: e.life_span,
            weight: e.weight,
          },
        ],
        []
      );
    if (api.length > 0) {
      return res.json(api);
    } else {
      try {
        const DbDog = await Dog.findByPk(id, {
          include: Category,
        });
        res.json(DbDog);
      } catch (error) {
        res.send(404);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = dogs;
