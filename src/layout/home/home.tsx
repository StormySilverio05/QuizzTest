import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.15),transparent_35%)]" />
      <section className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Planeta de Alofoque
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {" "}
                J Papi
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Vamos a descubrir si eres Gay o un verdadero Hombre
            </p>
          </div>

          {/* Button */}
          <div>
            <Link
              to={"/quizz"}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-base font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              Start Game
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h2 className="text-2xl font-black text-cyan-400">10K+</h2>
              <p className="text-xs text-slate-400">Players</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h2 className="text-2xl font-black text-purple-400">500+</h2>
              <p className="text-xs text-slate-400">Questions</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h2 className="text-2xl font-black text-blue-400">24/7</h2>
              <p className="text-xs text-slate-400">Competition</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
