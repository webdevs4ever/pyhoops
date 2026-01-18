import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './QuizMode.css';

function QuizMode() {
  const { playerId } = useParams();
  const [answers, setAnswers] = useState({
    challenge1_1: '',
    challenge1_2: '',
    challenge2_1: '',
    challenge2_2: '',
    challenge3_1: '',
    challenge3_2: '',
    challenge3_3: '',
    challenge3_4: ''
  });

  const [showHints, setShowHints] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const checkAnswers = () => {
    setSubmitted(true);
    // Simple answer checking (case-insensitive)
    const correct = {
      challenge1_1: '1.2',
      challenge1_2: '1.5',
      challenge2_1: 'get',
      challenge2_2: '200',
      challenge3_1: '[:10]',
      challenge3_2: '0',
      challenge3_3: '+=',
      challenge3_4: '/'
    };

    let score = 0;
    Object.keys(correct).forEach(key => {
      if (answers[key].trim().toLowerCase() === correct[key].toLowerCase()) {
        score++;
      }
    });

    alert(`You got ${score} out of ${Object.keys(correct).length} correct! ${score === Object.keys(correct).length ? '🎉 Perfect score!' : 'Keep practicing!'}`);
  };

  return (
    <div className="container">
      <Link to={`/player/${playerId}`} className="back-link">← Back to Player</Link>

      <div className="quiz-container">
        <div className="quiz-header">
          <h2>Python Code Challenge</h2>
          <p>Complete the functions used in PyHoops</p>
        </div>

        <div className="quiz-instruction">
          Fill in the blanks to complete the code snippets. These are actual functions from the PyHoops app!
        </div>

        <button 
          className="hint-toggle"
          onClick={() => setShowHints(!showHints)}
        >
          {showHints ? 'Hide' : 'Show'} Hints
        </button>

        {/* Challenge 1 */}
        <div className="code-challenge">
          <h3 className="challenge-title">Challenge 1: Calculate Fantasy Points</h3>
          {showHints && (
            <div className="hint">
              💡 Hint: Rebounds are worth 1.2 points each, Assists are worth 1.5 points each
            </div>
          )}
          <div className="code-block">
            <pre>
<span className="keyword">def</span> <span className="function">calculate_fantasy_points</span>(stats):
    <span className="comment"># Standard fantasy scoring</span>
    points = stats[<span className="string">'points'</span>]
    rebounds = stats[<span className="string">'rebounds'</span>]
    assists = stats[<span className="string">'assists'</span>]
    
    <span className="comment"># Fill in the fantasy calculation</span>
    fantasy_score = points + (rebounds * <input 
              type="text"
              className="code-input"
              value={answers.challenge1_1}
              onChange={(e) => handleInputChange('challenge1_1', e.target.value)}
              placeholder="?"
            />) + (assists * <input 
              type="text"
              className="code-input"
              value={answers.challenge1_2}
              onChange={(e) => handleInputChange('challenge1_2', e.target.value)}
              placeholder="?"
            />)
    
    <span className="keyword">return</span> fantasy_score
            </pre>
          </div>
        </div>

        {/* Challenge 2 */}
        <div className="code-challenge">
          <h3 className="challenge-title">Challenge 2: Fetch Player Stats from API</h3>
          {showHints && (
            <div className="hint">
              💡 Hint: The HTTP method for fetching data is usually 'get', and success status is 200
            </div>
          )}
          <div className="code-block">
            <pre>
<span className="keyword">import</span> requests

<span className="keyword">def</span> <span className="function">get_player_stats</span>(player_id):
    url = <span className="string">f"https://api.nba.com/stats/player/{'{player_id}'}"</span>
    
    <span className="comment"># Make API request - fill in the HTTP method</span>
    response = requests.<input 
              type="text"
              className="code-input"
              value={answers.challenge2_1}
              onChange={(e) => handleInputChange('challenge2_1', e.target.value)}
              placeholder="method"
            />(url)
    
    <span className="comment"># Check if request was successful</span>
    <span className="keyword">if</span> response.status_code == <input 
              type="text"
              className="code-input small"
              value={answers.challenge2_2}
              onChange={(e) => handleInputChange('challenge2_2', e.target.value)}
              placeholder="code"
            />:
        <span className="keyword">return</span> response.json()
    <span className="keyword">else</span>:
        <span className="keyword">return</span> <span className="keyword">None</span>
            </pre>
          </div>
        </div>

        {/* Challenge 3 */}
        <div className="code-challenge">
          <h3 className="challenge-title">Challenge 3: Calculate Average from Last 10 Games</h3>
          {showHints && (
            <div className="hint">
              💡 Hint: Use slicing [:10] to get first 10 items, initialize total to 0, use += to add, divide with /
            </div>
          )}
          <div className="code-block">
            <pre>
<span className="keyword">def</span> <span className="function">calculate_last_10_average</span>(game_stats):
    <span className="comment"># Get last 10 games</span>
    recent_games = game_stats<input 
              type="text"
              className="code-input"
              value={answers.challenge3_1}
              onChange={(e) => handleInputChange('challenge3_1', e.target.value)}
              placeholder="slice"
            />
    
    <span className="comment"># Initialize total</span>
    total_points = <input 
              type="text"
              className="code-input small"
              value={answers.challenge3_2}
              onChange={(e) => handleInputChange('challenge3_2', e.target.value)}
              placeholder="0"
            />
    
    <span className="comment"># Sum up points from each game</span>
    <span className="keyword">for</span> game <span className="keyword">in</span> recent_games:
        total_points <input 
              type="text"
              className="code-input small"
              value={answers.challenge3_3}
              onChange={(e) => handleInputChange('challenge3_3', e.target.value)}
              placeholder="op"
            /> game[<span className="string">'points'</span>]
    
    <span className="comment"># Calculate and return average</span>
    average = total_points <input 
              type="text"
              className="code-input small"
              value={answers.challenge3_4}
              onChange={(e) => handleInputChange('challenge3_4', e.target.value)}
              placeholder="op"
            /> len(recent_games)
    <span className="keyword">return</span> average
            </pre>
          </div>
        </div>

        <div className="quiz-actions">
          <button className="submit-btn" onClick={checkAnswers}>
            Check Answers
          </button>
        </div>

        <div className="learning-note">
          <strong>💡 Learning Tip:</strong> These functions are simplified versions of what's actually used in PyHoops. 
          After completing the quiz, you can refactor and improve these functions in the actual codebase!
          Check out <code>backend/services/stats_calculator.py</code> to see the real implementations.
        </div>
      </div>
    </div>
  );
}

export default QuizMode;
