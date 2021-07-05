import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import GameControlsBar from '../../components/GameControlsBar/GameControlsBar';
import GameField from '../../components/GameField/GameField';
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
    <>
      <div className="game-board">
        <GameControlsBar />
        <div className="game-container">
          <GameField />
        </div>
      </div>
      <p>HINT! Use right mouse button to mark mines or potential mines</p>
    </>
  );
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    changeGameState: (gameState: GameState) =>
      dispatch(changeGameState(gameState)),
  };
};

export default connect(null, dispatchStateToProps)(GameBoardPage);
