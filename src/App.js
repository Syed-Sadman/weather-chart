import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
function App() {
  const [input, setInput] = useState("");
  const [inputSearch, seInputSearch] = useState({});
  const [sub, setSub] = useState(false);
  const ApiKey = "27e6dc585b4e91012b40f49699562a2a"; // own unique key found in the OpenWeather account;
  const weatherValue = [];
  // const sevenDayFor = []; // initiated empty array to push temp value from the response data
  var today = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  html2canvas(document.querySelector("#testcanvimg")).then((canvas) => {
    document.body.appendChild(canvas);
  });
  const weatherApi = (input) => {
    const urlApi = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${ApiKey}`;
    axios
      .get(urlApi)
      .then((res) => {
        console.log(res.data);
        seInputSearch(res.data);
        setSub(false);
        console.log(days[today.getDay()]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // return () => {
    //   second
    // }
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setSub(true);
    weatherApi(input);
  };

  const inputChange = (e) => {
    setInput(e.target.value);
    // setSub(false);
  };
  return (
    <>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Type city name"
          value={input}
          onChange={inputChange}
        />
        <button type="Submit">Search</button>
      </form>

      <div id="testcanvimg">
        Hello world
        {sub ? "loading" : ""}
        <h1>{inputSearch.city ? inputSearch.city.name : ""}</h1>
        <div>
          {inputSearch.list
            ? inputSearch.list.slice(0, 7).map((val, index) => {
                weatherValue.push(val.main.temp);
              })
            : ""}

          {weatherValue.length > 0
            ? weatherValue.map((val, index) => {
                return <p key={index}> {val}</p>;
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default App;
