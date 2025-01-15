import React, { useState } from 'react';
import '../styles/SarahPage.css';
import Header from './Header'; // Import the Header component

function SarahPage() {
  const [board, setBoard] = React.useState(
    Array(6)
      .fill(null)
      .map(() => Array(7).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = React.useState('red');
  const [allRevealed, setAllRevealed] = React.useState(false);
  const [fireworks, setFireworks] = useState([]); // Array to hold multiple fireworks
  const [isFireworksActive, setIsFireworksActive] = useState(false); // State to track if fireworks are active
  const [buttonState, setButtonState] = useState(0); // State to track the current button in the sequence
  const [showPuppy, setShowPuppy] = useState(false); // State to control when to show the puppy gif

  // Define the letters for each cell
  const cellLetters = [
    ['', '', '', '', '', '', ''],
    ['W', 'I', 'L', 'L', 'Y', 'O', 'U'],
    ['', 'B', 'E', '', 'M', 'Y', ''],
    ['', '', '', '', '', '', ''],
    ['', 'GI', 'RL', 'FR', 'IE', 'ND', '?'],
    ['', '', '', '', '', '', '']
  ];

  const handleCellClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== null) return; // Skip if cell is already filled

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? currentPlayer : cell
      )
    );
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red'); // Toggle player

    // Check if all non-empty string letters are revealed
    const allRevealedCheck = cellLetters.every((row, rIdx) =>
      row.every(
        (letter, cIdx) =>
          letter === '' || newBoard[rIdx][cIdx] !== null // Empty strings or filled cells
      )
    );
    if (allRevealedCheck) setAllRevealed(true);
  };

  const handleYesClick = () => {
    if (!isFireworksActive) {
      // Start fireworks if they aren't already active
      setIsFireworksActive(true);
      setAllRevealed(false);
      
      // Show 5 fireworks immediately
      for (let i = 0; i < 5; i++) {
        setFireworks((prevFireworks) => [
          ...prevFireworks,
          createFirework(),
        ]);
      }

      // Show the puppy gif
      setShowPuppy(true);
    }
  };

  const createFirework = () => {
    const randomTop = Math.floor(Math.random() * (window.innerHeight - 150)) + 'px'; // Random top position
    const randomLeft = Math.floor(Math.random() * (window.innerWidth - 150)) + 'px'; // Random left position
    const randomSize = Math.floor(Math.random() * 100) + 100 + 'px'; // Random size between 100px and 200px

    return {
      top: randomTop,
      left: randomLeft,
      size: randomSize,
      id: Date.now() + Math.random(), // Unique id for each firework
    };
  };

  const handleNoClick = () => {
    setButtonState(buttonState+1); // Move to the next button in the sequence
  };

  return (
    <div className="app-container">
      <Header />
      <div className="profile-container">
        <h1 className="name">Welcome to Sarah's Zone!</h1>
        <p className="description">
          Obviously, gotta have a good game of connect four.
        </p>
        
        {/* Conditionally render the board */}
        {!showPuppy && (
          <div className="connect-four-container">
            <h1 className="turn-indicator">
              Current Turn: <span className={currentPlayer + '-text'}>{currentPlayer === 'red' ? 'Red' : 'Yellow'}</span>
            </h1>
            <div className="connect-four-board">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="connect-four-row">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`connect-four-cell ${cell ? `${cell}-chip` : ''}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      <span className="cell-text">
                        {cell === 'red' || cell === 'yellow' ? cellLetters[rowIndex][colIndex] : ''}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {allRevealed && (
          <div className="response-buttons">
            <button className="yes-button" onClick={handleYesClick}>
              Yes!
            </button>
            {buttonState === 0 && (
                <button className="no-button" onClick={handleNoClick}>
                  No
                </button>
              )}
              {buttonState === 1 && (
                <button className="no-button" onClick={handleNoClick}>
                  Are you sure?
                </button>
              )}
              {buttonState === 2 && (
                <button className="no-button" onClick={handleNoClick}>
                  Are you really really sure?
                </button>
              )}
              {buttonState === 3 && (
                <button className="no-button" onClick={handleNoClick}>
                  Are you completely positively 100% without a doubt sure?
                </button>
              )}
              {buttonState === 4 && (
                <button className="no-button" onClick={handleNoClick}>
                  I think you should think about this again.
                </button>
              )}
              {buttonState === 5 && (
                <button className="no-button" onClick={handleNoClick}>
                  Did you even take a second to think? or did you just click it right away?
                </button>
              )}
              {buttonState === 6 && (
                <button className="no-button" onClick={handleNoClick}>
                  Stop
                </button>
              )}
              {buttonState === 7 && (
                <button className="no-button" onClick={handleNoClick}>
                  Stop it.
                </button>
              )}
              {buttonState === 8 && (
                <button className="no-button" onClick={handleNoClick}>
                  Why aren't you stopping?
                </button>
              )}
              {buttonState === 9 && (
                <button className="no-button" onClick={handleNoClick}>
                  Okay fine, I'll have to bring out the big guns...
                </button>
              )}
              {buttonState === 10 && (
                <button className="no-button" onClick={handleNoClick}>
                  Surely this picture of Goldie will convince you.
                </button>
              )}
              {buttonState === 10 && (
                <div className="goldie-overlay">
                  <img
                    src={process.env.PUBLIC_URL + '/goldie.jpg'}
                    alt="Goldie"
                    className="goldie-photo"
                  />
                </div>
              )}
              {buttonState === 11 && (
                <button className="no-button" onClick={handleNoClick}>
                  You monster...
                </button>
              )}
              {buttonState === 12 && (
                <button className="no-button" onClick={handleNoClick}>
                  How could you not like Goldie?
                </button>
              )}
              {buttonState === 13 && (
                <button className="no-button" onClick={handleNoClick}>
                  Okok fine, if Goldie can't convince you, then this must...!
                </button>
              )}
              {buttonState === 14 && (
                <button className="no-button" onClick={handleNoClick}>
                  You better not click this button!
                </button>
              )}
              {buttonState === 14 && (
                <div className="goldie-overlay">
                  <img
                    src={process.env.PUBLIC_URL + '/scoot.jpg'}
                    alt="Scoot"
                    className="scoot-photo"
                  />
                </div>
              )}
              {buttonState === 15 && (
                <button className="no-button" onClick={handleNoClick}>
                  Absolutely heartless!
                </button>
              )}
              {buttonState === 16 && (
                <button className="no-button" onClick={handleNoClick}>
                  okokok FINE. I didn't think I'd have to play this card, but you left me no choice.
                </button>
              )}
              {buttonState === 17 && (
                <button className="no-button" onClick={handleNoClick}>
                  Here it comes!
                </button>
              )}
              {buttonState === 18 && (
                <button className="no-button" onClick={handleNoClick}>
                  Good luck resisting that!
                </button>
              )}
              {buttonState === 18 && (
                <div className="goldie-overlay">
                  <img
                    src={process.env.PUBLIC_URL + '/missclara.jpg'}
                    alt="Miss Clara"
                    className="missclara-photo"
                  />
                </div>
              )}
              {buttonState === 19 && (
                <button className="no-button" onClick={handleNoClick}>
                  Wow, how could you.
                </button>
              )}
              {buttonState === 20 && (
                <button className="no-button" onClick={handleNoClick}>
                  I can't believe you right now
                </button>
              )}
              {buttonState === 21 && (
                <button className="no-button" onClick={handleNoClick}>
                  That's it! I've had enough
                </button>
              )}
              {buttonState === 22 && (
                <button className="no-button" onClick={handleNoClick}>
                  You've lost button privileges.
                </button>
              )}
              {buttonState === 23 && (
                <button className="no-button" onClick={handleNoClick}>
                  After the next button, there will be no more buttons left, and you will have to click yes.
                </button>
              )}
              {buttonState === 24 && (
                <button className="no-button" onClick={handleNoClick}>
                  Enjoy your last button muwahahahaha!
                </button>
              )}
            {/* Add other conditions for the "No" buttons */}
          </div>
        )}

        {/* Display Puppy GIF and "LET'S GOO!!" Text */}
        {showPuppy && (
          <div className="puppy-container">
            <img
              src="https://i.pinimg.com/originals/95/e1/cd/95e1cd7368675dd7da6f6d77c190ae61.gif"
              alt="Cute Puppy"
              className="puppy-gif"
            />
            <h2 className="lets-goo-text">LET'S GOO!! Here's your new puppies!</h2>
          </div>
        )}
      </div>

      {/* Multiple Fireworks GIFs */}
      {fireworks.map((firework) => (
        <img
          key={firework.id}
          src={`https://i.giphy.com/NxpMNq17Y2Khq.webp?${firework.id}`} // Add the unique ID to the URL to force reload
          alt="Fireworks GIF"
          className="fireworks-gif"
          style={{
            position: 'absolute',
            top: firework.top,
            left: firework.left,
            width: firework.size,
            height: 'auto',
          }}
        />
      ))}
    </div>
  );
}

export default SarahPage;
