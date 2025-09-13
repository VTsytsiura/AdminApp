import React from "react";
import userIcon from "../assets/user.svg";

const AccountSettings: React.FC = () => {
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/users/admin");
      const data = await response.json();

      if (data.success) {
        setUserData(data.user);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <section>
        <p className="font-weight-bold margin_0">Account</p>
        <p className="margin_0">Real-time information and activities of your property</p>
        <div className="line"></div>
      </section>

      <section>
        <div className="account-picture">
          <img src={userIcon} alt="Account" />
        </div>
        <p className="font-weight-bold">Full Name</p>

        <div className="inline-group">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              className="input"
              type="text"
              value={userData?.firstName || ""}
              id="first-name"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              className="input"
              type="text"
              value={userData?.lastName || ""}
              id="last-name"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              type="text"
              value={userData?.username || ""}
              id="username"
              readOnly
            />
          </div>
        </div>

        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Contact Email</p>
        <input
          className="input"
          type="email"
          value={userData?.email || ""}
          id="email"
          readOnly
        />
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Password</p>

        <div className="inline-group">
          <div className="form-group">
            <label htmlFor="password">Current Password</label>
            <input
              className="input"
              type="password"
              value={userData?.password || ""}
              id="password"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              className="input"
              type="password"
              value=""
              id="new-password"
            />
          </div>
        </div>
        <div className="line"></div>
      </section>

      <button className="btn btn-primary">Save Changes</button>
    </div>
  );
};

export default AccountSettings;