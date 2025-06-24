import React, { useState, useEffect, useCallback } from 'react';
import './SnakeGame.css';

const BOARD_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 200; // ms

const getRandomCoords = () => {
  const x = Math.floor(Math.random() * BOARD_SIZE);
  const y = Math.floor(Math.random() * BOARD_SIZE);
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(getRandomCoords());
  const [direction, setDirection] = useState({ x: 0, y: -1 }); // Start moving up
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!gameStarted) return;
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(getRandomCoords());
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const stopGame = () => {
    setGameStarted(false);
  };

  useEffect(() => {
    if (gameOver || !gameStarted) {
      return;
    }

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // Wall collision
        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        for (let i = 1; i < newSnake.length; i++) {
          if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
            setGameOver(true);
            return prevSnake;
          }
        }

        newSnake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomCoords());
          setScore(score + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameInterval);
  }, [snake, direction, food, gameOver, score, gameStarted]);

  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <div className="controls">
        <button onClick={startGame}>Begin</button>
        <button onClick={stopGame}>Stop</button>
      </div>
      <p>Score: {score}</p>
      <div
        className="game-board"
        style={{
          width: BOARD_SIZE * CELL_SIZE,
          height: BOARD_SIZE * CELL_SIZE,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
          }}
        />
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={resetGame} className="try-again-btn">Let's try this again</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame; 