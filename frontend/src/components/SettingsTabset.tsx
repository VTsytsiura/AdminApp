import React, { useState } from "react";
import AccountSettings from "./AccountSettings";

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
        {activeTab === "Users" && <div>
            <p>👥 User management content...</p>
        </div>}
        {activeTab === "Privacy" && 
        <div>
            <p>© 2025 Game Dashboard. All rights reserved.</p>
        </div>}
      </div>
    </div>
  );
};

export default SettingsTabset;