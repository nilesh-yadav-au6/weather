import React, { useState } from "react";
import { TabProps } from "./Tab";

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  defaultIndex?: number;
  rightComponent: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  children,
  defaultIndex = 0,
  rightComponent,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="tabs-container">
      <div className="row-flex">
        <div className="row-flex">
          {children.map((child: React.ReactElement<TabProps>, index) => {
            return (
              <div key={index}>
                <button
                  type="button"
                  className={`tab-header ${
                    index === activeIndex ? "tab-active" : "tab-inactive"
                  }  `}
                  onClick={() => handleClick(index)}
                >
                  {child.props.title}
                </button>
              </div>
            );
          })}
        </div>
        <div>{rightComponent}</div>
      </div>
      <div className="tab-content">{children[activeIndex]}</div>
    </div>
  );
};

export default Tabs;
