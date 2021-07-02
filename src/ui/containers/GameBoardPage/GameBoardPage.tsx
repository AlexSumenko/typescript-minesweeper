import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Counter from '../../components/Counter/Counter';
import GameControl from '../../components/GameControl/GameControl';
import Overlay from '../../components/Overlay/Overlay';
import PlayField from '../../components/PlayField/PlayField';
import {
  changeGameState,
  savePlayingFieldToStore,
} from '../../../store/actions';
import {
  GameState,
  GameStates,
  PlayFieldArray,
} from '../../../models/minesweeper';
import {
  IAppState,
  IChangeGameStateAction,
  ISavePlayingFieldToStoreAction,
} from '../../../models/storeActions';
import MinesweeperField from '../../../models/MinesweeperField';
import { timeFormatter } from '../../../utils/helpers';

import './GameBoardPage.scss';
interface GameBoardProps {
  playFieldSize: number;
  minesLeft: number;
  gameState: GameState;
  savePlayingFieldToStore: (
    playField: PlayFieldArray
  ) => ISavePlayingFieldToStoreAction;
  changeGameState: (gameState: GameState) => IChangeGameStateAction;
}

const GameBoard: FC<GameBoardProps> = ({
  playFieldSize,
  minesLeft,
  gameState,
  savePlayingFieldToStore,
  changeGameState,
}): ReactElement => {
  const [clock, setClock] = useState<number>(0);

  const counter = useCallback(() => {
    setClock(clock + 1);
  }, [clock]);

  useEffect(() => {
    if (gameState !== GameStates.NOT_STARTED) {
      return;
    }
    const game = new MinesweeperField(playFieldSize);
    const playField = game.playField;
    savePlayingFieldToStore(playField);
  }, [gameState, playFieldSize, savePlayingFieldToStore]);

  useEffect(() => {
    if (gameState !== GameStates.IN_PROGRESS) {
      return;
    }
    const timerId = setTimeout(counter, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [gameState, counter]);

  // const onPlayFieldClick = (): void => {
  //   if (
  //     gameState === GameStates.NOT_STARTED ||
  //     gameState === GameStates.PAUSED
  //   ) {
  //     changeGameState(GameStates.IN_PROGRESS);
  //   }
  // };

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
    <div className="game-board">
      {gameState === GameStates.PAUSED && (
        <Overlay
          content="Game is paused, click here to resume"
          clicked={onGamePlayPauseClick}
        />
      )}
      <div className="game-board__top-row">
        <div className="game-board__timer">
          <Counter value={minesLeft} heading="Mines left:" />
        </div>
        <div className="game-board__game-controls">
          <GameControl value={'\u23EF'} clicked={onGamePlayPauseClick} />
          <GameControl value={'\u21BA'} clicked={onRestartClick} />
        </div>
        <div className="game-board__mines-left">
          <Counter value={timeFormatter(clock)} heading="Time spent:" />
        </div>
      </div>
      <div className="play-container">
        {gameState === GameStates.WON && (
          <Overlay
            content="Congratulations you won the game. Click the restart button"
            clicked={() => {
              return;
            }}
          />
        )}
        <PlayField />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    playFieldSize: state.msw.playFieldSize,
    minesLeft: state.msw.minesLeft,
    gameState: state.msw.gameState,
  };
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    savePlayingFieldToStore: (playField: PlayFieldArray) =>
      dispatch(savePlayingFieldToStore(playField)),
    changeGameState: (gameState: GameState) =>
      dispatch(changeGameState(gameState)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(GameBoard);
