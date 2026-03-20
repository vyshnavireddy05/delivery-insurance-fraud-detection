import { useState } from 'react';
import './App.css';

/**
 * Simulates a backend response with fraud indicators
 * In a real system, this would come from an API
 * @param {boolean} fakeGpsEnabled - Manual override for testing
 * @param {boolean} deviceMismatchEnabled - Manual override for testing
 * @param {boolean} abnormalBehaviorEnabled - Manual override for testing
 * @returns {object} Fraud data with three boolean flags
 */
function getFraudData(fakeGpsEnabled = false, deviceMismatchEnabled = false, abnormalBehaviorEnabled = false) {
  // If manual toggles are enabled, return those values
  // Otherwise, simulate random fraud indicators (10-20% fraud rate)
  return {
    fakeGPS: fakeGpsEnabled || Math.random() < 0.15,
    deviceMismatch: deviceMismatchEnabled || Math.random() < 0.12,
    abnormalBehavior: abnormalBehaviorEnabled || Math.random() < 0.10,
  };
}

/**
 * Calculates risk score based on fraud indicators
 * Risk Scoring System:
 * - Fake GPS: +30 points (GPS spoofing is a strong fraud signal)
 * - Device Mismatch: +25 points (Device inconsistency indicates compromise)
 * - Abnormal Behavior: +20 points (Unusual patterns suggest fraud)
 * @param {object} fraudData - Object containing fraud indicators
 * @returns {number} Total risk score
 */
function calculateRiskScore(fraudData) {
  let score = 0;

  if (fraudData.fakeGPS) {
    score += 30;
  }

  if (fraudData.deviceMismatch) {
    score += 25;
  }

  if (fraudData.abnormalBehavior) {
    score += 20;
  }

  return score;
}

/**
 * Determines risk level based on score
 * Risk Levels:
 * - 0-40: LOW (Safe transaction)
 * - 41-70: MEDIUM (Requires review)
 * - 71+: HIGH (High fraud probability)
 * @param {number} score - Risk score
 * @returns {string} Risk level
 */
function getRiskLevel(score) {
  if (score <= 40) {
    return 'LOW';
  } else if (score <= 70) {
    return 'MEDIUM';
  } else {
    return 'HIGH';
  }
}

/**
 * Makes final decision on claim approval
 * Decision Logic:
 * - Score > 50: FLAGGED (claim requires further investigation)
 * - Score <= 50: APPROVED (claim appears legitimate)
 * @param {number} score - Risk score
 * @returns {string} Final decision
 */
function makeDecision(score) {
  return score > 50 ? 'FLAGGED' : 'APPROVED';
}

export default function App() {
  // State for claim analysis results
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // State for toggle switches (bonus feature)
  const [toggles, setToggles] = useState({
    fakeGPS: false,
    deviceMismatch: false,
    abnormalBehavior: false,
  });

  /**
   * Handles the "Claim Weather Insurance" button click
   * Performs a complete fraud analysis on a simulated delivery
   */
  const handleClaimInsurance = () => {
    // Get fraud indicators (using toggle switch values)
    const fraudData = getFraudData(
      toggles.fakeGPS,
      toggles.deviceMismatch,
      toggles.abnormalBehavior
    );

    // Calculate risk score
    const riskScore = calculateRiskScore(fraudData);

    // Determine risk level and final decision
    const riskLevel = getRiskLevel(riskScore);
    const decision = makeDecision(riskScore);

    // Store results for display
    setAnalysisResult({
      fraudData,
      riskScore,
      riskLevel,
      decision,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  /**
   * Handles toggle switch changes
   */
  const handleToggle = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * Renders risk score as a visual progress bar
   */
  const RiskMeterBar = ({ score }) => {
    let barColor = '#4CAF50'; // Green for low risk
    if (score > 70) {
      barColor = '#F44336'; // Red for high risk
    } else if (score > 40) {
      barColor = '#FFC107'; // Yellow for medium risk
    }

    return (
      <div className="risk-meter-container">
        <div className="risk-meter-bar" style={{ width: `${Math.min(score, 100)}%`, backgroundColor: barColor }}></div>
        <span className="risk-meter-label">{score} / 100</span>
      </div>
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🚨 Delivery Insurance System</h1>
        <p className="subtitle">Fraud Detection & Risk Assessment Platform</p>
      </header>

      <main className="main-content">
        {/* Dashboard Card */}
        <div className="dashboard-card">
          <h2>📦 Delivery Partner Dashboard</h2>
          <p className="card-description">Click the button below to analyze a delivery claim for potential fraud indicators.</p>

          {/* Toggle Switches for Testing */}
          <div className="toggles-section">
            <h3>🔧 Fraud Simulation (Test Mode)</h3>
            <p className="toggles-description">Enable fraud indicators to test the detection system:</p>
            
            <div className="toggles-grid">
              {/* Fake GPS Toggle */}
              <div className="toggle-item">
                <label htmlFor="toggle-gps" className="toggle-label">
                  <input
                    id="toggle-gps"
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={toggles.fakeGPS}
                    onChange={() => handleToggle('fakeGPS')}
                  />
                  <span className="toggle-switch"></span>
                  Fake GPS
                </label>
                <span className="toggle-info">Simulates GPS spoofing</span>
              </div>

              {/* Device Mismatch Toggle */}
              <div className="toggle-item">
                <label htmlFor="toggle-device" className="toggle-label">
                  <input
                    id="toggle-device"
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={toggles.deviceMismatch}
                    onChange={() => handleToggle('deviceMismatch')}
                  />
                  <span className="toggle-switch"></span>
                  Device Mismatch
                </label>
                <span className="toggle-info">Multiple devices flagged</span>
              </div>

              {/* Abnormal Behavior Toggle */}
              <div className="toggle-item">
                <label htmlFor="toggle-behavior" className="toggle-label">
                  <input
                    id="toggle-behavior"
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={toggles.abnormalBehavior}
                    onChange={() => handleToggle('abnormalBehavior')}
                  />
                  <span className="toggle-switch"></span>
                  Abnormal Behavior
                </label>
                <span className="toggle-info">Unusual activity pattern</span>
              </div>
            </div>
          </div>

          {/* Claim Button */}
          <button className="claim-button" onClick={handleClaimInsurance}>
            💰 Claim Weather Insurance
          </button>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="results-card">
            <h2>📊 Analysis Results</h2>
            <p className="timestamp">Analysis performed at: {analysisResult.timestamp}</p>

            {/* Check Results Grid */}
            <div className="checks-grid">
              {/* GPS Check */}
              <div className={`check-item ${analysisResult.fraudData.fakeGPS ? 'suspicious' : 'normal'}`}>
                <div className="check-header">
                  <span className="check-icon">📍</span>
                  <h3>GPS Check</h3>
                </div>
                <p className="check-status">
                  {analysisResult.fraudData.fakeGPS ? '🚩 Suspicious' : '✅ Normal'}
                </p>
                <p className="check-description">
                  {analysisResult.fraudData.fakeGPS 
                    ? 'GPS coordinates appear spoofed or inconsistent with delivery route.'
                    : 'GPS location is consistent with expected delivery area.'}
                </p>
              </div>

              {/* Device Check */}
              <div className={`check-item ${analysisResult.fraudData.deviceMismatch ? 'suspicious' : 'normal'}`}>
                <div className="check-header">
                  <span className="check-icon">📱</span>
                  <h3>Device Check</h3>
                </div>
                <p className="check-status">
                  {analysisResult.fraudData.deviceMismatch ? '🚩 Mismatch' : '✅ Trusted'}
                </p>
                <p className="check-description">
                  {analysisResult.fraudData.deviceMismatch
                    ? 'Device information has changed or multiple devices detected.'
                    : 'Device matches historical records for this partner.'}
                </p>
              </div>

              {/* Behavior Check */}
              <div className={`check-item ${analysisResult.fraudData.abnormalBehavior ? 'suspicious' : 'normal'}`}>
                <div className="check-header">
                  <span className="check-icon">⚡</span>
                  <h3>Behavior Check</h3>
                </div>
                <p className="check-status">
                  {analysisResult.fraudData.abnormalBehavior ? '⚠️ Abnormal' : '✅ Normal'}
                </p>
                <p className="check-description">
                  {analysisResult.fraudData.abnormalBehavior
                    ? 'Delivery pattern deviates from historical behavior.'
                    : 'Delivery pattern matches typical behavior for this partner.'}
                </p>
              </div>
            </div>

            {/* Risk Score Section */}
            <div className="risk-section">
              <h3>Risk Assessment</h3>
              <RiskMeterBar score={analysisResult.riskScore} />
              
              <div className="risk-details">
                <div className="risk-detail-item">
                  <span className="detail-label">Risk Level:</span>
                  <span className={`detail-value risk-level-${analysisResult.riskLevel.toLowerCase()}`}>
                    {analysisResult.riskLevel}
                  </span>
                </div>
                <div className="risk-detail-item">
                  <span className="detail-label">Risk Score:</span>
                  <span className="detail-value">{analysisResult.riskScore} / 100</span>
                </div>
              </div>
            </div>

            {/* Final Decision */}
            <div className={`decision-card decision-${analysisResult.decision.toLowerCase()}`}>
              <h3>Final Decision</h3>
              <p className="decision-status">
                {analysisResult.decision === 'APPROVED' ? (
                  <>
                    <span className="decision-emoji">✅</span>
                    APPROVED
                  </>
                ) : (
                  <>
                    <span className="decision-emoji">🚨</span>
                    FLAGGED
                  </>
                )}
              </p>
              <p className="decision-message">
                {analysisResult.decision === 'APPROVED' 
                  ? 'Claim appears legitimate. All checks passed with acceptable risk levels.'
                  : 'Claim flagged for manual review. Multiple fraud indicators detected.'}
              </p>
            </div>

            {/* Explanation */}
            <div className="explanation-box">
              <p>
                <strong>ℹ️ How This Works:</strong> Decision based on multi-layer verification 
                (GPS integrity, device consistency, behavioral patterns). Each indicator contributes 
                to an overall risk score that determines claim approval or requires human review.
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="score-breakdown">
              <h3>Score Breakdown</h3>
              <ul>
                <li>
                  <span>Fake GPS Detection:</span>
                  <span className={analysisResult.fraudData.fakeGPS ? 'fraud-yes' : 'fraud-no'}>
                    {analysisResult.fraudData.fakeGPS ? '+30 pts' : '0 pts'}
                  </span>
                </li>
                <li>
                  <span>Device Mismatch Detection:</span>
                  <span className={analysisResult.fraudData.deviceMismatch ? 'fraud-yes' : 'fraud-no'}>
                    {analysisResult.fraudData.deviceMismatch ? '+25 pts' : '0 pts'}
                  </span>
                </li>
                <li>
                  <span>Abnormal Behavior Detection:</span>
                  <span className={analysisResult.fraudData.abnormalBehavior ? 'fraud-yes' : 'fraud-no'}>
                    {analysisResult.fraudData.abnormalBehavior ? '+20 pts' : '0 pts'}
                  </span>
                </li>
                <li className="score-total">
                  <strong>Total Score:</strong>
                  <strong>{analysisResult.riskScore}</strong>
                </li>
              </ul>
            </div>

            {/* Reset Button */}
            <button className="reset-button" onClick={() => setAnalysisResult(null)}>
              🔄 Analyze Another Claim
            </button>
          </div>
        )}

        {/* Info Section */}
        {!analysisResult && (
          <div className="info-card">
            <h2>📚 System Overview</h2>
            <div className="info-content">
              <div className="info-section">
                <h3>🛡️ Anti-Fraud Detection</h3>
                <p>This system analyzes delivery claims using three key fraud indicators:</p>
                <ul>
                  <li><strong>GPS Spoofing:</strong> Detects fake or impossible GPS coordinates</li>
                  <li><strong>Device Integrity:</strong> Ensures device hasn't been compromised</li>
                  <li><strong>Behavioral Analysis:</strong> Identifies unusual delivery patterns</li>
                </ul>
              </div>
              <div className="info-section">
                <h3>⚖️ Risk Scoring</h3>
                <p>Claims are scored on a 0-100 scale:</p>
                <ul>
                  <li><strong>0-40:</strong> Low risk - Claim approved automatically</li>
                  <li><strong>41-70:</strong> Medium risk - Requires manual review</li>
                  <li><strong>71+:</strong> High risk - Likely fraud case</li>
                </ul>
              </div>
              <div className="info-section">
                <h3>✨ Key Features</h3>
                <ul>
                  <li>Real-time multi-layer fraud detection</li>
                  <li>Transparent risk scoring breakdown</li>
                  <li>Protects legitimate users from false positives</li>
                  <li>Fair and explainable decision-making</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Delivery Insurance System | Fraud Detection Prototype</p>
      </footer>
    </div>
  );
}
