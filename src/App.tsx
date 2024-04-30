import React from "react";
import "./App.css";

interface FilledTile {
  digit: number;
  given: boolean;
}

interface EmptyTile {
  digit: null;
}

type Tile = FilledTile | EmptyTile;

function TileComponent(props: { tile: Tile; setTile: (tile: Tile) => void }) {
  if (props.tile.digit === null) {
    return <div className="square" />;
  } else {
    return (
      <div
        className="square"
        onClick={() => {
          if (props.tile.digit !== null) {
            props.setTile({
              ...props.tile,
              digit: props.tile.digit + 1,
            });
            console.log(props.tile.digit);
          }
        }}
      >
        <div className="filledSquare">{props.tile.digit}</div>
      </div>
    );
  }
}

function Box(props: {
  index: number;
  gameState: Tile[];
  setTile: (index: number, tile: Tile) => void;
}) {
  const topLeftIndex = Math.floor(props.index / 3) * 27 + (props.index % 3) * 3;
  const tiles: React.ReactNode[] = [];
  for (let i = 0; i < 9; i++) {
    const offset = i + Math.floor(i / 3) * 6;
    tiles.push(
      <TileComponent
        key={i}
        tile={props.gameState[topLeftIndex + offset]}
        setTile={(tile) => {
          props.setTile(topLeftIndex + offset, tile);
        }}
      />
    );
  }
  return <div className="box">{tiles}</div>;
}

function initialGameState(): Tile[] {
  const gameState = new Array<Tile>(81).fill({ digit: null });
  for (let i = 0; i < 81; i++) {
    gameState[i] = { digit: i, given: false };
  }
  return gameState;
}

export function App() {
  const [gameState, setGameState] = React.useState(initialGameState());
  const setTile = (index: number, tile: Tile) => {
    const newGame = gameState.slice();
    newGame[index] = tile;
    setGameState(newGame);
  };
  return (
    <div className="border">
      <div className="bigBox">
        <Box index={0} gameState={gameState} setTile={setTile} />
        <Box index={1} gameState={gameState} setTile={setTile} />
        <Box index={2} gameState={gameState} setTile={setTile} />
      </div>
      <div className="bigBox">
        <Box index={3} gameState={gameState} setTile={setTile} />
        <Box index={4} gameState={gameState} setTile={setTile} />
        <Box index={5} gameState={gameState} setTile={setTile} />
      </div>
      <div className="bigBox">
        <Box index={6} gameState={gameState} setTile={setTile} />
        <Box index={7} gameState={gameState} setTile={setTile} />
        <Box index={8} gameState={gameState} setTile={setTile} />
      </div>
    </div>
  );
}
