import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [input, setInput] = useState("");
  const [inputSearch, seInputSearch] = useState({});
  const [sub, setSub] = useState(false);
  const ApiKey = "27e6dc585b4e91012b40f49699562a2a"; // own unique key found in the OpenWeather account;

  // const sevenDayFor = []; // initiated empty array to push temp value from the response data
  const weatherApi = (input) => {
    const urlApi = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${ApiKey}`;
    axios
      .get(urlApi)
      .then((res) => {
        console.log(res.data);
        seInputSearch(res.data);
        setSub(false);
        // for (let i = 0; i < 7; i++) {
        //   // sevenDayFor.push(res.data.list[i].main.temp_max);
        //   seInputSearch(i);
        //   console.log(i);
        // }
        // console.log(); // checking the array output in the console
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // return () => {
    //   second
    // }
    // if (sub) {
    //   weatherApi();
    //   console.log(sevenDayFor);
    // } else {
    //   console.log("No city name typed");
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

      <div>
        Hello
        {/* {inputSearch.length > 0
          ? inputSearch.map((val, index) => {
              <div key={index}>{val.list}</div>;
            })
          : ""} */}
        {sub ? "loading" : ""}
        <h1>
          {/* {isLoading?inputSearch.city.name:{}} */}
          {inputSearch.city ? inputSearch.city.name : ""}
        </h1>
        {/* <h3>{inputSearch.list[1].main?.temp}</h3> */}
      </div>
    </>
  );
}

export default App;
