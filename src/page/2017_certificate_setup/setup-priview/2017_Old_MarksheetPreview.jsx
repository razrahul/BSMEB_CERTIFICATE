import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./2017_Old_MarksheetPriview.scss";

/** Type constants — keep these exact strings */
const TYPE_FAQ_MS = "2018-22-faqunia-Marksheet";
const TYPE_MOLVI_MS = "2018-22-molvi-Marksheet";
const TYPE_FAQ_CERT = "2018-22-faqunia-certificate";
const TYPE_MOLVI_CERT = "2018-22-molvi-certificate";

/** Helpers */
const isMarksheet = (t) => /-marksheet$/i.test(t || "");
const toTitle = (str = "") => str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const SUBJECTS_BY_TYPE = {
  [TYPE_FAQ_MS]: [
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
  [TYPE_MOLVI_MS]: [
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

const Old_MarksheetPreview_2017 = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  if (!data) return <div className="no-data-found">No data found</div>;

  // 🧾 Persist to sessionStorage so back/refresh is safe
  useEffect(() => {
    const payload = {
      selectedType: data.examType,
      studentInfo: {
        name: data.name,
        fatherName: data.fatherName,
        motherName: data.motherName ?? "",
        registrationNumber: data.registrationNumber ?? "",
        dob: data.dob,
        code: data.code,
        rollNo: data.rollNo,
        madrasa: data.madrasa,
        year: data.year,
      },
      resultInfo: {
        status: data.status,
        optional: data.optional,
        dated: data.dated,
        dateOfIssue: data.dateOfIssue ?? data.publicationDate,
        publicationDate: data.publicationDate ?? "",
      },
      subjectMarks: data.subjectMarks || {},
    };
    sessionStorage.setItem("old2017_form", JSON.stringify(payload));
  }, [data]);

  const handlePrint = () => {
    if (data.examType === TYPE_FAQ_CERT) {
      navigate("/faq-certificate-print-2018", { state: { data } });
    }
    if (data.examType === TYPE_MOLVI_CERT) {
      navigate("/molvi-certificate-print-2018", { state: { data } });
    }
    if (data.examType === TYPE_FAQ_MS) {
      navigate("/faq-marksheet-print-2018", { state: { data } });
    }
    if (data.examType === TYPE_MOLVI_MS) {
      navigate("/molvi-marksheet-print-2018", { state: { data } });
    }
  };

  const subjectOrder = SUBJECTS_BY_TYPE[data.examType] || [];
  const subjectMarks = data.subjectMarks || {};

  return (
    <div className="Old_MarksheetPreview-preview-2017">
      <h2>
        📄 {isMarksheet(data.examType) ? "Marksheet" : "Certificate"} Preview: {toTitle(data.examType)}
      </h2>

      <div className="main-section">
        {/* 🧑 Student Info */}
        <div className="section">
          <h3>🧑 Student Information (2017)</h3>
          <p><strong>Year:</strong> {data.year}</p>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Father's Name:</strong> {data.fatherName}</p>

          {isMarksheet(data.examType) && (
            <>
              <p><strong>Mother's Name:</strong> {data.motherName || "—"}</p>
              <p><strong>Registration Number:</strong> {data.registrationNumber || "—"}</p>
            </>
          )}

          <p><strong>Roll Code:</strong> {data.code}</p>
          <p><strong>Roll No:</strong> {data.rollNo}</p>
          <p><strong>Madrasa:</strong> {data.madrasa}</p>
          <p><strong>Date of Birth:</strong> {data.dob}</p>
        </div>

        {/* 📊 Result Summary */}
        <div className="section">
          <h3>📊 Result Summary (2017)</h3>
          <p><strong>Exam Type:</strong> {toTitle(data.examType)}</p>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Optional Subject:</strong> {data.optional}</p>

          <p><strong>Dated:</strong> {data.dated || "—"}</p>
          <p><strong>Date of Issue:</strong> {data.dateOfIssue || data.publicationDate || "—"}</p>

          {isMarksheet(data.examType) && (
            <p><strong>Date of Publication:</strong> {data.publicationDate || "—"}</p>
          )}
        </div>

        {/* 📚 Subject Marks */}
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

      {/* 🔘 Buttons */}
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
