import React from "react";

export interface TabProps {
  children: React.ReactNode;
  title: string;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return (
    <div className="tab-header-container">
      <div className="tab-header-children">{children}</div>
    </div>
  );
};

export default Tab;
