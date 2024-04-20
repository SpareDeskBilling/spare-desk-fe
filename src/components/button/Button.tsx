import React, { FC } from 'react';

import useScreenDimensions from '../../hooks/useScreenDimensions';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({
  className = '',
  onClick = () => null,
  handleKeyPress = () => null,
  label,
  labelClass = '',
  iconStroke = '',
  iconClass,
  rippleClass,
  disableRipple = false,
  Icon,
  disabled = false,
  breakpoint = 0,
  showMainViewButton = false,
  type = 'button',
  dataTestId = 'button'
}) => {

  const { isMobileView, screenWidth } = useScreenDimensions();

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick(event);
  };

  return (
    <button
      type={type}
      className={`relative text-sm p-2 overflow-hidden rounded-md disabled:opacity-70 ${className}`}
      onClick={event => handleButtonClick(event)}
      onKeyDown={event => handleKeyPress(event)}
      disabled={disabled}
      data-testid={dataTestId}>
      {(screenWidth < breakpoint || isMobileView) && !showMainViewButton ? (
        <div className="flex flex-row justify-center items-center">
          {Icon ? (
            <Icon className={iconClass} stroke={iconStroke} />
          ) : (
            <p className={labelClass}>{label}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center">
          {Icon && <Icon className={iconClass} stroke={iconStroke} />}
          {label && (
            <span className={`${Icon ? 'ml-2.5' : ''} ${labelClass}`}>
              {label}
            </span>
          )}
        </div>
      )}
    </button>
  );
};

export default Button;
