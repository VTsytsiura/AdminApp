import { useState } from "react";
import RingSpinner from "../spinner/RingSpinner";
import "./LoginForm.css";

interface LoginFormProps {
  onSignin: (username: string, password: string) => Promise<void>;
  switchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignin, switchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await onSignin(username, password);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 login-form">
      <div className="flex flex-col gap-2 input-group">
        <input
            required    
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            required
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
            className="bg-blue-500 text-white p-2 rounded login-button flex justify-center items-center"
            disabled={loading}
      >
            {loading ? <RingSpinner size={20} color="#ffffff" loading={true} /> : "Login"}
      </button>

      <p>
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="text-blue-500 underline toggle-button"
          onClick={switchToSignup}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;