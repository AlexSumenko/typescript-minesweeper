import { FC, ReactElement } from 'react';

import './Overlay.scss';

interface OverlayProps {
  content: string;
  opacity: number;
  clicked: () => void;
}

const Overlay: FC<OverlayProps> = ({
  content,
  opacity,
  clicked,
}): ReactElement => {
  return (
    <div
      className="pause-overlay"
      style={{ opacity: `${opacity}` }}
      onClick={clicked}
    >
      <div className="pause-overlay__content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Overlay;
