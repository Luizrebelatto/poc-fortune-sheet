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
        { r: 1, c: 1, v: { v: 28 } },
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
  ]);

  // Exporta a planilha para JSON
  const exportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "planilha.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Importa JSON para o Workbook
  const importJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      setData(json); // Atualiza o Workbook
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={exportJSON}>Exportar JSON</button>
        <input
          type="file"
          accept=".json"
          onChange={importJSON}
          style={{ marginLeft: 10 }}
        />
      </div>

      <div style={{ height: "80vh", width: "100%" }}>
        <Workbook
          data={data}
          onChange={setData}
          showToolbar
          showSheetsBar
        />
      </div>
    </div>
  );
}
