import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import UsersSettings from "./UsersSettings";
import Privacy from "../privacy/Privacy";

const tabs = ["Account", "Users", "Privacy"] as const;

const SettingsTabset: React.FC = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Account");

  return (
    <div>
      <div className="tabset">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Account" && <AccountSettings />}
        {activeTab === "Users" && <UsersSettings />}
        {activeTab === "Privacy" && <Privacy />}
      </div>
    </div>
  );
};

export default SettingsTabset;