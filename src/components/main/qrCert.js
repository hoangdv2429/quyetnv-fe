import { QRCode } from "react-qr-svg";

const Qrcodetosvg = (data) => {
  return (
      <QRCode
        value= {data}
        bgColor="#fafaf0"
        fgColor="#000000"
        level="Q"
        style={{ width: 110 }}
      />
  );
};

export default Qrcodetosvg;
