import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { GameState, GameStates } from '../../../models/minesweeper';
import { IAppState } from '../../../models/storeActions';

import './PauseOverlay.scss';

interface PauseOverlayProps {
  clicked: () => void;
  gameState?: GameState;
}

const PauseOverlay: FC<PauseOverlayProps> = ({
  clicked,
  gameState,
}): ReactElement => {
  return (
    <>
      {gameState === GameStates.PAUSED && (
        <div className="pause-overlay" onClick={clicked}>
          <div className="pause-overlay__content">
            <p>Game is paused, click here to resume</p>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    gameState: state.msw.gameState,
  };
};

export default connect(mapStateToProps)(PauseOverlay);
