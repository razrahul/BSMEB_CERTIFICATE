import { useMemo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./2017_Old_Marksheetpage.scss";

/** Type constants — keep these exact strings */
const TYPE_FAQ_MS = "2018-22-faqunia-Marksheet";
const TYPE_MOLVI_MS = "2018-22-molvi-Marksheet";
const TYPE_FAQ_CERT = "2018-22-faqunia-certificate";
const TYPE_MOLVI_CERT = "2018-22-molvi-certificate";

/** Helpers */
const norm = (s = "") => s.toLowerCase();
const isMarksheet = (t) => /-marksheet$/i.test(t || "");

const Old_MarksheetPage_2017 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedType, setSelectedType] = useState(TYPE_FAQ_CERT);

  // 🧑 Student Info
  const [studentInfo, setStudentInfo] = useState({
    name: "Arman Ali",
    fatherName: "Ashfaq Ali",
    motherName: "Alian Khan", // only for marksheets
    registrationNumber: "reg-104582",
    dob: "15-05-2020",
    code: "MOT",
    rollNo: "2125",
    madrasa: "Madrsa Islamia Hanfia Washidganj ara Bhojpur",
    year: "2024",
  });

  // 📊 Result Info
  const [resultInfo, setResultInfo] = useState({
    status: "1st",
    optional: "English",
    resiptNo: "NOV-2025-001",
    dated: "2025-11-05",       // shown for all
    dateOfIssue: "2024-07-02", // shown for all
    publicationDate: "2023-07-03", // only for marksheets
    inWordMarks: "Eight hundred eighty eight", // only for marksheets
  });

  // 📚 Subject List
  const subjectsList = useMemo(() => {
    const t = selectedType;
    if (t === TYPE_FAQ_MS) {
      return [
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
      ];
    }
    if (t === TYPE_MOLVI_MS) {
      return [
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
      ];
    }
    return [];
  }, [selectedType]);

  const [subjectMarks, setSubjectMarks] = useState({});

  // 🔁 Restore from preview (route state) or sessionStorage (refresh/back)
  useEffect(() => {
    if (location.state?.__fromPreview) {
      const d = location.state;

      if (d.examType) setSelectedType(d.examType);

      setStudentInfo((prev) => ({
        ...prev,
        name: d.name ?? prev.name,
        fatherName: d.fatherName ?? prev.fatherName,
        motherName: d.motherName ?? prev.motherName,
        registrationNumber: d.registrationNumber ?? prev.registrationNumber,
        dob: d.dob ?? prev.dob,
        code: d.code ?? prev.code,
        rollNo: d.rollNo ?? prev.rollNo,
        madrasa: d.madrasa ?? prev.madrasa,
        year: d.year ?? prev.year,
      }));

      setResultInfo((prev) => ({
        ...prev,
        status: d.status ?? prev.status,
        optional: d.optional ?? prev.optional,
        dated: d.dated ?? prev.dated,
        resiptNo: d.resiptNo ?? prev.resiptNo,
        dateOfIssue: d.dateOfIssue ?? d.publicationDate ?? prev.dateOfIssue,
        publicationDate: d.publicationDate ?? prev.publicationDate,
        inWordMarks: d.inWordMarks ?? prev.inWordMarks,
      }));

      if (d.subjectMarks) setSubjectMarks(d.subjectMarks);

      // clean route state
      navigate(".", { replace: true, state: null });
      return;
    }

    // sessionStorage fallback
    const saved = sessionStorage.getItem("old2017_form");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.selectedType) setSelectedType(s.selectedType);
        if (s.studentInfo) setStudentInfo((prev) => ({ ...prev, ...s.studentInfo }));
        if (s.resultInfo) setResultInfo((prev) => ({ ...prev, ...s.resultInfo }));
        if (s.subjectMarks) setSubjectMarks(s.subjectMarks);
      } catch {}
    }
  }, []);

  // 💾 Autosave
  useEffect(() => {
    const payload = { selectedType, studentInfo, resultInfo, subjectMarks };
    sessionStorage.setItem("old2017_form", JSON.stringify(payload));
  }, [selectedType, studentInfo, resultInfo, subjectMarks]);

  // 🧾 Default marks for selected tab (preserve existing when switching back)
  useEffect(() => {
    if (subjectsList.length === 0) {
      setSubjectMarks({});
      return;
    }
    const init = {};
    subjectsList.forEach((s, i) => {
      init[s] = subjectMarks[s] ?? 60 + i * 5;
    });
    setSubjectMarks(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectsList]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleResultChange = (e) => {
    const { name, value } = e.target;
    setResultInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subject, value) => {
    setSubjectMarks((prev) => ({ ...prev, [subject]: value }));
  };

  const handlePreview = () => {
    // Debug (optional)
    // console.log("Selected Type before navigate:", selectedType);
    navigate("/old-certificate-2017-preview", {
      state: {
        examType: selectedType,
        ...studentInfo,
        ...resultInfo,
        subjectMarks,
      },
    });
  };

  const marksheetActive = isMarksheet(selectedType);

  return (
    <div className="page">
      {/* Tabs */}
      <div className="tabs">
        {[TYPE_FAQ_MS, TYPE_MOLVI_MS, TYPE_FAQ_CERT, TYPE_MOLVI_CERT].map((type) => {
          const displayText = type
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
          return (
            <button
              key={type}
              className={`tab ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {displayText}
            </button>
          );
        })}
      </div>

      <div className="container-old-2017">
        {/* 🧑 Student Info */}
        <div className="section">
          <h3>🧑 Student Information</h3>

          {["name", "fatherName", "dob", "code", "rollNo", "madrasa", "year"].map((key) => (
            <div key={key} className="input-group">
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())} :-
              </label>
              <input id={key} name={key} value={studentInfo[key]} type="text" onChange={handleInfoChange} />
            </div>
          ))}

          {marksheetActive && (
            <>
              <div className="input-group">
                <label htmlFor="motherName">Mother Name :-</label>
                <input
                  id="motherName"
                  name="motherName"
                  value={studentInfo.motherName}
                  type="text"
                  onChange={handleInfoChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="registrationNumber">Registration Number :-</label>
                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={studentInfo.registrationNumber}
                  type="text"
                  onChange={handleInfoChange}
                />
              </div>
            </>
          )}
        </div>

        {/* 📊 Result Summary */}
        <div className="section">
          <h3>📊 Result Summary</h3>

          <div className="input-group">
            <label>Exam Type :-</label>
            <input type="text" value={selectedType} readOnly />
          </div>

          <div className="input-group">
            <label>Status :-</label>
            <select name="status" value={resultInfo.status} onChange={handleResultChange}>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="fail">Fail</option>
            </select>
          </div>

          {/* resiptNo (all) */}
          <div className="input-group">
            <label htmlFor="resiptNo">Resipt  No :-</label>
            <input
              id="resiptNo"
              name="resiptNo"
              type="text"
              value={resultInfo.resiptNo}
              onChange={handleResultChange}
            />
          </div>
          {/* Dated (all) */}
          <div className="input-group">
            <label htmlFor="dated">Dated :-</label>
            <input
              id="dated"
              name="dated"
              type="date"
              value={resultInfo.dated}
              onChange={handleResultChange}
            />
          </div>

          {/* Date of Issue (all) */}
          <div className="input-group">
            <label htmlFor="dateOfIssue">Date of Issue :-</label>
            <input
              id="dateOfIssue"
              name="dateOfIssue"
              type="date"
              value={resultInfo.dateOfIssue}
              onChange={handleResultChange}
            />
          </div>

          {/* Date of Publication (only for marksheet) */}
          {marksheetActive && (
           <>
              <div className="input-group">
                <label htmlFor="publicationDate">Date of Publication :-</label>
                <input
                  id="publicationDate"
                  name="publicationDate"
                  type="date"
                  value={resultInfo.publicationDate}
                  onChange={handleResultChange}
                />
              </div>
              {/* InWordMarks (all types) */}
              <div className="input-group">
                <label htmlFor="inWordMarks">InWordMarks :-</label>
                <input
                  id="inWordMarks"
                  name="inWordMarks"
                  type="text"
                  placeholder="e.g., One Hundred Twenty (120)"
                  value={resultInfo.inWordMarks}
                  onChange={handleResultChange}
                />
              </div>
            </>
          )}
        </div>

        {/* 📚 Subject Marks */}
        {subjectsList.length > 0 && (
          <div className="section">
            <h3>📚 Subject Marks</h3>
            <div className="subjects-grid">
              {subjectsList.map((subj) => (
                <div key={subj} className="input-group">
                  <label>{subj} :-</label>
                  <input
                    type="text"
                    value={subjectMarks[subj] ?? ""}
                    onChange={(e) => handleSubjectChange(subj, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="button-wrapper">
        <button className="preview-btn" onClick={handlePreview}>
          👁️ Preview
        </button>
      </div>
    </div>
  );
};

export default Old_MarksheetPage_2017;
