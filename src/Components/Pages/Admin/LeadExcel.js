import React, { useState } from "react";
import MaterialTable from "material-table";
import XLSX from "xlsx";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Excelleads() {
  const [colDefs, setColDefs] = useState();
  const [Cdata, setData] = useState();

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });
      console.log(`From workBook =  ${workBook}`);

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const worksheet = workBook.Sheets[workSheetName];
      //convert to array

      const fileData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = fileData[0];

      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
      fileData.splice(0, 1);
      setData(convertToJson(headers, fileData));
    };
    reader.readAsBinaryString(file);
  };

  const Postdata = async (e) => {
    e.preventDefault();

    const res = await fetch("/excelleads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Cdata),
    });

    const data = await res.json();

    console.log(data.message);

    if (!data) {
      window.alert("Something went wrong");
    } else {
      window.alert(data.message);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="App">
        <h1 align="center">React-App</h1>
        <h4 align="center">Import Data from Excel</h4>
        <input type="file" onChange={importExcel} />
        <input
          type="submit"
          name="signup"
          id="signup"
          value="register"
          onClick={Postdata}
        />
        {/* <MaterialTable title="Customer Data" data={Cdata} columns={colDefs} /> */}
      </div>
    </>
  );
}

export default Excelleads;
