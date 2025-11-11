import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./container/Navbar";
import Loader from "./components/loader/Loader";
import "./App.css";

// Lazy pages
const Marksheet = lazy(() => import("./page/marksheet/Marksheet"));
const Dashboard = lazy(() => import("./page/dashboard/Dashboard"));
const Student = lazy(() => import("./page/student/Student"));
const CertificatePrint = lazy(() => import("./page/Certificate/CertificatePrint"));
const Certificate = lazy(() => import("./page/Certificate-print/Certificate"));
const New_Marksheet = lazy(() => import("./page/New_Marksheet/MarksheetPage"));
const Molvi_CertificatePreview = lazy(() => import("./page/New_Marksheet/MarksheetPreview"));
const Molvi_Art_Print = lazy(() => import("./page/New_Marksheet_Print/molvi_Art_Print"));
const Molvi_Sci_Print = lazy(() => import("./page/New_Marksheet_Print/molvi_Sci_print"));
const Movli_Islamic_Certificate = lazy(() => import("./page/New_Marksheet_Print/molvi_Islamic_Print"));

const Old_MarksheetPage = lazy(() => import("./page/Old_Marksheet/Old_MarksheetPage"));
const Old_MarksheetPreview = lazy(() => import("./page/Old_Marksheet/Old_MarksheetPreview"));
const Old_Faq_MarksheetPrint = lazy(() => import("./page/Old_MarksheetPrint/Old_Faq_MarksheetPrint"));
const Old_Molvi_MarksheetPrint = lazy(() => import("./page/Old_MarksheetPrint/Old_Molvi_MarksheetPrint"));

// 2017 / 2018 Certificate
const Old_MarksheetPage_2017 = lazy(() =>
  import("./page/2017_certificate_setup/setup-priview/2017_Old_MarksheetPage")
);
const Old_MarksheetPreview_2017 = lazy(() =>
  import("./page/2017_certificate_setup/setup-priview/2017_Old_MarksheetPreview")
);
const Faq_CertificatePrint_2018 = lazy(() =>
  import("./page/2017_certificate_setup/print/2018_Faq_CertificatePrint")
);
const Moluvi_CertificatePrint_2018 = lazy(() =>
  import("./page/2017_certificate_setup/print/2018_Molvi_CertificatePrint")
);
const Faq_MarksheetPrint_2018 = lazy(() =>
  import("./page/2017_certificate_setup/print/2018_Faq_MarksheetPrint")
);
const Molvi_MarksheetPrint_2018 = lazy(() =>
  import("./page/2017_certificate_setup/print/2018_Molvi_MarksheetPrint")
);

function App() {
  const location = useLocation();

  // Paths where navbar/layout should be hidden (print/preview)
  const isPreviewPage = [
    "/certificate-preview",
    "/molvi-art-print",
    "/molvi-sci-print",
    "/molvi-islamic-print",
    "/old-faq-certificate-print",
    "/old-molvi-certificate-print",
    "/faq-certificate-print-2018",
    "/molvi-certificate-print-2018",
    "/faq-marksheet-print-2018",
    "/molvi-marksheet-print-2018",
  ].includes(location.pathname);

  return (
    <>
      {!isPreviewPage && <Navbar />}
      <div className={isPreviewPage ? "" : "app-layout"}>
        <div className={isPreviewPage ? "" : "main-content"}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/marksheet" element={<Marksheet />} />
              <Route path="/student" element={<Student />} />
              <Route path="/certificate" element={<CertificatePrint />} />
              <Route path="/certificate-preview" element={<Certificate />} />
              <Route path="/new-marksheet" element={<New_Marksheet />} />
              <Route path="/molvi-certificate-preview" element={<Molvi_CertificatePreview />} />
              <Route path="/molvi-art-print" element={<Molvi_Art_Print />} />
              <Route path="/molvi-sci-print" element={<Molvi_Sci_Print />} />
              <Route path="/molvi-islamic-print" element={<Movli_Islamic_Certificate />} />

              <Route path="/old-certificate" element={<Old_MarksheetPage />} />
              <Route path="/old-certificate-preview" element={<Old_MarksheetPreview />} />
              <Route path="/old-faq-certificate-print" element={<Old_Faq_MarksheetPrint />} />
              <Route path="/old-molvi-certificate-print" element={<Old_Molvi_MarksheetPrint />} />

              {/* 2017 / 2018 Certificate --- */}
              <Route path="/old-certificate-2017" element={<Old_MarksheetPage_2017 />} />
              <Route path="/old-certificate-2017-preview" element={<Old_MarksheetPreview_2017 />} />
              <Route path="/faq-certificate-print-2018" element={<Faq_CertificatePrint_2018 />} />
              <Route path="/molvi-certificate-print-2018" element={<Moluvi_CertificatePrint_2018 />} />
              <Route path="/faq-marksheet-print-2018" element={<Faq_MarksheetPrint_2018 />} />
              <Route path="/molvi-marksheet-print-2018" element={<Molvi_MarksheetPrint_2018 />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
