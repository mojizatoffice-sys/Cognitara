import { useNavigate } from "react-router-dom";

/**
 * BrandMark
 * Placeholder logo — swap the circle+letter for the real mark once design
 * hands it off. Used two places: (1) over the image on desktop, rendered
 * persistently from Entry.jsx so it stays visible through Login/Signup too,
 * and (2) at the top of the mobile Welcome screen.
 */
export function BrandMark({ theme = "light" }) {
  const isLight = theme === "light";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
          isLight ? "bg-white/95" : "bg-[#3a5d49]"
        }`}
      >
        <span
          className={`text-lg leading-none ${isLight ? "text-[#2b4536]" : "text-white"}`}
          style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
        >
          M
        </span>
      </div>
      <span
        className={`text-lg tracking-wide ${isLight ? "text-black" : "text-[#2b4536]"}`}
        style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
      >
        Mindgrove
      </span>
    </div>
  );
})

/**
 * Welcome
 * variant: "desktop" | "mobile"
 * onLogin / onSignup: optional overrides; falls back to relative navigate()
 * so this still works if mounted somewhere without those props wired up.
 */
export default function Welcome({ variant = "desktop", onLogin, onSignup }) {
  const navigate = useNavigate();
  const goLogin = onLogin ?? (() => navigate("login"));
  const goSignup = onSignup ?? (() => navigate("signup"));

  if (variant === "mobile") {
    return (
      <div className="relative w-full h-full flex flex-col justify-between">
        <div className="pt-2">
          <BrandMark theme="light" />
        </div>

        {/* Scrim only behind the text/buttons so the photo stays clean up top,
            and copy stays readable regardless of what's in the image there. */}
        <div className="-mx-6 px-6 pt-20 pb-2 flex flex-col gap-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-[28px]">
          <div className="flex flex-col gap-2">
            <h1
              className="text-4xl font-semibold text-white"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              Welcome
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-[90%]">
              A quiet space to track your mood and grow your focus, one day at a time.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={goLogin}
              className="w-full py-3.5 rounded-xl bg-white text-[#243b2c] text-base font-semibold hover:bg-white/90 active:scale-[0.98] transition-all"
            >
              Login
            </button>
            <button
              onClick={goSignup}
              className="w-full py-3.5 rounded-xl border-2 border-white/70 text-white text-base font-semibold hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- desktop ----------
  return (
    <div className="w-full h-full flex flex-col justify-center gap-7">
      <div className="flex flex-col gap-4">
        <h1
          className="text-5xl font-semibold text-white leading-tight"
          style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
        >
          Welcome
        </h1>
        <p className="text-white/80 text-base leading-relaxed max-w-[88%]">
          A quiet space to track your mood, water your focus, and watch both grow.
        </p>
      </div>

      <div className="flex flex-col items-start gap-4">
        <button
          onClick={goLogin}
          className="w-[75%] py-3.5 rounded-xl bg-white text-[#243b2c] text-xl font-semibold hover:bg-[#f0ead9] active:scale-[0.98] transition-all"
        >
          Login
        </button>
        <button
          onClick={goSignup}
          className="w-[75%] py-3.5 rounded-xl border-2 border-white/70 text-white text-xl font-semibold hover:bg-white/10 active:scale-[0.98] transition-all"
        >
          Create account
        </button>
      </div>
    </div>
  );
}
