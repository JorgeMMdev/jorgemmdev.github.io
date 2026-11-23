---
title: Predicción horaria de la demanda eléctrica peninsular
category: TFM · Máster en IA y Big Data
summary: Predigo la demanda eléctrica de la península hora a hora con 24 h de antelación, cruzando el histórico de Red Eléctrica con datos meteorológicos de AEMET.
tech: [Python, pandas, PyTorch, Prophet, SARIMAX, APIs REST]
status: terminado
order: 1
date: 2026-06-01
draft: true
image: ../../assets/projects/tfm-portada.jpg
---

## El problema

Red Eléctrica tiene que casar generación y consumo en tiempo real. Para planificar y operar en el mercado necesita saber cuánta electricidad se va a consumir. Este proyecto predice la demanda peninsular **hora a hora con 24 horas de antelación**.

## Los datos

- **ESIOS (Red Eléctrica):** demanda real peninsular, descargada mediante su API REST.
- **AEMET OpenData:** seis estaciones repartidas por la península (Madrid, Barcelona, Sevilla, Bilbao, Valencia y Jaén).
- **Resultado:** unos 67.000 registros horarios con 47 variables (2019–2026), sin nulos, en Parquet.

### Lo más difícil: el ETL

- La agregación horaria de ESIOS **sumaba** los valores en lugar de promediarlos, algo incorrecto para una magnitud de potencia. Lo corregí.
- En 2023 la serie pasó de 10 a 5 minutos de resolución, y hubo que unificarla.
- Rellené los huecos de temperatura con estaciones auxiliares muy correlacionadas.
- Marqué el **apagón ibérico del 28 de abril de 2025** como evento excepcional.

## Los modelos

Los comparé de menor a mayor complejidad:

1. Baseline naïve (persistencia estacional)
2. SARIMAX y Prophet
3. Gradient boosting: [LightGBM / XGBoost]
4. Redes recurrentes LSTM y GRU en PyTorch, entrenadas en GPU con CUDA

## Resultados

[El mejor modelo fue X, con un MAPE del X % y un MAE de X MW en test: una mejora del X % frente al baseline.]

[Hallazgo clave.]