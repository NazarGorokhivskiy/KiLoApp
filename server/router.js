const express = require("express");
const router = express.Router();

const Panel = require("./models/Panel");

router.get("/", async (req, res) => {
  try {
    const panels = await Panel.findAll({ order: [["id", "DESC"]] });

    res.json({ panels });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const panel = {
      name: body.name,
      quantity: body.quantity,
      department: body.department,
      producer: body.producer,
      market_adress: body.market_adress,
      image: body.image,
    };

    const newPanel = await Panel.create(panel);

    res.json({ newPanel });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const panel = {
      name: body.name,
      quantity: body.quantity,
      department: body.department,
      producer: body.producer,
      market_adress: body.market_adress,
      image: body.image,
    };

    const updatedPanel = await Panel.update(panel, { where: { id } });

    res.json({ updatedPanel });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Panel.destroy({ where: { id } });

    res.json({ message: "Panel was deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
