const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const resultado = document.getElementById("resultado");
const resultados = document.getElementById("resultados");

const MAP_FLOWERS = {
  0: "daisy",
  1: "dandelion",
  2: "rose",
  3: "sunflower",
  4: "tulip",
};

let model = null;

// Función para cargar el modelo de TensorFlow utilizando async/await
(async () => {
  try {
    console.log("Cargando modelo...");
    model = await tf.loadLayersModel("model.json");
    console.log("¡Modelo cargado!");
  } catch (error) {
    console.error("Error al cargar el modelo:", error);
    alert("No se pudo cargar el modelo. Intenta de nuevo más tarde.");
  }
})();

fileInput.addEventListener("change", function () {
  resultado.innerText = "";
  resultados.innerHTML = "";
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
    predictImage(preview);
  });

  reader.readAsDataURL(fileInput.files[0]);
});

const predictImage = async (image) => {
  await image.decode();
  const tensorImg = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([64, 64])
    .toFloat()
    .div(tf.scalar(255))
    .expandDims();
  const pred = await model.predict(tensorImg).data();

  let i = pred.indexOf(Math.max(...pred));
  resultado.innerText = `Predicción: ${MAP_FLOWERS[i]}(${pred[i]})`;

  pred.forEach((e, i) => {
    resultados.innerHTML += `<tr>
      <td>${MAP_FLOWERS[i]}</td>
      <td><progress min='0' value='${e}' max='1'></progress></td>
      <td>${Math.round(e * 100) / 100}</td>
    </tr>`;
  });
};
