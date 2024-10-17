const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());

const path = require("path");
app.use("/fotos_juegos", express.static(path.join(__dirname, "fotos_juegos")));
app.use(
  "/fotos_entretenimiento",
  express.static(path.join(__dirname, "fotos_entretenimiento"))
);
app.use(
  "/fotos_general",
  express.static(path.join(__dirname, "fotos_general"))
);

const preguntasGeneral = require("./preguntasGeneral.json");
const preguntasEntretenimiento = require("./preguntasEntretenimiento.json");
const preguntasJuegos = require("./preguntasJuegos.json");

function mezclarPreguntas(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get("/api/preguntasGeneral", (req, res) => {
  const cantidad = req.query.cantidad || 10;
  const seleccionadas = mezclarPreguntas(preguntasGeneral).slice(0, cantidad);
  res.json(seleccionadas);
});

app.get("/api/preguntasEntretenimiento", (req, res) => {
  const cantidad = req.query.cantidad || 10;
  const seleccionadas = mezclarPreguntas(preguntasEntretenimiento).slice(
    0,
    cantidad
  );
  res.json(seleccionadas);
});

app.get("/api/preguntasJuegos", (req, res) => {
  const cantidad = req.query.cantidad || 10;
  const seleccionadas = mezclarPreguntas(preguntasJuegos).slice(0, cantidad);
  res.json(seleccionadas);
});

app.listen(PORT, () => {
  console.log(`API lanzada en http://localhost:${PORT}/api/preguntas`);
});

module.exports = app;
