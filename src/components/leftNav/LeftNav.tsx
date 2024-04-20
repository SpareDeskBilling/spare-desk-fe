import { BetaLogo, HamburgerMenu, HomeIcon } from 'assets/icons';
import COLORS from 'constants/colors';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

const LeftNav = () => {
  const [selectedTab, setSelectedTab] = useState('');


  const navigate = useNavigate();

  const handleMenuClick = () => { };
  const isNavOpen = true;

  const getVisibility = useCallback(() => {
    if (isNavOpen) return 'visible';
    return 'hidden';
  }, [isNavOpen]);

  const NAV_BAR_CONSTANTS = [
    {
      navText: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard',
      iconDefaultFill: 'transparent',
      iconSelectedFill: COLORS.PRIMARY_COLOR,
      iconDefaultStroke: COLORS.SLATE_GREY,
      iconSelectedStroke: 'transparent',
      dataTestId: 'dashboard',
      hideOnProfessionalView: false
    },]

  const handleSelectedTab = (event, tab: string) => {

    navigate(tab);
    setSelectedTab(tab);
  };
  return (
    <div
      className={`flex fixed flex-col justify-between  
          overflow-auto z-[100] overflow-x-hidden customNormalScroll
        bg-white border-r-2 border-gray-200 ${isNavOpen ? 'w-80' : 'w-[5rem]'} 
          transition-[width] duration-[725ms] ease-out delay-0`}
      style={{
        height: '100vh'
      }}>
      <div className="flex flex-col mt-5">
        <div
          className={`flex flex-row ${isNavOpen ? 'justify-between' : 'justify-center'
            } items-center mx-4 mb-8`}>
          <div className={getVisibility()}>
            <BetaLogo />
          </div>
          <HamburgerMenu
            className="cursor-pointer"
            onClick={handleMenuClick}
          />
        </div>
        {NAV_BAR_CONSTANTS.map(navBarItem => {
          const { icon: NavbarIcon } = navBarItem;
          return (<div
            key={navBarItem.path}
            className={`flex relative flex-row items-center hover:bg-hawksBlue/30 
                  ${isNavOpen ? 'justify-start pl-3 ' : 'justify-center'} 
                    mx-2 mb-4 h-10 cursor-pointer ${selectedTab === navBarItem.path &&
              'bg-whiteSmoke rounded-md'
              } 
         overflow-hidden transition duration-150`}
            onClick={event => handleSelectedTab(event, navBarItem.path)}
            data-testid={navBarItem.dataTestId}>
            <NavbarIcon
              fill={`${selectedTab === navBarItem.path
                ? navBarItem.iconSelectedFill
                : navBarItem.iconDefaultFill
                }`}
              stroke={`${selectedTab === navBarItem.path
                ? navBarItem.iconSelectedStroke
                : navBarItem.iconDefaultStroke
                }`}
            />
            <span
              className={`ml-3 text-base font-medium ${getVisibility()}
                    ${selectedTab === navBarItem.path
                  ? 'text-primaryColor'
                  : 'text-slateGrey'
                } hover:scale-100 
           whitespace-nowrap overflow-hidden`}>
              {navBarItem.navText}
            </span>
            {/* {showNotificationDot(navBarItem.path) && notificationDot()} */}
            {/* <RippleEffect
                    ref={el => (ref.current[navBarItem.path] = el)}
                  /> */}
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default LeftNav;