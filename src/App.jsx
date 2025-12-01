import React, { useState } from "react";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";

export default function App() {
  const [data, setData] = useState([
    {
      name: "Page 1",
      celldata: [
        { r: 0, c: 0, v: { v: "Name" } },
        { r: 0, c: 1, v: { v: "Age" } },
        { r: 1, c: 0, v: { v: "João" } },
        { r: 1, c: 1, v: 28 },
      ],
      row: 50,
      column: 26,
      config: {
        cellConfig: {
          "0_0": { editable: false },
          "0_1": { editable: false },
        },
      },
    },

    {
      name: "Page 2",
      celldata: [
        { r: 0, c: 0, v: { v: "Name" } },
        { r: 0, c: 1, v: { v: "Age" } },
        { r: 1, c: 0, v: "Luiz" },
        { r: 1, c: 1, v: 28 },
      ],
      row: 50,
      column: 26,
      config: {
        cellConfig: {
          "1_1": { editable: false },
        },
      },
    },
  ]);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <Workbook
        data={data}
        onChange={setData}
        showToolbar
        showSheetsBar
      />
    </div>
  );
}
