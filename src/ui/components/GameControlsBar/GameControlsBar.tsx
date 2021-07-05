import { FC, ReactElement, useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Counter from '../common/Counter/Counter';
import GameControl from '../common/GameControl/GameControl';
import { timeFormatter } from '../../../utils/helpers';

import './GameControlsBar.scss';
import { IAppState, IChangeGameStateAction } from '../../../models/store';
import { GameState, GameStates } from '../../../models/minesweeper';
import Overlay from '../common/Overlay/Overlay';
import { changeGameState } from '../../../store/actions';

interface GameControlsBarProps {
  minesLeft: number;
  gameState: GameState;
  changeGameState: (gameState: GameState) => IChangeGameStateAction;
}

const GameControlsBar: FC<GameControlsBarProps> = ({
  minesLeft,
  gameState,
  changeGameState,
}): ReactElement => {
  const [clock, setClock] = useState<number>(0);

  const counter = useCallback(() => {
    setClock(clock + 1);
  }, [clock]);

  useEffect(() => {
    if (gameState !== GameStates.IN_PROGRESS) {
      return;
    }
    const timerId = setTimeout(counter, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [gameState, counter]);

  const onGamePlayPauseClick = (): void => {
    changeGameState(
      gameState === GameStates.IN_PROGRESS
        ? GameStates.PAUSED
        : GameStates.IN_PROGRESS
    );
  };

  const onRestartClick = (): void => {
    changeGameState(GameStates.NOT_STARTED);
    setClock(0);
  };

  return (
    <>
      {gameState === GameStates.PAUSED && (
        <Overlay
          content="Game is paused, click here to resume"
          opacity={1}
          clicked={onGamePlayPauseClick}
        />
      )}
      {gameState === GameStates.WON && (
        <Overlay
          content="Congratulations you won the game. Click here to restart"
          opacity={0.8}
          clicked={onRestartClick}
        />
      )}
      {gameState === GameStates.LOST && (
        <Overlay
          content="We're sorry, but you lost the game. Click here to restart"
          opacity={0.8}
          clicked={onRestartClick}
        />
      )}
      <div className="controls-bar">
        <div className="controls-bar__mines-left">
          <Counter value={minesLeft} heading="Mines left:" />
        </div>
        <div className="controls-bar__game-controls">
          <GameControl value={'\u23EF'} clicked={onGamePlayPauseClick} />
          <GameControl value={'\u21BA'} clicked={onRestartClick} />
        </div>
        <div className="controls-bar__timer">
          <Counter value={timeFormatter(clock)} heading="Time spent:" />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    gameState: state.msw.gameState,
    minesLeft: state.msw.minesLeft,
  };
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    changeGameState: (gameState: GameState) =>
      dispatch(changeGameState(gameState)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(GameControlsBar);
