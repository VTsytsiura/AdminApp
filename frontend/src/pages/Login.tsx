import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/signup/SignupForm";
import { useUser } from "../context/UserContext";
import { setToken as saveToken } from "../utils/token";
import "./Login.css";
import RingSpinner from "../components/spinner/RingSpinner";

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  // ------------------ LOGIN ------------------
  async function handleSignin(username: string, password: string) {
    if (!username || !password) return;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        (window as any).toast(err.error || "Login failed", "error");
        return;
      }

      const data = await res.json();

      saveToken(data.token);

      setUser({
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
      });

      navigate("/", { replace: true });
      (window as any).toast("Logged in successfully!", "success");
    } catch (err) {
      (window as any).toast("Server error", "error");
    }
  }

  // ------------------ SIGNUP ------------------
  async function handleSignup(username: string, password: string, role = "user") {
    if (!username || !password) return;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) {
        const err = await res.json();
        (window as any).toast(err.error || "Signup failed", "error");
        return;
      }

      const data = await res.json();
      saveToken(data.token);

      setUser({
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
      });

      navigate("/", { replace: true });
      (window as any).toast("Signed up successfully!", "success");
      setIsSignup(false);
    } catch (err) {
      (window as any).toast("Server error", "error");
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow login-container">
      <RingSpinner />
      <h1 className="text-xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h1>
      {!isSignup ? (
        <LoginForm onSignin={handleSignin} switchToSignup={() => setIsSignup(true)} />
      ) : (
        <SignupForm onSignup={handleSignup} switchToLogin={() => setIsSignup(false)} />
      )}
    </div>
  );
};

export default Login;