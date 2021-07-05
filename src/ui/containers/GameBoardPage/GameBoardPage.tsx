import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import GameControlsBar from '../../components/GameControlsBar/GameControlsBar';
import PlayField from '../../components/PlayField/PlayField';
import { changeGameState } from '../../../store/actions';
import { GameState, GameStates } from '../../../models/minesweeper';
import { IChangeGameStateAction } from '../../../models/store';

import './GameBoardPage.scss';
interface GameBoardPageProps {
  changeGameState: (gameState: GameState) => IChangeGameStateAction;
}

const GameBoardPage: FC<GameBoardPageProps> = ({
  changeGameState,
}): ReactElement => {
  useEffect(() => {
    return () => {
      changeGameState(GameStates.NOT_STARTED);
    };
  }, [changeGameState]);

  return (
    <div className="game-board">
      <GameControlsBar />
      <div className="play-container">
        <PlayField />
      </div>
    </div>
  );
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    changeGameState: (gameState: GameState) =>
      dispatch(changeGameState(gameState)),
  };
};

export default connect(null, dispatchStateToProps)(GameBoardPage);
