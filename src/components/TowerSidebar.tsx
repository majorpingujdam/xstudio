import { TowerLevel } from '../story/types';

interface TowerSidebarProps {
  currentLevel: TowerLevel;
}

const levelOrder: TowerLevel[] = ['sea', 'lower', 'mid', 'upper', 'summit', 'epilogue'];

const levelLabels: Record<TowerLevel, string> = {
  sea: 'The Sea',
  lower: 'Lower Levels',
  mid: 'Mid Levels',
  upper: 'Upper Levels',
  summit: 'The Summit',
  epilogue: 'Epilogue',
};

export const TowerSidebar = ({ currentLevel }: TowerSidebarProps) => {
  const currentIndex = levelOrder.indexOf(currentLevel);

  return (
    <div className="tower-sidebar">
      <div className="tower-levels">
        {levelOrder.map((level, index) => {
          const isActive = level === currentLevel;
          const isPast = index <= currentIndex;
          
          return (
            <div
              key={level}
              className={`tower-level ${isActive ? 'active' : ''} ${isPast ? 'visited' : ''}`}
            >
              <div className="tower-level-marker"></div>
              <span className="tower-level-label">{levelLabels[level]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

