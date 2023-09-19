// src/App.tsx
import React from "react";
import TableComponent from "./components/TableComponent";
import { countries } from "./data/countries"; // Assuming you have a file with country data

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ padding: "20px" }}>The Country</h1>
      <TableComponent countries={countries} />
    </div>
  );
};

export default App;
