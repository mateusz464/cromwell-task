import React from "react";
import NavigationBar from "../components/NavigationBar";

interface NavigationPageProps {
  children: React.ReactNode;
}

// Used when a page needs a navigation bar
// Wraps the children in a NavigationBar and a centered-content div
function NavigationPage({ children }: NavigationPageProps) {
  return (
    <>
      <NavigationBar />
      <div className="centered-content">{children}</div>
    </>
  );
}

export default NavigationPage;
