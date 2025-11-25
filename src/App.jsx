import React, { useState } from "react";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";

export default function App() {
  const [data, setData] = useState([
    {
      name: "Página 1",
      celldata: [
        { r: 0, c: 0, v: "Nome" },
        { r: 0, c: 1, v: "Idade" },
        { r: 1, c: 0, v: "João" },
        { r: 1, c: 1, v: 28 },
      ],
    },
  ]);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <Workbook
        data={data}
        onChange={(updated) => {
          setData(updated);
          console.log("Planilha atualizada:", updated);
        }}
        showToolbar
        showSheetsBar
      />
    </div>
  );
}
