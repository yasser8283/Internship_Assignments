import { useState } from 'react'
import './App.css'

function App() {
  const [selectedMood, setSelectedMood] = useState('happy')

  const moods = {
    happy: {
      emoji: '😊',
      color: '#FFD700',
      bgColor: '#FFF8DC',
      message: 'You\'re feeling great!',
      description: 'Spread the joy and positivity!',
      activities: ['🎉 Celebrate', '🎵 Dance', '🎨 Create', '👥 Share with friends']
    },
    sad: {
      emoji: '😢',
      color: '#4169E1',
      bgColor: '#E0F0FF',
      message: 'You\'re feeling down.',
      description: 'It\'s okay to feel sad sometimes.',
      activities: ['🎬 Watch something funny', '🍫 Treat yourself', '☕ Take a break', '💬 Talk to someone']
    },
    angry: {
      emoji: '😠',
      color: '#DC143C',
      bgColor: '#FFE4E1',
      message: 'You\'re feeling angry.',
      description: 'Take a deep breath and calm down.',
      activities: ['🥊 Hit a pillow', '🏃 Go for a run', '📝 Journal', '🧘 Meditate']
    },
    excited: {
      emoji: '🤩',
      color: '#FF1493',
      bgColor: '#FFF0F5',
      message: 'You\'re pumped up!',
      description: 'Channel that energy into something amazing!',
      activities: ['🚀 Start a project', '⚡ Go rock climbing', '💪 Hit the gym', '🎤 Sing loudly']
    },
    anxious: {
      emoji: '😰',
      color: '#9370DB',
      bgColor: '#F0E6FF',
      message: 'You\'re feeling anxious.',
      description: 'Remember to breathe and take things one step at a time.',
      activities: ['🧘 Breathe deeply', '🌿 Spend time in nature', '📚 Read', '🎵 Listen to music']
    },
    tired: {
      emoji: '😴',
      color: '#8B4513',
      bgColor: '#F5DEB3',
      message: 'You\'re feeling exhausted.',
      description: 'Your body needs rest. Be kind to yourself.',
      activities: ['😴 Take a nap', '🛏️ Get cozy', '☕ Make a beverage', '📺 Relax and watch']
    },
    peaceful: {
      emoji: '😌',
      color: '#20B2AA',
      bgColor: '#E0FFFF',
      message: 'You\'re feeling at peace.',
      description: 'Enjoy this moment of calm and tranquility.',
      activities: ['🧘 Meditate', '🌅 Watch the sunrise', '📖 Read', '🌊 Listen to waves']
    },
    confused: {
      emoji: '😕',
      color: '#FF8C00',
      bgColor: '#FFF5EE',
      message: 'You\'re feeling confused.',
      description: 'It\'s normal to not understand everything right now.',
      activities: ['🤔 Think it through', '📚 Research', '💬 Ask for help', '✍️ Write it down']
    }
  }

  const currentMood = moods[selectedMood]

  return (
    <div className="app-container">
      <header className="header">
        <h1>💭 Mood Selector</h1>
        <p>How are you feeling today?</p>
      </header>

      <main className="main-content" style={{ backgroundColor: currentMood.bgColor }}>
        {/* Mood Display */}
        <div className="mood-display">
          <div className="mood-emoji" style={{ color: currentMood.color }}>
            {currentMood.emoji}
          </div>
          <h2 className="mood-message" style={{ color: currentMood.color }}>
            {currentMood.message}
          </h2>
          <p className="mood-description">{currentMood.description}</p>
        </div>

        {/* Mood Selector Buttons */}
        <div className="mood-selector">
          <h3>Select Your Mood:</h3>
          <div className="mood-buttons">
            {Object.entries(moods).map(([mood, data]) => (
              <button
                key={mood}
                className={`mood-btn ${selectedMood === mood ? 'active' : ''}`}
                onClick={() => setSelectedMood(mood)}
                style={{
                  borderColor: selectedMood === mood ? data.color : '#ddd',
                  color: selectedMood === mood ? data.color : '#666',
                  backgroundColor: selectedMood === mood ? `${data.color}20` : 'white'
                }}
              >
                <span className="mood-btn-emoji">{data.emoji}</span>
                <span className="mood-btn-text">{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Activities Suggestion */}
        <div className="activities-section">
          <h3>Suggested Activities:</h3>
          <div className="activities-list">
            {currentMood.activities.map((activity, index) => (
              <div key={index} className="activity-item" style={{ borderLeftColor: currentMood.color }}>
                {activity}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Remember: All emotions are valid! 💚</p>
      </footer>
    </div>
  )
}

export default App
