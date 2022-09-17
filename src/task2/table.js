import React from "react";

import horbyData from "../data/horby";
import karlskronaData from "../data/karlskrona";
import olandData from "../data/oland";

function calculateAverage(array) {
  var total = 0;
  var count = 0;

  array.forEach(function (item, index) {
    total += parseFloat(item);
    count++;
  });

  return total / count;
}

function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
}

function correlationCoefficient(X, Y) {
  let n = X.length;
  let sum_X = 0,
    sum_Y = 0,
    sum_XY = 0;
  let squareSum_X = 0,
    squareSum_Y = 0;

  for (let i = 0; i < n; i++) {
    // Sum of elements of array X.
    sum_X = sum_X + parseFloat(X[i]);

    // Sum of elements of array Y.
    sum_Y = sum_Y + parseFloat(Y[i]);

    // Sum of X[i] * Y[i].
    sum_XY = sum_XY + parseFloat(X[i]) * parseFloat(Y[i]);

    // Sum of square of array elements.
    squareSum_X = squareSum_X + parseFloat(X[i]) * parseFloat(X[i]);
    squareSum_Y = squareSum_Y + parseFloat(Y[i]) * parseFloat(Y[i]);
  }

  // Use formula for calculating correlation
  // coefficient.
  let corr =
    (n * sum_XY - sum_X * sum_Y) /
    Math.sqrt(
      (n * squareSum_X - sum_X * sum_X) * (n * squareSum_Y - sum_Y * sum_Y)
    );

  return corr.toFixed(2);
}

export default function Table() {
  const horbyTemp = horbyData.map((d) => d.temp);
  const karlskronaTemp = karlskronaData.map((d) => d.temp);
  const olandTemp = olandData.map((d) => d.temp);

  return (
    <div>
      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">Väderstation</th>
            <th scope="col">Medelvärde (°C)</th>
            <th scope="col">Standardavvikelse (°C)</th>
            <th scope="col">Max (°C)</th>
            <th scope="col">Min (°C)</th>
            <th scope="col">Korrelationskoefficient Hörby</th>
            <th scope="col">Korrelationskoefficient Karlskrona</th>
            <th scope="col">Korrelationskoefficient Öland</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Hörby</th>
            <td>{calculateAverage(horbyTemp).toFixed(1)}</td>
            <td>{getStandardDeviation(horbyTemp).toFixed(3)}</td>
            <td>{Math.max(...horbyTemp)}</td>
            <td>{Math.min(...horbyTemp)}</td>
            <td>-</td>
            <td>karlskrona hörby {correlationCoefficient(karlskronaTemp, horbyTemp)}</td>
            <td>öland hörby {correlationCoefficient(olandTemp, horbyTemp)}</td>
          </tr>
          <tr>
            <th scope="row">Karlskrona</th>
            <td>{calculateAverage(karlskronaTemp).toFixed(1)}</td>
            <td>{getStandardDeviation(karlskronaTemp).toFixed(3)}</td>
            <td>{Math.max(...karlskronaTemp)}</td>
            <td>{Math.min(...karlskronaTemp)}</td>
            <td>
              Karlskrona - hörby{" "}
              {correlationCoefficient(horbyTemp, karlskronaTemp)}
            </td>
            <td>-</td>
            <td>Öland Karlskrona {correlationCoefficient(olandTemp, karlskronaTemp)}</td>
          </tr>
          <tr>
            <th scope="row">Öland</th>
            <td>{calculateAverage(olandTemp).toFixed(1)}</td>
            <td>{getStandardDeviation(olandTemp).toFixed(3)}</td>
            <td>{Math.max(...olandTemp)}</td>
            <td>{Math.min(...olandTemp)}</td>
            <td>{correlationCoefficient(horbyTemp, olandTemp)}</td>
            <td>{correlationCoefficient(karlskronaTemp, olandTemp)}</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
