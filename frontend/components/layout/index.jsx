import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
import "./index.scss";
function Layout() {
  return (
    <div className="layout">
      {/* Header */}
      <header className="layout__header">
        <Header />
      </header>

      {/* Nội dung chính */}
      <main className="layout__content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="layout__footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
