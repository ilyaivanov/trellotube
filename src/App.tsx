import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">

      <div className="container">
        <span className="music-label" data-testid="MyMusic">Music</span>

        <div className="row-item">Album 1</div>
        <div className="row-item">Album 2</div>
        <div className="row-item">Album 3</div>
        <div className="row-item">Album 4</div>
        <div className="row-item">Album 5</div>
      </div>

    </div>
  );
}

export default App;
