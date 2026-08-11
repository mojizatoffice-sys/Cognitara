import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

// Each step holds up to 2 fields. Add/remove/reorder here — the slider,
// dots, and validation all read off this array.
const STEPS = [
  { title: "Tell us about you", fields: ["name", "age"] },
  { title: "Verify your email", fields: ["email", "otp"] },
  { title: "Secure your account", fields: ["password", "confirmPassword"] },
];

const FIELD_CONFIG = {
  name: { label: "Name", type: "text" },
  age: { label: "Age", type: "number" },
  email: { label: "Email", type: "email" },
  otp: { label: "OTP", type: "text", placeholder: "Code sent to your email" },
  password: { label: "Password", type: "password" },
  confirmPassword: { label: "Confirm password", type: "password" },
};

const Signup = ({ onBack }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const isFirstStep = step === 0;
  const isLastStep = step === STEPS.length - 1;
  const currentFields = STEPS[step].fields;

  const updateField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  };

  const validateStep = () => {
    for (const key of currentFields) {
      if (!String(form[key]).trim()) {
        setError("Fill in this step to continue.");
        return false;
      }
    }
    if (isLastStep && form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    if (isLastStep) {
      // TODO: submit form to your real signup endpoint
      console.log("Submitting signup:", form);
      return;
    }
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goNext();
  };

  return (
    <div className="max-w-80 w-90% p-5 bg-(--bg-app) rounded-xl m-auto relative overflow-hidden">
      {/* Page-level control — always returns to Welcome, never touches
          step state. Step navigation lives entirely in the arrows below. */}
      <button
        onClick={onBack}
        aria-label="Back to welcome"
        className="absolute top-4 left-4 text-(--text-secondary) hover:text-(--text-primary) text-xl leading-none z-10"
      >
        &#8592;
      </button>

      {/* progress dots */}
      <div className="flex items-center justify-center gap-2 mb-1">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? "w-6 bg-(--accent-primary)" : "w-1.5 bg-(--border-strong)"
            }`}
          />
        ))}
      </div>

      <h1 className="mb-1 mt-3 text-2xl text-(--text-primary) text-center">
        {STEPS[step].title}
      </h1>

      {/* sliding track */}
      <div className="overflow-hidden mt-5">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            width: `${STEPS.length * 100}%`,
            transform: `translateX(-${(step * 100) / STEPS.length}%)`,
          }}
        >
          {STEPS.map((stepDef, i) => (
            <form
              key={i}
              onSubmit={handleSubmit}
              className="flex flex-col shrink-0"
              style={{ width: `${100 / STEPS.length}%` }}
            >
              {stepDef.fields.map((key) => (
                <React.Fragment key={key}>
                  <label className="text-sm text-(--text-secondary)">
                    {FIELD_CONFIG[key].label}
                  </label>
                  <input
                    value={form[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                    type={FIELD_CONFIG[key].type}
                    placeholder={FIELD_CONFIG[key].placeholder}
                    className="rounded-3xl bg-white mb-3 px-3 py-2 border-(--border-strong)"
                  />
                </React.Fragment>
              ))}

              {/* In-form navigation for the active step only */}
              {i === step && (
                <div className="flex items-center justify-between mt-1 mb-1">
                  {isFirstStep ? (
                    <span />
                  ) : (
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous step"
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-(--border-strong) text-(--text-primary) hover:bg-(--accent-primary-hover) hover:text-white transition-colors"
                    >
                      <RiArrowLeftSLine size={20} />
                    </button>
                  )}

                  {isLastStep ? (
                    <button
                      type="submit"
                      className="rounded-3xl bg-(--accent-primary) hover:bg-(--accent-primary-hover) text-white px-5 py-2"
                    >
                      Sign up
                    </button>
                  ) : (
                    <button
                      type="submit"
                      aria-label="Next step"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-(--accent-primary) hover:bg-(--accent-primary-hover) text-white transition-colors"
                    >
                      <RiArrowRightSLine size={20} />
                    </button>
                  )}
                </div>
              )}
            </form>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-1 mb-2 text-center">{error}</p>}

      <hr className="mt-4 mb-4" />

      <h2 className="text-md text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-800 cursor-pointer hover:underline"
        >
          Login
        </span>
      </h2>
    </div>
  );
};

export default Signup;
