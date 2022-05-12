import React from "react";
import "./App.css";
import axios from "axios";
import { TextField, Autocomplete, Button } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  // Initializing all the state variable
  const [info, setInfo] = useState([]);

  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);
  const [from, setFrom] = useState("");


  // Calling the api whenever the dependency changes
  useEffect(() => {
    axios
      .get(
        `api`,
      )
      .then((res) => {
        setInfo(res?.data?.result);
      });
  }, []);

  useEffect(() => {
    if (from) {
      setOutput(input * from);
    }
  }, [input, from]);

  const handleValue = (value) => {
    setFrom(value.fixing);
  };

  const handleAmount = (e) => {
    setInput(e.target.value);
  };


  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingRight: "10px",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Autocomplete
          options={info}
          getOptionLabel={(option) => option.fromCurrencyCode}
          onChange={(e, newValue) => handleValue(newValue)}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Currency" variant="standard" />
          )}
        />
        <div>
          <TextField
            label="Amount"
            variant="standard"
            onChange={(e) => {
              handleAmount(e);
            }}
          />
        </div>

        <TextField label="Result in RON" value={output.toFixed(2)} disabled />

     
      </div>
    </div>
  );
}

export default App;
