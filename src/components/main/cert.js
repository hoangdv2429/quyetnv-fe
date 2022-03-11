import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
// import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  formatClassification,
  formatStudyMode,
  removeAccents,
} from "../helper/format";
import { getPublicCert, getVerifyData } from "../helper/api";

const Cert = (props) => {
  const params = useParams();
  let targetHash = "";
  targetHash = params.targetHash;
  console.log(targetHash);
  const [data, setData] = useState();

  useEffect(async () => {
    console.log("first");
    await getPublicData();
  }, [targetHash]);

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
  console.log("data >>", data);
  return (
    <div className="certificat-wrapper certificat-wrapper--front">
      <div className="global">
        <div className="right">
          <div className="republic">trường đại học bách khoa hà nội</div>
          <div className="republic-sub">
            Hanoi University of Science and Technology
          </div>
          <div className="mt45 bold">
            <div className="degree-title bold">chứng chỉ tiếng anh</div>
            <div className="degree-title bold">
              hust english language certificate (hustec)
            </div>
          </div>
          <div className="list">
            <div className="line">
              <div className="labels">Cho:</div>
              <div className="name">
                <span>Bà</span> Nguyễn Kim Ngọc
              </div>
            </div>
            <div className="line">
              <div className="labels">Ngày sinh:</div>
              <div className="details">09/01/1997</div>
            </div>
            <div className="line">
              <div className="labels">Năm tốt nghiệp:</div>
              <div className="details">2020</div>
            </div>
            <div className="line">
              <div className="labels">Xếp loại tốt nghiệp:</div>
              <div className="details">Giỏi</div>
            </div>
            <div className="line">
              <div className="labels">Hình thức đào tạo:</div>
              <div className="details">Chính quy</div>
            </div>
          </div>
          <div className="date-town">
            TP. Hồ Chí Minh, ngày 19 tháng 03 năm 2020
            {/* <img
                src="https://certificate.bcdiploma.com/pub/images/sign-3.e7bffdf.svg"
                className="small-sign"
              /> */}
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
