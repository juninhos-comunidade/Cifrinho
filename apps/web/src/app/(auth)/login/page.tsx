"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "login" | "signup";

function passwordStrength(v: string): number {
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return score;
}

const STRENGTH_COLORS = [
  "var(--c-rose)",
  "var(--c-amber)",
  "var(--c-blue)",
  "var(--c-brand)",
];
const STRENGTH_LABELS = [
  "Senha fraca",
  "Senha razoável",
  "Senha boa",
  "Senha forte",
];

// ---- Componentes do mascote ----
function Mascot({
  pwFocused,
  rememberOn,
  termsAccepted,
}: {
  pwFocused: boolean;
  rememberOn: boolean;
  termsAccepted: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Mouse tracker
  useEffect(() => {
    let dx = 0,
      dy = 0,
      tx = 0,
      ty = 0;
    let raf: number;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    function tick() {
      dx += (tx - dx) * 0.09;
      dy += (ty - dy) * 0.09;
      const rotY = dx * 16;
      const rotX = -dy * 12;
      const rotZ = dx * 4;
      const px = dx * 9,
        py = dy * 7;
      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `perspective(720px) translate(${px.toFixed(2)}px,${py.toFixed(2)}px) ` +
          `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Piscar
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function blinkLoop() {
      const wait = 2600 + Math.random() * 3200;
      timer = setTimeout(() => {
        if (!pwFocused) {
          setBlinking(true);
          setTimeout(() => setBlinking(false), 150);
        }
        blinkLoop();
      }, wait);
    }
    blinkLoop();
    return () => clearTimeout(timer);
  }, [pwFocused]);

  // Animação do relógio de "remember me"
  const [showClock, setShowClock] = useState(false);
  const clockTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    if (rememberOn) {
      setShowClock(false);
      // delay para garantir que a animação rode mesmo se o gatilho for acionado durante a animação anterior
      setTimeout(() => {
        setShowClock(true);
        clearTimeout(clockTimerRef.current);
        clockTimerRef.current = setTimeout(() => setShowClock(false), 3200);
      }, 16);
    }
  }, [rememberOn]);

  // Animação do "oink"
  const [showOink, setShowOink] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  useEffect(() => {
    if (termsAccepted) {
      setShowOink(false);
      setShowHearts(false);
      setTimeout(() => {
        setShowOink(true);
        setShowHearts(true);
        setTimeout(() => {
          setShowOink(false);
          setShowHearts(false);
        }, 1500);
      }, 16);
    }
  }, [termsAccepted]);

  const eyesClosed = pwFocused || blinking;

  return (
    <div
      ref={stageRef}
      style={{
        position: "relative",
        width: 248,
        height: 248,
        animation: "pigfloat 6s ease-in-out infinite",
      }}
    >
      <div
        ref={wrapRef}
        style={{
          position: "absolute",
          inset: 0,
          willChange: "transform",
          transition: "transform .28s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <Image
          src="/cifrinho-mascot.png"
          alt="Mascote Cifrinho"
          width={248}
          height={248}
          style={{
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 20px 32px rgb(33 194 94 / .28))",
          }}
          priority
        />
        {/* Pálpebras */}
        <span
          style={{
            position: "absolute",
            background: "#10b981",
            borderRadius: "0 0 65% 65% / 0 0 85% 85%",
            transform: eyesClosed ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top center",
            transition: "transform .16s ease",
            zIndex: 3,
            left: "25.5%",
            top: "23.8%",
            width: "6.8%",
            height: "10.4%",
          }}
        />
        <span
          style={{
            position: "absolute",
            background: "#10b981",
            borderRadius: "0 0 65% 65% / 0 0 85% 85%",
            transform: eyesClosed ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top center",
            transition: "transform .16s ease",
            zIndex: 3,
            left: "68.8%",
            top: "23.8%",
            width: "6.8%",
            height: "10.4%",
          }}
        />
      </div>

      {/* Relógio de "remember me" */}
      <div
        style={{
          position: "absolute",
          top: -4,
          left: 18,
          width: 48,
          height: 48,
          zIndex: 5,
          opacity: showClock ? 1 : 0,
          transform: showClock
            ? "scale(1) translateY(0) rotate(0)"
            : "scale(.3) translateY(10px) rotate(-25deg)",
          transition:
            "opacity .25s ease, transform .4s cubic-bezier(.2,1.4,.4,1)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#fff",
            border: "3px solid #10b981",
            boxShadow: "0 8px 18px rgb(0 0 0 / .35)",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              transformOrigin: "bottom center",
              background: "#0f172a",
              borderRadius: 99,
              width: 3.5,
              height: 10,
              transform: "translateX(-50%) rotate(20deg)",
              animation: showClock ? "rcspin 3.6s linear infinite" : "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              transformOrigin: "bottom center",
              background: "#0f172a",
              borderRadius: 99,
              width: 3,
              height: 15,
              transform: "translateX(-50%) rotate(150deg)",
              animation: showClock ? "rcspin 1.2s linear infinite" : "none",
            }}
          />
        </div>
      </div>

      {/* bolha de "oink" */}
      <div
        style={{
          position: "absolute",
          top: "4%",
          right: -10,
          zIndex: 6,
          pointerEvents: "none",
          background: "#fff",
          color: "#0f172a",
          fontWeight: 800,
          fontSize: 13,
          padding: "5px 11px",
          borderRadius: "13px 13px 13px 4px",
          boxShadow: "0 8px 18px rgb(0 0 0 / .32)",
          opacity: showOink ? 1 : 0,
          animation: showOink ? "oinkpop 1.4s ease both" : "none",
        }}
      >
        Oink!
      </div>

      {/* corações */}
      {(["left", "right"] as const).map((side) => (
        <span
          key={side}
          style={{
            position: "absolute",
            width: 22,
            height: 22,
            zIndex: 5,
            pointerEvents: "none",
            color: "#fb7185",
            left: side === "left" ? "25%" : undefined,
            right: side === "right" ? "25%" : undefined,
            top: "47%",
            opacity: 0,
            animation: showHearts
              ? side === "left"
                ? "heartL 1.4s ease-out both"
                : "heartR 1.4s ease-out both .7s"
              : "none",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              filter: "drop-shadow(0 4px 8px rgb(0 0 0 / .28))",
            }}
          >
            <path d="M12 21s-6.7-4.35-9.3-8.06C1.1 10.43 1.5 7.2 4 5.8c1.9-1.06 4.2-.4 5.4 1.1L12 9.9l2.6-3c1.2-1.5 3.5-2.16 5.4-1.1 2.5 1.4 2.9 4.63 1.3 7.14C18.7 16.65 12 21 12 21Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

// ---- Ícone do olho ----
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // estado do login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPwVisible, setLoginPwVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // estado de cadastro
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPwVisible, setSignupPwVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAcceptedFired, setTermsAcceptedFired] = useState(false);
  const [pwScore, setPwScore] = useState(0);

  // triggers do mascote
  const [pwFocused, setPwFocused] = useState(false);
  const [rememberFired, setRememberFired] = useState(false);

  function handlePasswordChange(v: string) {
    setSignupPassword(v);
    setPwScore(passwordStrength(v));
  }

  function handleRememberToggle() {
    const next = !rememberMe;
    setRememberMe(next);
    if (next) setRememberFired((f) => !f); // alterna para re-disparar o efeito do mascote
  }

  function handleTermsToggle() {
    const next = !termsAccepted;
    setTermsAccepted(next);
    if (next) setTermsAcceptedFired((f) => !f);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
        rememberMe,
      });
      setUser(data.user);
      router.push("/overview");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!termsAccepted) {
      setError("Aceite os termos para continuar.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      setUser(data.user);
      router.push("/overview");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  const heading = tab === "login" ? "Bem-vindo de volta" : "Crie sua conta";
  const subtext =
    tab === "login"
      ? "Entre para acompanhar suas finanças."
      : "Comece de graça em menos de um minuto.";

  return (
    <>
      <style>{`
        @keyframes pigfloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes rcspin { to { transform:translateX(-50%) rotate(360deg); } }
        @keyframes oinkpop {
          0%   { opacity:0; transform:scale(.4) translateY(8px) rotate(-6deg); }
          16%  { opacity:1; transform:scale(1) translateY(0) rotate(0); }
          72%  { opacity:1; transform:scale(1) translateY(0); }
          100% { opacity:0; transform:scale(.92) translateY(-8px); }
        }
        @keyframes heartL {
          0%   { opacity:0; transform:translate(0,0) scale(.4); }
          18%  { opacity:1; transform:translate(-6px,-12px) scale(1); }
          100% { opacity:0; transform:translate(-30px,-94px) scale(.85); }
        }
        @keyframes heartR {
          0%   { opacity:0; transform:translate(0,0) scale(.4); }
          18%  { opacity:1; transform:translate(6px,-12px) scale(1); }
          100% { opacity:0; transform:translate(30px,-94px) scale(.85); }
        }
        @keyframes rise { from { transform:translateY(10px); opacity:0; } to { transform:none; opacity:1; } }
        .pane-enter { animation: rise .4s ease both; }

        .auth-field {
          width:100%; border-radius:12px; border:1px solid rgb(var(--c-line));
          background:rgb(var(--c-bg)); color:rgb(var(--c-ink));
          padding:12px 14px 12px 42px; font-size:14px; outline:none;
          transition:border-color .18s ease, box-shadow .18s ease;
          font-family:inherit;
        }
        .auth-field::placeholder { color:rgb(var(--c-faint)); }
        .auth-field:focus { border-color:rgb(var(--c-brand) / .7); box-shadow:0 0 0 3px rgb(var(--c-brand) / .14); }

        .auth-tab { position:relative; padding:10px 4px; font-weight:700; font-size:15px; color:rgb(var(--c-mute)); cursor:pointer; transition:color .2s ease; border:0; background:none; font-family:inherit; }
        .auth-tab.on { color:rgb(var(--c-ink)); }
        .auth-tab.on::after { content:""; position:absolute; left:0; right:0; bottom:-1px; height:2px; border-radius:99px; background:rgb(var(--c-brand)); }

        .soc-btn { display:flex; align-items:center; justify-content:center; gap:10px; width:100%; border-radius:12px; border:1px solid rgb(var(--c-line)); background:rgb(var(--c-card)); padding:11px; font-size:14px; font-weight:600; color:rgb(var(--c-ink)); cursor:pointer; transition:border-color .18s ease, background-color .18s ease; font-family:inherit; }
        .soc-btn:hover { border-color:rgb(var(--c-mute) / .5); background:rgb(var(--c-elev)); }

        .strength-bar { height:4px; border-radius:99px; flex:1; transition:background-color .25s ease; }

        @media (prefers-reduced-motion: reduce) {
          .auth-field, .soc-btn, .auth-tab { transition: none; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* ESQUERDA: Painel da marca */}
        <aside className="relative hidden w-[44%] xl:w-[48%] lg:flex flex-col justify-between overflow-hidden border-r border-line bg-card p-12">
          {/* glow de fundo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 0%, rgb(var(--c-brand) / 0.14), transparent 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.6,
              backgroundImage:
                "linear-gradient(to right, rgba(31,41,55,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,41,55,0.5) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* logo */}
          <a
            href="/"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Image
              src="/cifrinho-mascot.png"
              alt="Cifrinho"
              width={40}
              height={40}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Cifrinho
            </span>
          </a>

          {/* pitch central com mascote */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <Mascot
                pwFocused={pwFocused}
                rememberOn={rememberFired}
                termsAccepted={termsAcceptedFired}
              />
            </div>
            <h2
              style={{
                maxWidth: 400,
                fontSize: 36,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Sua vida financeira,
              <br />
              <span style={{ color: "rgb(var(--c-brand))" }}>
                pessoal e empresarial
              </span>
              ,<br />
              num só lugar.
            </h2>
            <p
              style={{
                marginTop: 20,
                maxWidth: 400,
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgb(var(--c-mute))",
              }}
            >
              Organize gastos, separe PF de PJ e deixe seu Imposto de Renda
              pronto o ano inteiro — com a clareza de quem leva a grana a sério.
            </p>

            {/* chips de funcionalidades */}
            <div
              style={{
                marginTop: 32,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
              }}
            >
              {[
                { label: "Gestão pessoal", dot: "brand" },
                { label: "Controle PF e PJ", dot: "blue" },
                { label: "IR sempre pronto", dot: "purple" },
              ].map(({ label, dot }) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    borderRadius: 99,
                    border: "1px solid rgb(var(--c-line))",
                    background: "rgb(var(--c-bg) / .6)",
                    padding: "6px 14px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgb(var(--c-mute))",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 99,
                      background: `rgb(var(--c-${dot}))`,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* prova social */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ display: "flex" }}>
              {[
                {
                  initials: "RA",
                  from: "from-brand",
                  to: "to-blue",
                  grad: "linear-gradient(135deg, rgb(var(--c-brand)), rgb(var(--c-blue)))",
                },
                {
                  initials: "JV",
                  from: "from-purple",
                  to: "to-blue",
                  grad: "linear-gradient(135deg, rgb(var(--c-purple)), rgb(var(--c-blue)))",
                },
                {
                  initials: "MA",
                  from: "from-amber",
                  to: "to-rose",
                  grad: "linear-gradient(135deg, rgb(var(--c-amber)), rgb(var(--c-rose)))",
                },
                {
                  initials: "+9k",
                  grad: "rgb(var(--c-elev))",
                  color: "rgb(var(--c-mute))",
                },
              ].map(({ initials, grad, color }, i) => (
                <span
                  key={i}
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: grad,
                    color: color ?? "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    outline: "2px solid rgb(var(--c-card))",
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                >
                  {initials}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 14, color: "rgb(var(--c-mute))", margin: 0 }}>
              Mais de{" "}
              <span style={{ fontWeight: 600, color: "rgb(var(--c-ink))" }}>
                9.000 Juninhos
              </span>{" "}
              já organizam suas finanças.
            </p>
          </div>
        </aside>

        {/* DIREITA: Painel do formulário */}
        <main
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            padding: "32px 20px",
          }}
        >
          {/* topo: logo mobile */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "inherit",
              }}
              className="lg:invisible"
            >
              <Image
                src="/cifrinho-mascot.png"
                alt="Cifrinho"
                width={36}
                height={36}
              />
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Cifrinho
              </span>
            </a>
          </div>

          {/* formulário centralizado */}
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 0",
            }}
          >
            <div style={{ width: "100%", maxWidth: 448 }}>
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {heading}
              </h1>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 16,
                  color: "rgb(var(--c-mute))",
                }}
              >
                {subtext}
              </p>

              {/* abas de navegação */}
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 28,
                  borderBottom: "1px solid rgb(var(--c-line))",
                }}
              >
                <button
                  className={`auth-tab${tab === "login" ? " on" : ""}`}
                  onClick={() => {
                    setTab("login");
                    setError("");
                  }}
                >
                  Entrar
                </button>
                <button
                  className={`auth-tab${tab === "signup" ? " on" : ""}`}
                  onClick={() => {
                    setTab("signup");
                    setError("");
                  }}
                >
                  Criar conta
                </button>
              </div>

              {/* botões de login social */}
              <div
                style={{
                  marginTop: 28,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <button type="button" className="soc-btn">
                  <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                    <path
                      fill="#FFC107"
                      d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20.5H24v8h11.3c-.8 2.3-2.2 4.2-4 5.6l6.3 5.3C41.4 36.5 44 30.8 44 24c0-1.3-.1-2.3-.4-3.5z"
                    />
                  </svg>
                  Google
                </button>
                <button type="button" className="soc-btn">
                  <svg
                    style={{ width: 20, height: 20 }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.365 1.43c0 1.14-.42 2.27-1.25 3.09-.83.83-2.04 1.46-3.18 1.37-.13-1.1.4-2.27 1.18-3.04.83-.85 2.16-1.46 3.25-1.42zM20.5 17.06c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.52-4.12 3.53-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.02-3.05-1.78-4.04-3.35C-.06 16.21-.36 11.13 2.2 8.43c1.06-1.12 2.46-1.78 3.96-1.78 1.53 0 2.49 1.01 3.76 1.01 1.22 0 1.96-1.01 3.73-1.01 1.32 0 2.72.72 3.72 1.96-3.27 1.79-2.74 6.45.93 7.45z" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* separador */}
              <div
                style={{
                  margin: "24px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    height: 1,
                    flex: 1,
                    background: "rgb(var(--c-line))",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgb(var(--c-faint))",
                  }}
                >
                  ou com e-mail
                </span>
                <span
                  style={{
                    height: 1,
                    flex: 1,
                    background: "rgb(var(--c-line))",
                  }}
                />
              </div>

              {/* mensagem de erro */}
              {error && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgb(var(--c-rose) / .1)",
                    border: "1px solid rgb(var(--c-rose) / .2)",
                    color: "rgb(var(--c-rose))",
                    fontSize: 14,
                  }}
                >
                  {error}
                </div>
              )}

              {/* PAINEL DE LOGIN */}
              {tab === "login" && (
                <form key="login" className="pane-enter" onSubmit={handleLogin}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {/* campo de e-mail */}
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgb(var(--c-faint))",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        className="auth-field"
                        placeholder="E-mail"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    {/* campo de senha */}
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgb(var(--c-faint))",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="4" y="11" width="16" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                      </span>
                      <input
                        type={loginPwVisible ? "text" : "password"}
                        className="auth-field"
                        style={{ paddingRight: 44 }}
                        placeholder="Senha"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onFocus={() => setPwFocused(true)}
                        onBlur={() => setPwFocused(false)}
                      />
                      <button
                        type="button"
                        onClick={() => setLoginPwVisible((v) => !v)}
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgb(var(--c-faint))",
                          cursor: "pointer",
                          background: "none",
                          border: 0,
                          padding: 0,
                        }}
                      >
                        <EyeIcon open={loginPwVisible} />
                      </button>
                    </div>
                  </div>

                  {/* lembrar de mim + esqueci a senha */}
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 14,
                        color: "rgb(var(--c-mute))",
                        cursor: "pointer",
                      }}
                    >
                      <button
                        type="button"
                        role="switch"
                        aria-checked={rememberMe}
                        onClick={handleRememberToggle}
                        className={`tgl${rememberMe ? " on" : ""}`}
                      />
                      Lembrar de mim
                    </label>
                    <a
                      href="#"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "rgb(var(--c-brand))",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      Esqueci a senha
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: 24,
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderRadius: 12,
                      background: "rgb(var(--c-brand))",
                      padding: "14px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#fff",
                      border: 0,
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      boxShadow: "0 4px 20px rgb(var(--c-brand) / .2)",
                      transition:
                        "background-color .18s ease, box-shadow .18s ease",
                      fontFamily: "inherit",
                    }}
                  >
                    {loading ? "Entrando…" : "Entrar"}
                    {!loading && (
                      <svg
                        style={{ width: 16, height: 16 }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    )}
                  </button>
                </form>
              )}

              {/* PAINEL DE CADASTRO */}
              {tab === "signup" && (
                <form
                  key="signup"
                  className="pane-enter"
                  onSubmit={handleRegister}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {/* campo de nome */}
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgb(var(--c-faint))",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="auth-field"
                        placeholder="Nome completo"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                      />
                    </div>
                    {/* campo de e-mail */}
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgb(var(--c-faint))",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        className="auth-field"
                        placeholder="E-mail"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </div>
                    {/* campo de senha */}
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgb(var(--c-faint))",
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="4" y="11" width="16" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                      </span>
                      <input
                        type={signupPwVisible ? "text" : "password"}
                        className="auth-field"
                        style={{ paddingRight: 44 }}
                        placeholder="Crie uma senha"
                        required
                        minLength={8}
                        value={signupPassword}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        onFocus={() => setPwFocused(true)}
                        onBlur={() => setPwFocused(false)}
                      />
                      <button
                        type="button"
                        onClick={() => setSignupPwVisible((v) => !v)}
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "rgb(var(--c-faint))",
                          cursor: "pointer",
                          background: "none",
                          border: 0,
                          padding: 0,
                        }}
                      >
                        <EyeIcon open={signupPwVisible} />
                      </button>
                    </div>

                    {/* medidor de força da senha */}
                    <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className="strength-bar"
                          style={{
                            background:
                              signupPassword && i < pwScore
                                ? `rgb(${STRENGTH_COLORS[Math.max(0, pwScore - 1)]})`
                                : "rgb(var(--c-line))",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        marginTop: -4,
                        fontSize: 12,
                        color: "rgb(var(--c-faint))",
                      }}
                    >
                      {signupPassword
                        ? STRENGTH_LABELS[Math.max(0, pwScore - 1)]
                        : "Use 8+ caracteres com letras, números e símbolos."}
                    </p>
                  </div>

                  {/* aceite dos termos */}
                  <label
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      color: "rgb(var(--c-mute))",
                      cursor: "pointer",
                    }}
                  >
                    <button
                      type="button"
                      role="switch"
                      aria-checked={termsAccepted}
                      onClick={handleTermsToggle}
                      style={{ marginTop: 2, flexShrink: 0 }}
                      className={`tgl${termsAccepted ? " on" : ""}`}
                    />
                    <span>
                      Concordo com os{" "}
                      <a
                        href="/legal"
                        style={{
                          fontWeight: 600,
                          color: "rgb(var(--c-brand))",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.textDecoration = "underline")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.textDecoration = "none")
                        }
                      >
                        Termos
                      </a>{" "}
                      e a{" "}
                      <a
                        href="/legal"
                        style={{
                          fontWeight: 600,
                          color: "rgb(var(--c-brand))",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.textDecoration = "underline")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.textDecoration = "none")
                        }
                      >
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: 24,
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderRadius: 12,
                      background: "rgb(var(--c-brand))",
                      padding: "14px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#fff",
                      border: 0,
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      boxShadow: "0 4px 20px rgb(var(--c-brand) / .2)",
                      transition:
                        "background-color .18s ease, box-shadow .18s ease",
                      fontFamily: "inherit",
                    }}
                  >
                    {loading ? "Criando conta…" : "Criar conta grátis"}
                    {!loading && (
                      <svg
                        style={{ width: 16, height: 16 }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    )}
                  </button>
                  <p
                    style={{
                      marginTop: 12,
                      textAlign: "center",
                      fontSize: 12,
                      color: "rgb(var(--c-faint))",
                    }}
                  >
                    Sem cartão de crédito · Cancele quando quiser
                  </p>
                </form>
              )}

              {/* link para alternar entre login e cadastro */}
              <p
                style={{
                  marginTop: 28,
                  textAlign: "center",
                  fontSize: 14,
                  color: "rgb(var(--c-mute))",
                }}
              >
                {tab === "login" ? (
                  <>
                    Ainda não tem conta?{" "}
                    <button
                      onClick={() => {
                        setTab("signup");
                        setError("");
                      }}
                      style={{
                        fontWeight: 600,
                        color: "rgb(var(--c-brand))",
                        background: "none",
                        border: 0,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        padding: 0,
                        fontSize: "inherit",
                      }}
                    >
                      Criar agora
                    </button>
                  </>
                ) : (
                  <>
                    Já tem conta?{" "}
                    <button
                      onClick={() => {
                        setTab("login");
                        setError("");
                      }}
                      style={{
                        fontWeight: 600,
                        color: "rgb(var(--c-brand))",
                        background: "none",
                        border: 0,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        padding: 0,
                        fontSize: "inherit",
                      }}
                    >
                      Entrar
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* rodapé */}
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(var(--c-faint))",
            }}
          >
            © 2026 Cifrinho · Feito pela{" "}
            <a
              href="https://www.juninhos.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Comunidade Juninhos
            </a>
          </p>
        </main>
      </div>
    </>
  );
}
