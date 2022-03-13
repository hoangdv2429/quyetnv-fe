import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicCert, getVerifyData } from "../helper/api";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Qrcodetosvg from "./../main/qrCert";
const Web3Utils = require('web3-utils');


const PrintCert = (props) => {

  const getTargetHash = () => {
    const cert = props.data;
    const propHashs = [];
    const data = Object.values(cert);
    data.map((value) => {
      propHashs.push(Web3Utils.sha3(value.toString()));
    });
    propHashs.sort();
    const targetHash = Web3Utils.sha3(propHashs.join(''));
  }
  return (
    <div className="certificat-wrapper certificat-wrapper--front">
      <div className="global">
        <div className="right">
          <div className="schoolName bold">
            <div className="republic">Trường đại học Bách Khoa Hà Nội</div>
            <div className="republic-sub">
              Hanoi University of Science and Technology
            </div>
          </div>
          <div className="mt45 bold">
            <div className="degree-title bold">Chứng chỉ tiếng Anh</div>
            <div className="degree-title bold">
              Hust English language Certificate (hustec)
            </div>
          </div>
          <div className="list flex-col al-center ju-center">
            <div className="line">
              <div className="labels">Mr/Miss:</div>
              <div className="details">
                {/* <div className="">Ông/Bà</div> */}
                <div className="">{props.data.name}</div>
              </div>
            </div>
            <div className="line">
              <div className="labels">Date of Birth:</div>
              <div className="details">{props.data.dob}</div>
            </div>
            <div className="line">
              <div className="labels">Reading:</div>
              <div className="details">{props.data.reading}</div>
            </div>
            <div className="line">
              <div className="labels">Listening:</div>
              <div className="details">{props.data.listening}</div>
            </div>
            <div className="line">
              <div className="labels">Full:</div>
              <div className="details">{props.data.totalScore}</div>
            </div>
            <div className="line">
              <div className="labels">testDate:</div>
              <div className="details">{props.data.testDate}</div>
            </div>
            <div className="line">
              <div className="labels">validDate:</div>
              <div className="details">{props.data.validDate}</div>
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
            <Qrcodetosvg data={getTargetHash} />
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

export default PrintCert;
