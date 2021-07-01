import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import PlayField from '../../components/PlayField/PlayField';
import { savePlayingFieldToStore } from '../../../store/actions';
import { PlayFieldArray } from '../../../models/minesweeper';
import {
  IAppState,
  ISavePlayingFieldToStoreAction,
} from '../../../models/storeActions';
import MinesweeperField from '../../../models/MinesweeperField';

import './GameBoardPage.scss';
interface GameBoardProps {
  playFieldSize: number;
  savePlayingFieldToStore: (
    playField: PlayFieldArray
  ) => ISavePlayingFieldToStoreAction;
}

const GameBoard: FC<GameBoardProps> = ({
  playFieldSize,
  savePlayingFieldToStore,
}): ReactElement => {
  useEffect(() => {
    const game = new MinesweeperField(playFieldSize);
    const playField = game.playField;
    savePlayingFieldToStore(playField);
  });

  return (
    <div className="game-board">
      <div className="game-board__top-row">
        <div className="game-board__timer">123</div>
        <div className="game-board__game-settings">123</div>
        <div className="game-board__mines-left">123</div>
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
  };
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    savePlayingFieldToStore: (playField: PlayFieldArray) =>
      dispatch(savePlayingFieldToStore(playField)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(GameBoard);
