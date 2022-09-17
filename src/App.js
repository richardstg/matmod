import logo from "./logo.svg";
import "./App.css";
import ChartOne from "./task1/chartone";
import Table from "./task2/table";
import ChartTwo from "./task3/charttwo";
import ChartThree from "./task4/chartthree";
import ChartFour from "./task5/chartfour";
import ChartFive from "./task6/chartfive";
import ChartSix from "./task6/chartsix";
import ChartSeven from "./task3/chartseven";
import ChartEight from "./task6/charteight";
import ChartNine from "./task6/chartnine";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Uppgift 1</h1>
            <ChartOne />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Uppgift 2</h1>
            <Table />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Uppgift 3</h1>
            <ChartTwo />
            <ChartSeven />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Uppgift 4</h1>
            <ChartThree />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Uppgift 5</h1>
            <ChartFour />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Uppgift 6</h1>
            <ChartFive />
            <ChartSix />
            <ChartEight />
            <ChartNine />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
