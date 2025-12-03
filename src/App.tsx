import { useEffect, useRef } from 'react';
import { useStoryEngine } from './story/StoryEngine';
import { ChoiceButton } from './components/ChoiceButton';
import { TowerSidebar } from './components/TowerSidebar';
import { RelationshipMeter } from './components/RelationshipMeter';
import { CollapsiblePanel } from './components/CollapsiblePanel';
import './styles.css';

function App() {
  const {
    currentScene,
    storyState,
    handleChoice,
    getSceneText,
    getSceneChoices,
    restart,
  } = useStoryEngine();

  const choiceButtonsRef = useRef<HTMLButtonElement[]>([]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Number keys 1-9 for choices
      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 9 && currentScene) {
        const choices = getSceneChoices(currentScene);
        if (keyNum <= choices.length) {
          const choice = choices[keyNum - 1];
          handleChoice(choice);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentScene, handleChoice, getSceneChoices]);

  if (!currentScene) {
    return <div className="error">Scene not found</div>;
  }

  const sceneText = getSceneText(currentScene);
  const choices = getSceneChoices(currentScene);

  return (
    <div className="terminal-container">
      <div className="terminal-frame">
        <div className="terminal-screen">
          <div className="terminal-header">
            <div className="terminal-header-left">
              <span className="terminal-prompt">RUSTSPIRE_ARCHIVE::</span>
              <span className="terminal-path">/historical_records/ancestor_stories</span>
            </div>
            <div className="terminal-header-right">
              <span className="terminal-status">ACTIVE</span>
              <span className="terminal-date">[ARCHIVED]</span>
            </div>
          </div>

          <div className="terminal-content">
            <div className="main-terminal-panel">
              <CollapsiblePanel 
                title="NARRATIVE RECORD" 
                icon="📜"
                className="story-terminal"
              >
                <div className="terminal-story-content">
                  <div className="archive-meta">
                    <span className="archive-id">RECORD_ID: {currentScene.id.toUpperCase()}</span>
                    <span className="archive-level">LEVEL: {currentScene.level.toUpperCase()}</span>
                    <span className="archive-source">SOURCE: ANCESTOR_MEMORY_BANK</span>
                  </div>

                  <div className="archive-notice">
                    {'>'} Accessing historical narrative record...<br/>
                    {'>'} Reconstructing ancestor story from archived data fragments...<br/>
                    {'>'} Generation: Descendants | Reading: Ancestor Adventures
                  </div>

                  {currentScene.isEnding && (
                    <div className="ending-banner">
                      <h2 className="ending-title">{currentScene.title}</h2>
                      <div className={`ending-badge ending-${currentScene.endingType}`}>
                        {currentScene.endingType?.toUpperCase()}
                      </div>
                    </div>
                  )}
                  
                  {currentScene.title && !currentScene.isEnding && (
                    <h1 className="scene-title">{currentScene.title}</h1>
                  )}

                  <div className="scene-text">
                    {sceneText.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="choices-container">
                    <div className="terminal-prompt-choice">SELECT_PATH:</div>
                    {choices.map((choice, index) => (
                      <ChoiceButton
                        key={choice.id}
                        choice={choice}
                        index={index}
                        onClick={() => handleChoice(choice)}
                      />
                    ))}
                  </div>

                  {currentScene.isEnding && (
                    <div className="ending-summary">
                      <h3>ARCHIVE SUMMARY</h3>
                      <div className="summary-stats">
                        <div className="stat">
                          <span className="stat-label">Lyra's Trust:</span>
                          <span className="stat-value">
                            {storyState.trustLyra >= 60 ? 'High' : 
                             storyState.trustLyra >= 30 ? 'Moderate' : 
                             storyState.trustLyra >= 0 ? 'Neutral' : 'Low'}
                          </span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Proof:</span>
                          <span className="stat-value">{storyState.hasProof ? 'Secured' : 'Lost'}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Truth Revealed:</span>
                          <span className="stat-value">{storyState.publicKnowsTruth ? 'Yes' : 'No'}</span>
                        </div>
                        {storyState.brinefolkRallyPotential >= 20 && (
                          <div className="stat">
                            <span className="stat-label">Brinefolk Rally:</span>
                            <span className="stat-value">High</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsiblePanel>
            </div>

            <div className="terminal-sidebar">
              <CollapsiblePanel 
                title="TOWER PROGRESSION" 
                icon="🗼"
                defaultCollapsed={false}
              >
                <TowerSidebar currentLevel={currentScene.level} />
              </CollapsiblePanel>

              <CollapsiblePanel 
                title="RELATIONSHIP DATA" 
                icon="📊"
                defaultCollapsed={false}
              >
                <RelationshipMeter state={storyState} />
              </CollapsiblePanel>
            </div>
          </div>

          <div className="terminal-footer">
            <span className="terminal-footer-text">
              {'>'} Accessing historical records... | Generation: Descendants | Status: Reading Ancestor Stories
            </span>
          </div>
        </div>
      </div>
      <div className="scanlines"></div>
      <div className="terminal-glow"></div>
    </div>
  );
}

export default App;

