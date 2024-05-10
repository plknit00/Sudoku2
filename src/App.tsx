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

// Creates the formatting of each tile based on the type of tile that it is
// holds the features to edit tiles and click to highlight tiles
function TileComponent(props: { tile: Tile; setTile: (tile: Tile) => void }) {
  const [highlight, setHighlight] = React.useState(false);
  function highlightClick() {
    setHighlight(!highlight);
  }
  let className;
  if (props.tile.digit === null) {
    className = "notFilledSquare";
  } else if (props.tile.given === true) {
    className = "filledGivenSquare";
  } else {
    className = "filledNotGivenSquare";
  }
  if (highlight) {
    className += " highlightBox";
  }
  return (
    <div className={className} onClick={highlightClick}>
      {props.tile.digit}
    </div>
  );
}

// This function builds the 3x3 box of tiles and calls upon tile component for the
// individual formatting of each tile
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

// This function fills the board with the pre-set/given tiles
function initialGameState(): Tile[] {
  const gameState = new Array<Tile>(81).fill({ digit: null });
  /*for (let i = 0; i < 81; i++) {
    gameState[i] = { digit: 0, given: false };
  }*/
  // EASY STARTING BOARD
  gameState[1] = { digit: 3, given: true };
  gameState[8] = { digit: 1, given: true };
  gameState[9] = { digit: 9, given: true };
  gameState[11] = { digit: 7, given: true };
  gameState[13] = { digit: 8, given: true };
  gameState[16] = { digit: 3, given: true };
  gameState[19] = { digit: 8, given: true };
  gameState[21] = { digit: 2, given: true };
  gameState[23] = { digit: 4, given: true };
  gameState[24] = { digit: 6, given: true };
  gameState[27] = { digit: 4, given: true };
  gameState[30] = { digit: 6, given: true };
  gameState[32] = { digit: 7, given: true };
  gameState[33] = { digit: 3, given: true };
  gameState[34] = { digit: 1, given: true };
  gameState[36] = { digit: 8, given: true };
  gameState[37] = { digit: 7, given: true };
  gameState[40] = { digit: 2, given: true };
  gameState[44] = { digit: 9, given: true };
  gameState[47] = { digit: 3, given: true };
  gameState[48] = { digit: 1, given: true };
  gameState[52] = { digit: 4, given: true };
  gameState[53] = { digit: 2, given: true };
  gameState[55] = { digit: 1, given: true };
  gameState[61] = { digit: 8, given: true };
  gameState[63] = { digit: 5, given: true };
  gameState[65] = { digit: 2, given: true };
  gameState[67] = { digit: 6, given: true };
  gameState[70] = { digit: 7, given: true };
  gameState[75] = { digit: 3, given: true };
  gameState[77] = { digit: 5, given: true };
  gameState[78] = { digit: 4, given: true };
  gameState[80] = { digit: 6, given: true };
  // DELETE LATER - tester squares for not given tiles
  gameState[0] = { digit: 3, given: false };
  gameState[71] = { digit: 4, given: false };
  // may need to keep track of for win game check
  //empty_cells = 48;
  return gameState;
}

export function App() {
  //
  const [gameState, setGameState] = React.useState(initialGameState());
  // Set Tile puts a new number in the corresponding tile and
  // updates the game board
  const setTile = (index: number, tile: Tile) => {
    const newGame = gameState.slice();
    newGame[index] = tile;
    setGameState(newGame);
  };
  return (
    // This nested set of divs creates the game board grouping 3x3 boxes as one "Box"
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
