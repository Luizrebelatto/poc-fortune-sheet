import React, { useState } from "react";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
  ]);

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

  const importJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      let json = JSON.parse(e.target.result);

      if (!Array.isArray(json)) {
        throw new Error("The JSON file must be an array of spreadsheets.");
      }

      const formattedData = json.map((sheet) => ({
        name: sheet.name || "Sheet",
        celldata: sheet.celldata || [],
        row: sheet.row || 50,
        column: sheet.column || 26,
        config: sheet.config || {},
      }));

      setData(formattedData);
    };
    reader.readAsText(file);
  };

  const exportToExcel = () => {
    const workBook = XLSX.utils.book_new();

    data.forEach((sheet) => {
      const maxRow = Math.max(...sheet.celldata.map((c) => c.r)) + 1;
      const maxCol = Math.max(...sheet.celldata.map((c) => c.c)) + 1;

      const wsData = Array.from({ length: maxRow }, () =>
        Array.from({ length: maxCol }, () => "")
      );

      sheet.celldata.forEach((cell) => {
        wsData[cell.r][cell.c] = cell.v.v;
      });

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(workBook, ws, sheet.name);
    });

    const workBookWrite = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([workBookWrite], { type: "application/octet-stream" }),
      "planilha.xlsx"
    );
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

        <button onClick={exportToExcel} style={{ marginLeft: 20 }}>
          Exportar Excel
        </button>
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
