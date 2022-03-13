import React, { useState } from "react";
import Header from "./../layout/header";
import Footer from "./../layout/Footer";
import Navigation from "./navigation";
import { wrapData } from "../helper/api";
import * as XLSX from 'xlsx';
import Cert from "../cert/cert.js";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getAxiosInstance } from "../helper/config"
import PrintCert from "../cert/printCert";

const Esign = () => {
  console.log(localStorage.getItem('roles'));
  const [data, setData] = useState([]);
  const convertToJson = (csv) => {
    var lines = csv.split('\n');
    var result = [];

    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length - 1; i++) {
      //csv auto add \n at the end of file, to be fix
      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result; //JavaScript object
  };

  const filePathset = async (e) => {
    var file = e.target.files[0];
    await handleChange(file);
  };

  const handleChange = async (file) => {
    var f = file;
    // var name = f.name;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      /* Update state */
      console.log(convertToJson(data)); // shows data in json format
      // await wrapData(convertToJson(data)); //upload to mongo
      // UploadCert(convertToJson(data));
      setData(convertToJson(data));
    };
    reader.readAsBinaryString(f);
  };

  //for upload cert to mongo
  const UploadCert = async (theData) => {
      await wrapData(theData);
  }

  const dowloadPdf = async () => {
    data.map((student, index) => {
      const input = document.getElementById(index.toString());
      console.log(document);
      html2canvas(input, {useCORS: true})
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        // const pdf = new jsPDF('l', null, null, true);
        const pdf = new jsPDF ("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        // pdf.output('dataurlnewwindow');
        pdf.save(`${student.studentId}.pdf`);
      })
    ;
    })
  }

  //rename json object
  const renameJsonObjectAttribute = (json, oldAttName, newAttName) => {
    json[newAttName]= json[oldAttName];
    delete json[oldAttName];
  }

  const modifyJsonObjName = (json, mapOfName) => {
      // const arr = JSON.parse(json);
      for (let obj of json) {
        for ( const [oldName, newName] of mapOfName) {
          renameJsonObjectAttribute(obj, oldName, newName);
        }
      }
      const updatedJson = JSON.stringify( json );
      console.log ( updatedJson );
  }

  return (
    <>
      <Header />
      <Navigation />
      <div className="bg__full is-flex ju-center al-center">
        <div className="esign--wrapper is-flex ju-center al-end">
          <div className="load-pdf--wrapper is-flex-col al-center ju-center">
            <div className="load-pdf__icon">
              <i className="far fa-file-excel"></i>
            </div>
            <div className="load-pdf__title">
              Upload your Excel to start storing and signing!
            </div>
            <div className="load-pdf__btn">
              <div class="upload-btn-wrapper">
                <button class="btn">Load Exel</button>
                <input type="file" name="myfile" onChange={filePathset.bind()} />
                
              </div>
            </div>
            <div className="load-pdf__btn">
              <div class="upload-btn-wrapper">
                <button class="btn" onClick={dowloadPdf}>Download PDFs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {data.map((student, index) => {
        return (
          <PrintCert id={index.toString()} style="display:none" data={student}></PrintCert>
        )
      })}
      
    </>
  );
};

export default Esign;
