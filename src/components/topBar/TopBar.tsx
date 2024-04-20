import React, { FC } from 'react';

import Button  from '../button/Button';
// import { LeftArrow } from '@assets/icons';
import { TopBarProps } from './types';

const TopBar: FC<TopBarProps> = props => {
  const {
    title = '',
    primaryButtonConfig = {},
    middleChild = {
      left: <></>,
      right: <></>
    }
  } = props;

  return (
    <div
      id="topBar"
      className="flex sticky top-0 z-50 flex-row justify-between py-[15px] px-4
     w-full min-h-[80px] font-inter bg-white border-b-[1px] border-mercury sm:px-6">
      <div className="flex items-center text-base font-semibold text-blackGreen sm:text-2xl">
        {/* {showNavigateBack && (
          <LeftArrow
            className="mr-2 cursor-pointer"
            onClick={handleBackClick}
          />
        )} */}
        {title}
        {middleChild.left}
      </div>
      <div className="flex items-center">
        {middleChild.right}
        {primaryButtonConfig.showButton && (
          <Button
            className={`ml-2 sm:py-[10px] sm:px-5 sm:ml-3 ${primaryButtonConfig.customClass}`}
            onClick={primaryButtonConfig.buttonHandler}
            Icon={primaryButtonConfig.icon}
            iconClass={primaryButtonConfig.iconClass}
            disabled={primaryButtonConfig.isDisabled}
            label={primaryButtonConfig.buttonLabel}
            showMainViewButton={primaryButtonConfig.showMainViewButton}
            breakpoint={850}
            rippleClass="bg-tealishBlue"
            dataTestId={primaryButtonConfig.dataTestId}
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
