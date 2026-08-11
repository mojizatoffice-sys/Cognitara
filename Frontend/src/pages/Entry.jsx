import bgImage from "../assets/bgImage.png";
import entryPageImg from "../assets/entry_page_img.png";
import React from "react";
import { BrandMark } from "../component/Welcome";
import Login from "../component/Login";
import Signup from "../component/Signup";
import Welcome from "../component/Welcome";
import {Routes, Route, useNavigate} from "react-router-dom";

export default function Entry() {
  const navigate = useNavigate();

  return (
    <div>
      {/* wave clipPaths (desktop only) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="wave1" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L0.56,0 C0.53,0.2 0.62,0.28 0.58,0.45 C0.53,0.63 0.62,0.7 0.58,1 L0,1 Z" />
          </clipPath>
          <clipPath id="wave2" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L0.60,0 C0.57,0.19 0.65,0.26 0.61,0.44 C0.57,0.61 0.65,0.69 0.61,1 L0,1 Z" />
          </clipPath>
          <clipPath id="wave3" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L0.64,0 C0.61,0.18 0.68,0.25 0.64,0.42 C0.60,0.6 0.68,0.68 0.64,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/*-----------------desktop--------------- */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-6 bg-[#3a5d49]">
        <div
          className="relative w-full max-w-7xl h-[85vh] rounded-3xl overflow-hidden shadow-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-[#3a5d49]" />

          <div
            className="absolute inset-0 bg-cover bg-center opacity-55"
            style={{ backgroundImage: `url(${bgImage})`, clipPath: "url(#wave3)" }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-75"
            style={{ backgroundImage: `url(${bgImage})`, clipPath: "url(#wave2)" }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})`, clipPath: "url(#wave1)" }}
          />
          <div className="absolute top-8 left-8 z-10">
            <BrandMark theme="light" />
          </div>


          {/* This is the "slot" that swaps between Welcome / Login / Signup.*/}

          <div className="absolute left-8/12 inset-0 flex flex-col justify-between gap-8 pl-16 pr-4 p w-[30%]">
            <div className="hidden md:block w-full h-full">
              <Routes>
                <Route
                  index
                  element={
                    <Welcome
                      variant="desktop"
                      onLogin={() => navigate("/login")}
                      onSignup={() => navigate("/signup")}
                    />
                  }
                />
                <Route
                  path="login"
                  element={
                    <div className="w-full mt-15">
                      <Login onBack={() => navigate("/")} />
                    </div>
                  }
                />
                <Route
                  path="signup"
                  element={
                    <div className="w-full mt-15">
                      <Signup onBack={() => navigate("/")} />
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div
        className="flex flex-col justify-end md:hidden h-screen p-6"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <Routes>
          <Route
            index
            element={
              <Welcome
                variant="mobile"
                onLogin={() => navigate("/login")}
                onSignup={() => navigate("/signup")}
              />
            }
          />
          <Route path="login" element={<Login onBack={() => navigate("/")} />} />
          <Route path="signup" element={<Signup onBack={() => navigate("/")} />} />
        </Routes>
        
      </div>
    </div>
  );
}
