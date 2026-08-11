import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";

const STATUS_COLOR = {
  idle: "bg-transparent",
  loading: "bg-yellow-400",
  success: "bg-green-500",
  error: "bg-red-500",
};

const Login = ({ onBack }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://cognitara.onrender.com/health");

      if (!res.ok) throw new Error("Login failed");

      setStatus("success");
      // brief pause so the green flash is actually visible before we navigate away

      setTimeout(() => navigate("/home"), 400); // TODO: point at your real home route
          } catch (err) {
            setStatus("error");
          }
        };
      
        return (
          <div className="max-w-80 w-90% p-5 bg-(--bg-app) rounded-xl m-auto relative">
            {onBack && (
              <button
                onClick={onBack}
                aria-label="Back"
                className="absolute top-4 left-4 text-(--text-secondary) hover:text-(--text-primary) leading-none z-10"
              >
                <RiArrowLeftLine size={20} />
              </button>
            )}
      
            <h1 className="mb-1 text-2xl text-(--text-primary) text-center">Login</h1>
      
            <form onSubmit={handleSubmit} className="flex flex-col mt-5">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-3xl bg-white mb-3 px-3 py-2 border-(--border-strong)"
                placeholder="Email"
                type="email"
              />
      
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-3xl bg-white mb-3 px-3 py-2 border-(--border-strong)"
                placeholder="Password"
                type="password"
              />
      
              <div className="flex items-center gap-3 mb-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 rounded-3xl bg-(--accent-primary) hover:bg-(--accent-primary-hover) text-white p-2 disabled:opacity-70 transition-colors"
                >
                  {status === "loading" ? "Logging in…" : "Login"}
                </button>
      
                <span
                  role="status"
                  aria-label={
                    status === "loading"
                      ? "Logging in"
                      : status === "success"
                      ? "Login successful"
                      : status === "error"
                      ? "Login failed"
                      : "Idle"
                  }
                  className={`w-3.5 h-3.5 rounded-full shrink-0 transition-colors duration-300 ${STATUS_COLOR[status]} ${
                    status === "idle" ? "border border-(--border-strong)" : ""
                  }`}
                />
              </div>
      
              {status === "error" && (
                <p className="text-red-600 text-sm mb-2 -mt-1">
                  Couldnt log in. Check your details and try again.
                </p>
              )}
            </form>
      
            <hr className="mb-4" />
            <h2 className="text-md text-center">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-800 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </h2>
            <h2 className="text-md text-center hover:text-(--accent-primary-hover) cursor-pointer">
              Forgot password?
            </h2>
          </div>
        );
      };
      
      export default Login;
      