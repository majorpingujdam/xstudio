import { useState, ReactNode } from 'react';

interface CollapsiblePanelProps {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
}

export const CollapsiblePanel = ({ 
  title, 
  icon, 
  children, 
  defaultCollapsed = false,
  className = '' 
}: CollapsiblePanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={`terminal-panel ${className} ${isCollapsed ? 'collapsed' : ''}`}>
      <div 
        className="terminal-panel-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="terminal-panel-title">
          {icon && <span className="terminal-icon">{icon}</span>}
          <span className="terminal-title-text">{title}</span>
        </div>
        <div className="terminal-controls">
          <button className="terminal-btn terminal-btn-minimize">
            {isCollapsed ? '▶' : '▼'}
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="terminal-panel-content">
          {children}
        </div>
      )}
    </div>
  );
};




