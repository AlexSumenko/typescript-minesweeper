import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import Counter from '../../components/Counter/Counter';
import GameControl from '../../components/GameControl/GameControl';
import PauseOverlay from '../../components/PauseOverlay/PauseOverlay';
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
  useEffect(() => {
    if (gameState !== GameStates.NOT_STARTED) {
      return;
    }
    const game = new MinesweeperField(playFieldSize);
    const playField = game.playField;
    savePlayingFieldToStore(playField);
    console.log('GAME STARTED');
  }, [gameState]);

  const onGamePlayPauseClick = (): void => {
    changeGameState(
      gameState === GameStates.IN_PROGRESS
        ? GameStates.PAUSED
        : GameStates.IN_PROGRESS
    );
  };

  const onRestartClick = (): void => {
    changeGameState(GameStates.NOT_STARTED);
  };

  return (
    <div className="game-board">
      <PauseOverlay clicked={onGamePlayPauseClick} />
      <div className="game-board__top-row">
        <div className="game-board__timer">
          <Counter value={minesLeft} heading="Mines left:" />
        </div>
        <div className="game-board__game-controls">
          <GameControl value={'\u23EF'} clicked={onGamePlayPauseClick} />
          <GameControl value={'\u21BA'} clicked={onRestartClick} />
        </div>
        <div className="game-board__mines-left">
          <Counter value={123} heading="Time spent:" />
        </div>
      </div>
      <div className="play-container">
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
