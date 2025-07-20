import { useAuthContext } from "../../AuthContext";

export const WelcomePage = () => {
  const { handleLogout, userData } = useAuthContext();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Animated background blob */}
      <div className="absolute top-0 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 bg-cyan-500 opacity-30 rounded-full blur-[150px] animate-pulse" />

      <div className="relative z-10 text-center px-6 sm:px-10 py-12 max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl animate-fade-in-slide">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-6">
          Welcome to the Future ✨
        </h1>

        <p className="text-lg sm:text-xl text-white/80 mb-8">
          {userData?.name}
        </p>

        <button
          className="px-8 py-3 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:shadow-blue-400/50 transition hover:scale-105 active:scale-95 focus:outline-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
