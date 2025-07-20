import { Skeleton, WelcomePage } from "./components";
import { useAuthContext } from "./AuthContext";

function App() {
  const { authError, handleLogin, handleSignup, userData } = useAuthContext();

  return userData ? (
    <WelcomePage />
  ) : (
    <Skeleton
      serverError={authError}
      onLogin={handleLogin}
      onSignup={handleSignup}
    />
  );
}

export default App;
