import { StoryState } from '../story/types';

interface RelationshipMeterProps {
  state: StoryState;
}

export const RelationshipMeter = ({ state }: RelationshipMeterProps) => {
  const getTrustLabel = (value: number): string => {
    if (value >= 60) return 'Strong Connection';
    if (value >= 30) return 'Growing Trust';
    if (value >= 0) return 'Neutral';
    if (value >= -30) return 'Distance';
    return 'Hostile';
  };

  const getTrustColor = (value: number): string => {
    if (value >= 60) return '#4ade80'; // green
    if (value >= 30) return '#86efac'; // light green
    if (value >= 0) return '#94a3b8'; // gray
    if (value >= -30) return '#fbbf24'; // yellow
    return '#f87171'; // red
  };

  const normalizeValue = (value: number): number => {
    // Convert -100 to 100 range to 0-100 for percentage
    return ((value + 100) / 2);
  };

  const getPortraitExpression = (value: number): string => {
    if (value >= 60) return 'happy';
    if (value >= 30) return 'neutral-positive';
    if (value >= 0) return 'neutral';
    if (value >= -30) return 'neutral-negative';
    return 'hostile';
  };

  return (
    <div className="relationship-meter">
      <div className="relationship-portraits">
        <div className="portrait-container">
          <div className={`pixel-portrait portrait-kael ${getPortraitExpression(state.trustLyra)}`}>
            <div className="portrait-label">KAEL</div>
          </div>
        </div>
        <div className="portrait-connection">
          <div 
            className="connection-line"
            style={{
              backgroundColor: getTrustColor(state.trustLyra),
              boxShadow: `0 0 10px ${getTrustColor(state.trustLyra)}`,
            }}
          />
          <div className="connection-value">{state.trustLyra}</div>
        </div>
        <div className="portrait-container">
          <div className={`pixel-portrait portrait-lyra ${getPortraitExpression(state.trustLyra)}`}>
            <div className="portrait-label">LYRA</div>
          </div>
        </div>
      </div>

      <div className="relationship-item">
        <div className="relationship-label">
          <span>Kael & Lyra</span>
          <span className="relationship-value">{state.trustLyra}</span>
        </div>
        <div className="relationship-bar-container">
          <div
            className="relationship-bar"
            style={{
              width: `${normalizeValue(state.trustLyra)}%`,
              backgroundColor: getTrustColor(state.trustLyra),
            }}
          />
        </div>
        <div className="relationship-status">{getTrustLabel(state.trustLyra)}</div>
      </div>

      <div className="relationship-item">
        <div className="relationship-label">
          <span>Brinefolk Trust</span>
          <span className="relationship-value">{state.trustKael}</span>
        </div>
        <div className="relationship-bar-container">
          <div
            className="relationship-bar"
            style={{
              width: `${normalizeValue(state.trustKael)}%`,
              backgroundColor: getTrustColor(state.trustKael),
            }}
          />
        </div>
        <div className="relationship-status">{getTrustLabel(state.trustKael)}</div>
      </div>

      <div className="relationship-flags">
        {state.hasProof && (
          <div className="flag flag-proof">✓ Proof Secured</div>
        )}
        {state.publicKnowsTruth && (
          <div className="flag flag-truth">✓ Truth Revealed</div>
        )}
        {state.brinefolkRallyPotential >= 20 && (
          <div className="flag flag-rally">✓ Brinefolk Ready</div>
        )}
      </div>
    </div>
  );
};

