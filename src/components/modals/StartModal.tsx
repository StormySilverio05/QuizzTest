export const StartModal = ({ countdown }: { countdown: number }) => {
  return (
    <>
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
    </>
  );
};
