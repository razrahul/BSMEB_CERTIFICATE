import { useMemo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./2017_Old_Marksheetpage.scss";

const Old_MarksheetPage_2017 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedType, setSelectedType] = useState("2018-22-faqunia-certificate");

  // 🧑 Student Info
  const [studentInfo, setStudentInfo] = useState({
    name: "Arman Ali",
    fatherName: "Ashfaq Ali",
    dob: "15-05-2020 (Fifteen May Twenty-twenty)",
    code: "MOT",
    rollNo: "2125",
    madrasa: "Madrsa Islamia Hanfia Washidganj ara Bhojpur",
    year: "2024",
  });

  // 📊 Result Info
  const [resultInfo, setResultInfo] = useState({
    status: "1st",
    optional: "English",
    publicationDate: "2024-07-01",
  });

  // 📚 Subject List based on selectedType
  const subjectsList = useMemo(() => {
    if (selectedType === "2018-22-faqunia-Marksheet") {
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
    if (selectedType === "2018-22-molvi-Marksheet") {
      return [
        "Dinyat paper-1",
        "Dinyat paper-2",
        "Dinyat paper-3",
        "Total",
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

  // 🧩 Rehydrate state (Preview → Back) or sessionStorage
  useEffect(() => {
    if (location.state?.__fromPreview) {
      const incoming = location.state;
      if (incoming.examType) setSelectedType(incoming.examType);

      setStudentInfo((prev) => ({
        ...prev,
        name: incoming.name ?? prev.name,
        fatherName: incoming.fatherName ?? prev.fatherName,
        dob: incoming.dob ?? prev.dob,
        code: incoming.code ?? prev.code,
        rollNo: incoming.rollNo ?? prev.rollNo,
        madrasa: incoming.madrasa ?? prev.madrasa,
        year: incoming.year ?? prev.year,
      }));

      setResultInfo((prev) => ({
        ...prev,
        status: incoming.status ?? prev.status,
        optional: incoming.optional ?? prev.optional,
        publicationDate: incoming.publicationDate ?? prev.publicationDate,
      }));

      if (incoming.subjectMarks) setSubjectMarks(incoming.subjectMarks);

      navigate(".", { replace: true, state: null });
      return;
    }

    const saved = sessionStorage.getItem("old2017_form");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.selectedType) setSelectedType(s.selectedType);
        if (s.studentInfo) setStudentInfo(s.studentInfo);
        if (s.resultInfo) setResultInfo(s.resultInfo);
        if (s.subjectMarks) setSubjectMarks(s.subjectMarks);
      } catch {}
    }
  }, []);

  // 💾 Autosave to sessionStorage
  useEffect(() => {
    const payload = { selectedType, studentInfo, resultInfo, subjectMarks };
    sessionStorage.setItem("old2017_form", JSON.stringify(payload));
  }, [selectedType, studentInfo, resultInfo, subjectMarks]);

  // 🧾 Default marks auto-fill on tab change
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
    navigate("/old-certificate-2017-preview", {
      state: {
        examType: selectedType,
        ...studentInfo,
        ...resultInfo,
        subjectMarks,
      },
    });
  };

  return (
    <div className="page">
      {/* Tabs */}
      <div className="tabs">
        {[
          "2018-22-faqunia-Marksheet",
          "2018-22-molvi-Marksheet",
          "2018-22-faqunia-certificate",
          "2018-22-molvi-certificate",
        ].map((type) => {
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
          {Object.entries(studentInfo).map(([key, value]) => (
            <div key={key} className="input-group">
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())} :-
              </label>
              <input id={key} name={key} value={value} type="text" onChange={handleInfoChange} />
            </div>
          ))}
        </div>

        {/* 📊 Result Info */}
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
          {["optional", "publicationDate"].map((key) => (
            <div key={key} className="input-group">
              <label>{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())} :-</label>
              <input
                name={key}
                value={resultInfo[key]}
                type={key === "publicationDate" ? "date" : "text"}
                onChange={handleResultChange}
              />
            </div>
          ))}
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
