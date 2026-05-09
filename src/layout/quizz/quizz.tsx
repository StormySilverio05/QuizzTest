import { Link } from "react-router-dom";
import { Questions } from "../../data/questions";
import { useState, useEffect } from "react";
export const QuizScreen = () => {
  //States
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<{
    letter: string;
    text: string;
    isCorrect: boolean;
  } | null>(null);
  
  const [point, setPoint] = useState(0);
  const [time, setTime] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [countdown, setCountdown] = useState(5);

  //Constant
  const porcent = ((currentQuestion + 1) / Questions.length) * 100;

  //Functions
  const handleNext = () => {
    setCurrentQuestion((prev) =>
      prev < Questions.length - 1
        ? prev + 1
        : prev
    );
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (!showStartModal) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowStartModal(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showStartModal]);

  useEffect(() => {
    const data = localStorage.getItem("dataGame");
    if (data) {
      const parsed = JSON.parse(data);
      setPoint(parsed.point);
      setTime(parsed.time);
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (showStartModal){
      return;
    }
    if (showModal) {
      const dataGame = {
        point: point,
        time: time,
      };
      localStorage.setItem("dataGame", JSON.stringify(dataGame));
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setShowModal(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal, showStartModal]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_30%)]" />

      <section className="relative z-10 mx-auto max-w-4xl">
        {/* Top Bar */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex gap-7">
            <Link to={"/"}>Volver</Link>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                Live Quiz Match
              </p>
              <h1 className="mt-1 text-2xl font-black md:text-3xl">
                Science Challenge
              </h1>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2">
              <p className="text-xs text-slate-400">Score</p>
              <h2 className="text-lg font-black text-cyan-400">{point}</h2>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2">
              <p className="text-xs text-slate-400">Time</p>
              <h2 className="text-lg font-black text-red-400">{time}</h2>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>
                Question {currentQuestion + 1} / {Questions.length}
              </span>
              <span>{Math.round(porcent)}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                style={{ width: `${porcent}%` }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-black leading-snug md:text-3xl">
              {Questions[currentQuestion].title}
            </h2>
            {Questions[currentQuestion].img &&
              <img className="mt-4 h-80 w-full rounded-2xl object-cover" src={Questions[currentQuestion].img} />
            }
          </div>

          {/* Answers */}
          <div className="space-y-3">
            {Questions[currentQuestion].options.map((op, index) => (
              <button
                onClick={() => {
                  setSelectedAnswer(op);
                  op.isCorrect ? setPoint((prev) => prev += 10) : point;
                }}
                key={index}
                className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300
                ${
                  selectedAnswer === op
                    ? op.isCorrect
                      ? " border-green-400"
                      : " border-red-400"
                    : "border-white/10 bg-white/5 hover:bg-cyan-400/10"
                }`}
                disabled={selectedAnswer != null}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-black">
                  {op.letter}
                </div>
                <h3 className="text-base font-semibold">{op.text}</h3>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            {currentQuestion < Questions.length - 1 ? (
              <button
                disabled={selectedAnswer == null}
                onClick={handleNext}
                className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                disabled={selectedAnswer == null}
                className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
              >
                Terminar
              </button>
            )}
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B1120] p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-4xl">
                  🏆
                </div>

                <h2 className="text-3xl font-black text-white">
                  Quiz Finished
                </h2>

                <p className="mt-2 text-slate-400">
                  Here are your final results
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm text-slate-400">Final Score</p>

                    <h3 className="text-2xl font-black text-cyan-400">
                      {point} pts
                    </h3>
                  </div>

                  <div className="text-4xl">🎯</div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm text-slate-400">Remaining Time</p>

                    <h3 className="text-2xl font-black text-red-400">
                      {time}s
                    </h3>
                  </div>

                  <div className="text-4xl">⏱️</div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm text-slate-400">Correct Answers</p>

                    <h3 className="text-2xl font-black text-green-400">
                      {point / 10} / {Questions.length}
                    </h3>
                  </div>

                  <div className="text-4xl">✅</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showStartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-3xl border border-cyan-400/20 bg-[#0B1120] p-10 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              {/* Header */}
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-5xl shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  🚀
                </div>

                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                  Get Ready
                </p>

                <h1 className="mt-3 text-4xl font-black text-white">
                  Science Challenge
                </h1>

                <p className="mt-4 text-slate-400">
                  The quiz is about to begin. Prepare yourself and focus.
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-10 flex justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-cyan-400 bg-cyan-400/10 text-6xl font-black text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  {countdown}
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-10">
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    style={{
                      width: `${((5 - countdown) / 5) * 100}%`,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
                  />
                </div>

                <p className="mt-4 text-center text-sm text-slate-500">
                  Quiz starts automatically...
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
