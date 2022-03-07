import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatClassification, formatStudyMode, removeAccents } from '../helper/format';
import { getPublicCert, getIssuer, getVerifyData } from '../helper/api';

const Cert = (props) => {
  const params = useParams();
  const targetHash = params.targetHash;
  console.log(targetHash);
  const [data, setData] = useState();
  const [issuer, setIssuer] = useState();

  useEffect(async() => {
    await getPublicData();
    // await getIssuerData();
  }, []);

  const getPublicData = async () => {
    const data = await getPublicCert(targetHash);
    setData(data.data);
    setIssuer(data.issuer);
  };

  const dowloadPdf = async () => {
    const input = document.getElementById('content');
    html2canvas(input, {useCORS: true})
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
    const verifyData = await getVerifyData(targetHash);
    const fileName = 'verifyData.json';

    const fileToSave = new Blob([JSON.stringify(verifyData)], {
        type: 'application/json',
        name: fileName
    });

    // Save the file
    saveAs(fileToSave, fileName);
  }

  // const getIssuerData = async () => {
  //   const issuer = await getIssuer();
  //   setIssuer(issuer);
  // }

  console.log(data);


  

  return (
    <>
    {(data && issuer) && (
        <div>
        <nav role="navigation" aria-labelledby="rightnavheading" class="main-nav">
          <div class="nav-menu-share closed-d">
            <div class="inivisible-msk"></div>{" "}
            <ul>
              <li class="title-nav">
                <span class="icon-share"></span> Share
                <i class="ti-angle-right"></i>
              </li>{" "}
              <li class="social">
                <a
                  href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fcertificate.bcdiploma.com%2Fcheck%2F185F5FBF31A2B733E6A88ECE4611DA573A5087E1541DEBB2E9524166B3A82145dkJKdGkzUzZkeFZrK0tYbEpFSGxFL3B4NjFsVWR1dXZQT3huRlRqdU9KVHVBRWtl&amp;summary=Just+got+my+@BCdiploma+blockchain+certificate+from+Universit%C3%A9%20Hoa%20Sen:&amp;source=BCdiploma"
                  target="blank"
                  rel="noopener noreferrer"
                  class="social-link"
                >
                  <i class="ti-linkedin"></i> LinkedIn
                </a>
              </li>{" "}
              <li class="social">
                <a
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcertificate.bcdiploma.com%2Fcheck%2F185F5FBF31A2B733E6A88ECE4611DA573A5087E1541DEBB2E9524166B3A82145dkJKdGkzUzZkeFZrK0tYbEpFSGxFL3B4NjFsVWR1dXZQT3huRlRqdU9KVHVBRWtl&amp;text=Just+got+my+%23BCdiploma+blockchain+certificate+from+Universit%C3%A9%20Hoa%20Sen:"
                  target="blank"
                  rel="noopener noreferrer"
                  class="social-link"
                >
                  <i class="ti-twitter-alt"></i> Twitter
                </a>
              </li>{" "}
              <li class="social">
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcertificate.bcdiploma.com%2Fcheck%2F185F5FBF31A2B733E6A88ECE4611DA573A5087E1541DEBB2E9524166B3A82145dkJKdGkzUzZkeFZrK0tYbEpFSGxFL3B4NjFsVWR1dXZQT3huRlRqdU9KVHVBRWtl"
                  rel="noopener noreferrer"
                  target="_blank"
                  class="social-link"
                >
                  <i class="ti-facebook"></i> Facebook
                </a>
              </li>{" "}
              <li class="social">
                <a
                  href="mailto:?subject=Just got my BCdiploma blockchain certificate from Universit%C3%A9%20Hoa%20Sen&amp;body=https%3A%2F%2Fcertificate.bcdiploma.com%2Fcheck%2F185F5FBF31A2B733E6A88ECE4611DA573A5087E1541DEBB2E9524166B3A82145dkJKdGkzUzZkeFZrK0tYbEpFSGxFL3B4NjFsVWR1dXZQT3huRlRqdU9KVHVBRWtl"
                  target="_blank"
                  class="social-link"
                >
                  <i class="ti-email"></i> Email
                </a>
              </li>{" "}
              <li class="social">
                <a
                  aria-label="Print"
                  target="_blank"
                  class="social-link matomo_download"
                >
                  <i class="ti-printer"></i> Print
                </a>
              </li>{" "}
            </ul>
          </div>{" "}
          <ul>
            <li onClick={() => {
              dowloadPdf();
            }}>
              <a
                aria-label="Print"
                target="_blank"
                class="download matomo_download"
              >
                <img src="data:image/png;base64,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" alt="" /> Print
              </a>
            </li>
            <li class="logo-nav-place">
              <div
                class="lds-dual-ring-b animated fadeOut animation-delay-2000"
                style={{display: "none"}}
              ></div>{" "}
              <Link to={`/sub/${targetHash}`}>
                <img
                  src="/images/background/double-check.svg"
                  alt="certified icon"
                  class="double-check"
                />{" "}              
                <span class="toggle-icon-p">
                  verified <i class="ti-angle-right"></i>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <div class="certificat-wrapper certificat-wrapper--front" id='content'>
          <div class="global">
            <div class="left">
              <div class="republic">SOCIALIST REPUBLIC OF VIETNAM</div>{" "}
              <div class="president">
                <div>THE PRESIDENT OF</div> <div>{issuer.name.toUpperCase()}</div>
              </div>{" "}
              <div class="confer">has conferred</div>{" "}
              <div class="degree">THE DEGREE OF BACHELOR</div>{" "}
              <div class="major">{data.major.toUpperCase()}</div>{" "}
              <div class="list">
                <div class="line">
                  <div class="labels">Upon:</div>{" "}
                  <div class="name">
                    <span>{data.sex === 'Male' ? "Mr" : "Ms"}</span> {removeAccents(data.name)}
                  </div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Date of birth:</div>{" "}
                  <div class="details">{data.dob}</div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Year of graduation:</div>{" "}
                  <div class="details">{data.graduatedYear}</div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Degree classification:</div>{" "}
                  <div class="details">{data.classification}</div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Mode of study:</div>{" "}
                  <div class="details">{data.studyMode}</div>
                </div>
              </div>{" "}
              <div class="date-town">Ho Chi Minh City, 19 March 2020</div>{" "}
              <div class="reg">Reg. No: DTH/1B0214/2020</div>
            </div>{" "}
            <div class="right">
              <div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>{" "}
              <div class="logo">
                <a href="" title="Université Hoa Sen"></a>{" "}
                <img
                  src="https://certificate.bcdiploma.com/pub/images/hoa-sen.6baa29e.svg"
                  alt="Université Hoa Sen"
                />
              </div>{" "}
              <div class="president">
                <div>HIỆU TRƯỞNG</div> <div>{issuer.name.toUpperCase()}</div>
              </div>{" "}
              <div class="confer">cấp</div> <div class="degree">BẰNG CỬ NHÂN</div>{" "}
              <div class="major">{data.major.toUpperCase()}</div>{" "}
              <div class="list">
                <div class="line">
                  <div class="labels">Cho:</div>{" "}
                  <div class="name">
                    <span>{data.sex === 'Male' ? "Ông" : "Bà"}</span> {data.name}
                  </div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Ngày sinh:</div>{" "}
                  <div class="details">{data.dob}</div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Năm tốt nghiệp:</div>{" "}
                  <div class="details">{data.graduatedYear}</div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Xếp loại tốt nghiệp:</div>{" "}
                  <div class="details">{formatClassification(data.classification)}</div>
                </div>{" "}
                <div class="line">
                  <div class="labels">Hình thức đào tạo:</div>{" "}
                  <div class="details">{formatStudyMode(data.studyMode)}</div>
                </div>
              </div>{" "}
              <div class="date-town">
                TP. Hồ Chí Minh, ngày 19 tháng 03 năm 2020
                <img
                  src="https://certificate.bcdiploma.com/pub/images/sign-3.e7bffdf.svg"
                  class="small-sign"
                />
              </div>{" "}
              <div class="stamp">
                <div class="top">HIỆU TRƯỞNG</div>{" "}
                <img
                  src="https://certificate.bcdiploma.com/pub/images/stamp1.089da04.svg"
                  alt="stamp Hoa Sen"
                  class="stamp-img1"
                />{" "}
                <div class="president">GS.TS. Mai Hồng Quỳ</div>
              </div>{" "}
              <div class="reg">
                <div class="line1">
                  Số hiệu: <span>DTH/1B012806</span>
                </div>{" "}
                <div class="line2">
                  Số vào sổ cấp bằng: <span>DTH/1B0214/2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    )} 
    </>
  );
};

export default Cert;
