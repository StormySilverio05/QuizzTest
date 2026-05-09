import { Questions } from "../../data/questions";
export const ResultsModal = ({ point, time }: { point: number, time: number}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B1120] p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-4xl">
              🏆
            </div>

            <h2 className="text-3xl font-black text-white">Quiz Finished</h2>

            <p className="mt-2 text-slate-400">Here are your final results</p>
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

                <h3 className="text-2xl font-black text-red-400">{time}s</h3>
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
    </>
  );
};
