import { useState } from "react";
import RingSpinner from "../spinner/RingSpinner";
import "./SignupForm.css";

interface SignupFormProps {
  onSignup: (username: string, password: string) => Promise<void>;
  switchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await onSignup(username, password);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 signup-form">
      <div className="flex flex-col gap-2 input-group">
        <input
            required
            type="text"
            placeholder="New username"
            className="border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            required
            type="password"
            placeholder="New password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
            className="bg-green-500 text-white p-2 rounded signup-button flex justify-center items-center"
            disabled={loading}
      >
            {loading ? <RingSpinner size={20} color="#ffffff" loading={true} /> : "Sign up"}
      </button>

      <p>
            Already have an account?{" "}
            <button
                type="button"
                className="text-blue-500 underline toggle-button"
                onClick={switchToLogin}
            >
                Back to login
            </button>
      </p>
    </form>
  );
};

export default SignupForm;