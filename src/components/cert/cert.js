import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicCert, getVerifyData } from "../helper/api";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Qrcodetosvg from "./../main/qrCert";

const Cert = (props) => {
  const params = useParams();
  let navigate = useNavigate();
  let targetHash = "";
  targetHash = params.targetHash;
  console.log("targetHash >>", targetHash);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("first");
    getPublicData();
    // await getIssuerData();
  }, []);

  const getPublicData = async () => {
    const data = await getPublicCert(targetHash);
    console.log("getPublicData", data);
    setData(data);
  };

  const dowloadPdf = async () => {
    const input = document.getElementById("content");
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
    const verifyData = await getVerifyData(targetHash);
    const fileName = "verifyData.json";

    const fileToSave = new Blob([JSON.stringify(verifyData)], {
      type: "application/json",
      name: fileName,
    });

    // Save the file
    saveAs(fileToSave, fileName);
  };
  const getUrl = window.location.href

  console.log("data >>", data);
  
  return (
    <div className="certificat-wrapper certificat-wrapper--front">
      <div className="global">
        <div className="right">
          <div className="schoolName bold">
            <div className="republic">trường đại học bách khoa hà nội</div>
            <div className="republic-sub">
              Hanoi University of Science and Technology
            </div>
          </div>
          <div className="mt45 bold">
            <div className="degree-title bold">chứng chỉ tiếng anh</div>
            <div className="degree-title bold">
              hust english language certificate (hustec)
            </div>
          </div>
          <div className="list flex-col al-center ju-center">
            <div className="line">
              <div className="labels">Mr/Miss:</div>
              <div className="details">
                {/* <div className="">Ông/Bà</div> */}
                <div className="">{data.name}</div>
              </div>
            </div>
            <div className="line">
              <div className="labels">Date of Birth:</div>
              <div className="details">{data.dob}</div>
            </div>
            <div className="line">
              <div className="labels">Reading:</div>
              <div className="details">{data.reading}</div>
            </div>
            <div className="line">
              <div className="labels">Listening:</div>
              <div className="details">{data.listening}</div>
            </div>
            <div className="line">
              <div className="labels">Full:</div>
              <div className="details">{data.totalScore}</div>
            </div>
            <div className="line">
              <div className="labels">testDate:</div>
              <div className="details">{data.testDate}</div>
            </div>
            <div className="line">
              <div className="labels">validDate:</div>
              <div className="details">{data.validDate}</div>
            </div>
          </div>
          {/* <div className="date-town">
            TP. Hồ Chí Minh, ngày 19 tháng 03 năm 2020
            <img
                src="https://certificate.bcdiploma.com/pub/images/sign-3.e7bffdf.svg"
                className="small-sign"
              />
          </div> */}
          <div className="qr-code is-flex al-center ju-center">
            <Qrcodetosvg data={getUrl} />
          </div>
          <div className="reg">
            <div className="line1">
              Số hiệu: <span>DTH/1B012806</span>
            </div>
            <div className="line2">
              Số vào sổ cấp bằng: <span>DTH/1B0214/2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cert;
