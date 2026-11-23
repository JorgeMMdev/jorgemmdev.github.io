---
title: Predicción horaria de la demanda eléctrica peninsular
category: TFM · Máster en IA y Big Data
summary: Predigo la demanda eléctrica de la península hora a hora con 24 h de antelación. Mi modelo con LightGBM reduce el error un 48,6 % frente a la referencia, con un MAPE del 2,67 %.
tech: [Python, pandas, LightGBM, TensorFlow/Keras, SARIMAX, scikit-learn, APIs REST]
status: terminado
order: 1
date: 2026-09-10
image: ../../assets/projects/tfm-predicciones.png
draft: false
---

## El problema

Red Eléctrica tiene que casar generación y consumo en tiempo real. Para planificar y operar en el mercado necesita saber cuánta electricidad se va a consumir. En este proyecto predigo la **demanda peninsular hora a hora para el día siguiente**: con los datos disponibles hasta las 23:00, el modelo devuelve las 24 horas del día siguiente.

## Los datos

- **ESIOS (Red Eléctrica):** demanda real peninsular (indicador 1293), descargada con su API REST.
- **AEMET OpenData:** resumen climatológico diario de seis estaciones (Barcelona, Bilbao, Jaén, Madrid, Sevilla y Valencia).
- **Resultado:** 67.127 registros horarios y 47 variables, de enero de 2019 a agosto de 2026, almacenados en Parquet. Las claves de las APIs se gestionan con variables de entorno, fuera del código.

### Lo que hubo que resolver por el camino

- **Tres rupturas en la serie:** el confinamiento de 2020 (lo excluí del entrenamiento), el apagón ibérico del 28 de abril de 2025 (evalué los modelos con y sin esas horas) y un **cambio en cómo Red Eléctrica mide la demanda** desde el 11 de diciembre de 2025, al incorporar el autoconsumo fotovoltaico. Este último lo detecté analizando la relación entre la demanda de día y de noche.
- **Un hueco de 82 días en la estación de Madrid-Retiro**, que rellené con la de Madrid-Aeropuerto tras calibrar el desfase entre ambas sobre 2.685 días comunes.
- **La temperatura no influye de forma lineal:** la demanda sube tanto con el frío como con el calor. La modelé con grados-día de calefacción y refrigeración (umbrales de 16,5 °C y 21 °C).

## Los modelos

Los comparé de menor a mayor complejidad, exigiendo que cada uno mejorara al anterior:

1. **Persistencia** (naïve): repetir el valor de hace 24 horas o de hace una semana.
2. **SARIMAX**, con estacionalidad diaria y variables de calendario y temperatura.
3. **Gradient boosting con LightGBM**, con retardos de 24, 48, 168 y 336 horas e hiperparámetros elegidos con validación cruzada temporal.
4. **Red neuronal recurrente GRU** en TensorFlow/Keras,