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
})()

// Función para convertir grados Fahrenheit a Celsius
const f = document.getElementById("fahrenheit");
f.addEventListener("input", () => {
  const f = document.getElementById("fahrenheit");
  const valor = parseFloat(f.value);
  document.getElementById("grados").innerHTML = valor;

  if (model != null) {
    const tensor = tf.tensor1d([valor]);
    const pred = model.predict(tensor).dataSync()[0];
    const c = pred.toFixed(2);
    document.getElementById("resultado").innerHTML = `${valor} ºF = ${c} ºC`;
  } else {
    document.getElementById("resultado").innerHTML =
      "Intenta de nuevo en un momento...";
  }
})
