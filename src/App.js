import './App.css';
import React, { useEffect, useState } from "react";

const getData = () => {
  return new Promise((resolve) => resolve([120, 200, 400, 100]));
};

const calculateReward = (inputArr) => {
  let reward = 0;
  inputArr.forEach((amount) => {
    while (amount > 50) {
      if (amount > 100) {
        reward += (amount - 100) * 2;
        amount = 100;
      }
      if (amount > 50) {
        reward += (amount - 50) * 1;
        amount = 50;
      }
    }
  });
  return reward;
};

export default function App() {
  const [spends, setSpends] = useState([]);
  const [reward, setReward] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    getData().then(setSpends);
  }, []);

  useEffect(() => {
    setReward(calculateReward(spends));
  }, [spends]);

  const add = () => {
    setSpends([...spends, +value]);
  };

  return (
    <div className="App">
      Spends:
      {JSON.stringify(spends)}
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>
      <div className="card">Total Reward: {reward}</div>
    </div>
  );
}

