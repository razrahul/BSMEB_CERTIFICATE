import { useLocation, useNavigate } from "react-router-dom";
import "./2018_Molvi_MarksheetPrint.scss";
import { formatDate } from "../../../utils/helper";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.vite";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const onLoadSuccess = ({ numPages }) =>
  console.log(`Loaded document with ${numPages} pages`);

const Molvi_MarksheetPrint_2018 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.data;
  if (!data) {
    return (
      <div>
        <p>No certificate data found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const { subjectMarks } = data;

  console.log(subjectMarks);

  function getMarks(subjectName) {
    // yeh assume karega ki 'subjectMarks' global ya upper scope me declared hai
    if (!subjectMarks || typeof subjectMarks !== "object") return 0; // safe fallback

    // normalize names (ignore spaces, dash, underscore, case)
    const normalize = (s = "") => s.toLowerCase().replace(/[^a-z0-9]/g, "");

    const target = normalize(subjectName);

    // loop through object keys
    for (const key in subjectMarks) {
      if (normalize(key) === target) {
        return subjectMarks[key]; // ✅ found the value
      }
    }

    // not found → return default marks
    return "N";
  }

  // console.log(data);

  // 🔐 Safe text formatter
  const safeText = (val) => (val ? val.toUpperCase() : "");

  return (
    <div className="Molvi_MarksheetPrint_wrapper_2018">
      {/* PDF background */}
      <div className="pdf-bg">
        <Document file="/Maulvi Marksheet 18-22.pdf" onLoadSuccess={onLoadSuccess}>
          <Page
            pageNumber={1}
            width={720}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* 🎓 Certificate Overlay */}
      <div className="Molvi_MarksheetPrint_2018">
        {/* 🧾 Student Information */}
        <div className="year">{safeText(data.year)}</div>
        <div className="name tex-dec">{safeText(data.name)}</div>
        <div className="father-name tex-dec">{safeText(data.fatherName)}</div>
        <div className="roll-code tex-dec">{safeText(data.code)}</div>
        <div className="roll-no tex-dec">{safeText(data.rollNo)}</div>
        <div className="madrasa tex-dec">{safeText(data.madrasa)}</div>
        <div className="dob tex-dec">{safeText(data.dob)}</div>

        {/* 🧠 Subject Marks (mapped to CSS classes) */}
        <div className="diniyat1 tex-dec">{getMarks("Dinyat paper-1")}</div>
        <div className="diniyat2 tex-dec">{getMarks("Dinyat paper-2")}</div>
        <div className="diniyat3 tex-dec">{getMarks("Dinyat paper-3")}</div>
        <div className="total tex-dec">{getMarks("Total")}</div>
        <div className="urdu tex-dec">{getMarks("Urdu")}</div>
        <div className="persian tex-dec">{getMarks("Persian")}</div>
        <div className="arabic tex-dec">{getMarks("Arabic")}</div>
        <div className="social-study tex-dec">{getMarks("Social Study")}</div>
        <div className="hindi tex-dec">{getMarks("Hindi")}</div>
        {/* <div className="mathematics tex-dec">{getMarks("Mathematics")}</div> */}
        {/* <div className="science tex-dec">{getMarks("Science")}</div> */}
        <div className="opt tex-dec">{getMarks("Com. Opt. Sub")}</div>
        <div className="aggregate tex-dec">{getMarks("Aggregate")}</div>

        {/* 📊 Result Summary */}
        <div className="status tex-dec">{safeText(data.status)}</div>
        {/* <div className="optional ">{safeText(data.optional)}</div> */}
        <div className="date_of_publication">
          {formatDate(data.publicationDate)}
        </div>
      </div>
    </div>
  );
};

export default Molvi_MarksheetPrint_2018;
