import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./2017_Old_MarksheetPriview.scss";

const SUBJECTS_BY_TYPE = {
  "2018-22-faqunia-Marksheet": [
    "Dinyat paper-1",
    "Dinyat paper-2",
    "Total",
    "Urdu",
    "Persian",
    "Arabic",
    "Social Study",
    "Hindi",
    "Mathematics",
    "Science",
    "Com. Opt. Sub",
    "Aggregate",
  ],
  "2018-22-molvi-Marksheet": [
    "Dinyat paper-1",
    "Dinyat paper-2",
    "Dinyat paper-3",
    "Total",
    "Urdu",
    "Persian",
    "Arabic",
    "Social Study",
    "Hindi",
    "Com. Opt. Sub",
    "Aggregate",
  ],
};

const isMarksheet = (examType) =>
  examType === "2018-22-faqunia-Marksheet" || examType === "2018-22-molvi-Marksheet";

const toTitle = (str = "") => str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const Old_MarksheetPreview_2017 = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  if (!data) return <div className="no-data-found">No data found</div>;

  // 🧾 Save in sessionStorage for safe back/refresh
  useEffect(() => {
    if (!data) return;
    const payload = {
      selectedType: data.examType,
      studentInfo: {
        name: data.name,
        fatherName: data.fatherName,
        dob: data.dob,
        code: data.code,
        rollNo: data.rollNo,
        madrasa: data.madrasa,
        year: data.year,
      },
      resultInfo: {
        status: data.status,
        optional: data.optional,
        publicationDate: data.publicationDate,
      },
      subjectMarks: data.subjectMarks || {},
    };
    sessionStorage.setItem("old2017_form", JSON.stringify(payload));
  }, [data]);

  const handlePrint = () => {
    if (data.examType === "2018-22-faqunia-certificate") {
      navigate("/faq-certificate-print-2018", { state: { data } });
    }
    if (data.examType === "2018-22-molvi-certificate") {
      navigate("/molvi-certificate-print-2018", { state: { data } });
    }
    if (data.examType === "2018-22-faqunia-Marksheet") {
      navigate("/faq-marksheet-print-2018", { state: { data } });
    }
    if (data.examType === "2018-22-molvi-Marksheet") {
      navigate("/molvi-marksheet-print-2018", { state: { data } });
    }
  };

  const subjectOrder = SUBJECTS_BY_TYPE[data.examType] || [];
  const subjectMarks = data.subjectMarks || {};

  return (
    <div className="Old_MarksheetPreview-preview-2017">
      <h2>
        📄 {isMarksheet(data.examType) ? "Marksheet" : "Certificate"} Preview:{" "}
        {toTitle(data.examType)}
      </h2>

      <div className="main-section">
        <div className="section">
          <h3>🧑 Student Information (2017)</h3>
          <p><strong>Year:</strong> {data.year}</p>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Father's Name:</strong> {data.fatherName}</p>
          <p><strong>Roll Code:</strong> {data.code}</p>
          <p><strong>Roll No:</strong> {data.rollNo}</p>
          <p><strong>Madrasa:</strong> {data.madrasa}</p>
          <p><strong>Date of Birth:</strong> {data.dob}</p>
        </div>

        <div className="section">
          <h3>📊 Result Summary (2017)</h3>
          <p><strong>Exam Type:</strong> {toTitle(data.examType)}</p>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Optional Subject:</strong> {data.optional}</p>
          <p><strong>Date of Publication:</strong> {data.publicationDate}</p>
        </div>

        {isMarksheet(data.examType) && (
          <div className="section">
            <h3>📚 Subject Marks</h3>
            <div className="subjects-grid">
              {subjectOrder.map((subj) => (
                <div className="subject-row" key={subj}>
                  <span className="subject-name"><strong>{subj}</strong></span>
                  <span className="subject-marks">
                    {String(subjectMarks[subj] ?? "").trim() || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="actions">
        <button
          onClick={() =>
            navigate("/old-certificate-2017", {
              state: { __fromPreview: true, ...data },
            })
          }
        >
          🔙 Go Back
        </button>
        <button onClick={handlePrint}>🖨️ Print</button>
      </div>
    </div>
  );
};

export default Old_MarksheetPreview_2017;
