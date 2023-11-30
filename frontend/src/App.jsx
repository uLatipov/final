import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className='min-h-screen relative'>
      <Header />
      <main className='container mx-auto py-4 min-h-100  '>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default App;
