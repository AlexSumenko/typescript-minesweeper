import { FC, ReactElement } from 'react';

import './Overlay.scss';

interface OverlayProps {
  content: string;
  clicked: () => void;
}

const Overlay: FC<OverlayProps> = ({ content, clicked }): ReactElement => {
  return (
    <>
      <div className="pause-overlay" onClick={clicked}>
        <div className="pause-overlay__content">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default Overlay;
