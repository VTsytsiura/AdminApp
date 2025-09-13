import React from "react";
import "./Privacy.css"; // optional for extra styling

const Privacy: React.FC = () => {
  return (
    <div className="privacy-container">
      <section>
        <p className="font-weight-bold margin_0">Privacy Policy</p>
        <p className="margin_0">
          Your privacy is important to us. This section explains what information we collect, 
          how we use it, and how we protect it.
        </p>
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Information We Collect</p>
        <ul>
          <li>Account information: name, username, email, role.</li>
          <li>Authentication data: password (stored securely with hashing).</li>
          <li>Optional usage data: actions performed in the app.</li>
        </ul>
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">How We Use Your Information</p>
        <ul>
          <li>To provide and improve app functionality.</li>
          <li>To manage accounts, authentication, and user roles.</li>
          <li>To send notifications or account-related messages.</li>
        </ul>
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">How We Protect Your Data</p>
        <ul>
          <li>Passwords are stored securely using hashing.</li>
          <li>All sensitive data is transmitted over HTTPS.</li>
          <li>Access to user data is restricted to authorized personnel.</li>
        </ul>
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Sharing Your Data</p>
        <ul>
          <li>We do not sell or share your personal data with third parties.</li>
          <li>Data may be shared internally for app functionality (e.g., admin managing users).</li>
        </ul>
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Your Rights</p>
        <ul>
          <li>You can update or delete your account at any time.</li>
          <li>You can request information about the data we store about you.</li>
        </ul>
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Contact</p>
        <p>
          For questions about your privacy or data, contact us at <a href="mailto:support@example.com">log920021@gmail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Privacy;