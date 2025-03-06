import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type NavigateButtonProps = {
  buttonText: string;
  direction: string;
  reset?: () => void;
};

const NavigateButton: FC<NavigateButtonProps> = ({
  buttonText,
  direction,
  reset,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    if (reset) {
      reset();
    }
    navigate(direction);
  },[direction, navigate, reset]) 

  return (
    <button
      className="button 
        is-success
        is-align-self-flex-end
        mb-4"
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  );
};

export default NavigateButton;
