import React, { useState } from "react";
import Header from "./../layout/header";
import Footer from "./../layout/Footer";
import Navigation from "./navigation";
import { wrapData } from "../helper/api";
import * as XLSX from "xlsx";
import Cert from "../cert/cert.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getAxiosInstance } from "../helper/config";

import PrintCert from "../cert/printCert";

const Esign = () => {
  const [openSub, setOpenSub] = useState(false);

  const clickOpenSub = () => {
    setOpenSub(!openSub);
  };

  let arrayQdefinedSet = [
    "dob",
    "listening",
    "reading",
    "totalScore",
    "testDate",
    "validDate",
    "identifyNumber",
    "studentId",
    "name",
  ];

  const [formData, setFormData] = useState({});
  const changeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("formData", formData);
  };

  //rename json object
  const renameJsonObjectAttribute = (json, oldAttName, newAttName) => {
    json[newAttName] = json[oldAttName];
    delete json[oldAttName];
  };

  const modifyJsonObjName = (json, mapOfName) => {
    // const arr = JSON.parse(json);
    console.log("mapOfName :>> ", mapOfName);
    const map = new Map(Object.entries(mapOfName));
    for (let obj of json) {
      for (const [newName, oldName] of map) {
        renameJsonObjectAttribute(obj, oldName, newName);
      }
    }
    // const updatedJson = JSON.stringify(json);
    console.log("json", json);
    return json;
  };

  const [convertData, setConvertData] = useState({
    dob: "Ngày sinh",
    listening: "Listening",
    reading: "Reading",
    totalScore: "Tổng điểm",
    testDate: "Ngày thi",
    validDate: "Hiệu lực",
    identifyNumber: "Số căn cước",
    studentId: "MSSV",
    name: "Họ tên",
  });

  const [data, setData] = useState([]);
  const convertToJson = (csv) => {
    var lines = csv.split("\n");
    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length - 1; i++) {
      //csv auto add \n at the end of file, to be fix
      var obj = {};
      var currentline = lines[i].split(",");

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
    clickOpenSub();
  };

  const handleChange = async (file) => {
    var f = file;
    // var name = f.name;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      /* Update state */
      console.log("convertToJson(data) >>", convertToJson(data)); // shows data in json format
      // await wrapData(convertToJson(data)); //upload to mongo
      // UploadCert(convertToJson(data));
      const subData = convertToJson(data);
      setData(subData);
    };
    reader.readAsBinaryString(f);
  };

  //for upload cert to mongo
  const UploadCert = async (theData) => {
    console.log("theData >>>", theData)
    await wrapData(theData);
  };

  const [printCertState, setPrinCertState] = useState(false)

  const clickOK = () => {
    // modifyJsonObjName(data,formData)
    console.log('clickOK :>> ');
    UploadCert(modifyJsonObjName(data, formData));
    setPrinCertState(true)
    downloadPdf()
  };

  const downloadPdf = async () => {
    data.map((student, index) => {
      const input = document.getElementById(index.toString());

      console.log("document >>", document);
      html2canvas(input, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        // const pdf = new jsPDF('l', null, null, true);
        const pdf = new jsPDF("l");

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        // pdf.output('dataurlnewwindow');

        pdf.save(`${student.studentId}.pdf`);
      });
    });
  };

  //ultis for spotting abnormal in excel files
  const spotDifferentField = (currentSet, predefinedSet, diffField) => {
    let equal = false;
    for (const key in currentSet) {
      for (const keyTwo in predefinedSet) {
        if (currentSet[key] === predefinedSet[keyTwo]) {
          equal = true;
          break;
        }
      }
      if (equal !== true) diffField.push(currentSet[key]);
      equal = false;
    }

    return diffField;
  };

  /* getting oject properties and compare to predefined set */
  const DiffPropertiesOfObject = (object) => {
    console.log("object", object);
    let _currentSet = Object.getOwnPropertyNames(object);
    let diffField = [];
    spotDifferentField(_currentSet, arrayQdefinedSet, diffField);
    // console.log("_currentSet :>> ", _currentSet);
    // console.log("arrayQdefinedSet :>> ", arrayQdefinedSet);
    // console.log("diffField :>> ", diffField);
    return diffField;
  };

  const spotSameField = (currentSet, predefinedSet, sameField) => {
    let equal = false;
    for (const key in currentSet) {
      for (const keyTwo in predefinedSet) {
        if (currentSet[key] === predefinedSet[keyTwo]) {
          equal = true;
          break;
        }
      }
      if (equal === true) sameField.push(currentSet[key]);
      equal = false;
    }

    return sameField;
  };
  const [mapArr, setMapArr] = useState([]);

  const SamePropertiesOfObject = (object) => {
    let _currentSet = Object.getOwnPropertyNames(object);
    let sameField = [];
    spotSameField(_currentSet, arrayQdefinedSet, sameField);
    const mapArrSub = arrDiff(sameField, arrayQdefinedSet);
    setMapArr(mapArrSub);
    return sameField;
  };

  const arrDiff = (a1, a2) => {
    var a = [],
      diff = [];

    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }

    for (var k in a) {
      diff.push(k);
    }
    return diff;
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="screen-body">
        <div className="main-screen h-full">
          <div className="bg__full is-flex ju-center al-center h-full">
            <div className="esign--wrapper is-flex ju-center al-center h-full">
              <div className="load-pdf--wrapper is-flex-col al-center ju-center h-full">
                <div className="load-pdf__icon">
                  <i className="far fa-file-excel"></i>
                </div>
                <div className="load-pdf__title">
                  Upload your Excel to start storing and signing!
                </div>
                <div className="load-pdf__btn">
                  <div class="upload-btn-wrapper">
                    <button class="btn">Load Exel</button>
                    <input
                      type="file"
                      name="myfile"
                      onChange={filePathset.bind()}
                    />
                  </div>
                </div>
                <div className="load-pdf__btn">
                  <div class="upload-btn-wrapper">
                    <button class="btn" onClick={downloadPdf}>
                      Download PDFs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={openSub ? "sub-screen" : "sub-screen dis-none"}></div>
        <div
          className={
            openSub
              ? "screen--convert__wrapper flex-col al-center ju-center"
              : "screen--convert__wrapper flex-col al-center ju-center dis-none"
          }
        >
          <div className="screen--convert__title bold">Chuyển đổi</div>
          <div className="screen--convert__body flex-col al-center ju-center mt-10">
            {mapArr.map((mapArrCurr, mapArrIndex) => {
              console.log("mapArr", mapArr);
              return (
                <div className="screen--convert__items is-flex al-center ju-center">
                  <div class="effect mw-160 is-flex ju-center al-center">
                    <label>{convertData[mapArrCurr]}</label>
                  </div>
                  <div className="mlr8">
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </div>
                  <div class="input-effect">
                    <input
                      class="effect effect__pw"
                      type="text"
                      name={mapArrCurr}
                      onChange={changeFormData}
                    />
                    <label>{mapArrCurr}</label>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="screen--convert__footer is-flex al-center ju-center">
            <div
              className="screen--convert__footer--btn hover-blue ml300"
              onClick={() => SamePropertiesOfObject(data[0])}
            >
              Check
            </div>
            <div
              className="screen--convert__footer--btn hover-red"
              onClick={clickOpenSub}
            >
              Close
            </div>
            <div
              className="screen--convert__footer--btn hover-blue"
              onClick={clickOK}
            >
              OK
            </div>
          </div>
        </div>
        {data.map((student, index) => {
          return (
            // <div className={printCertState ? "" : "dis-none" }>
              <PrintCert
                id={index.toString()}
                style="display:none"
                data={student}
              ></PrintCert>
            // </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Esign;
