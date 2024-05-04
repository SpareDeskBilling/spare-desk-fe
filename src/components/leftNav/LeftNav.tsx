import { HamburgerMenu, HomeIcon, SummaryIcon } from 'assets/icons';
import COLORS from 'constants/colors';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const NAV_BAR_CONSTANTS = [
  {
    navText: 'Home',
    icon: HomeIcon,
    path: '/home',
    iconDefaultFill: 'transparent',
    iconSelectedFill: COLORS.PRIMARY_COLOR,
    iconDefaultStroke: COLORS.SLATE_GREY,
    iconSelectedStroke: 'transparent',
    dataTestId: 'home',
    hideOnProfessionalView: false
  },
  {
    navText: 'Billing',
    icon: SummaryIcon,
    path: '/billing',
    iconDefaultFill: 'transparent',
    iconSelectedFill: COLORS.PRIMARY_COLOR,
    iconDefaultStroke: COLORS.SLATE_GREY,
    iconSelectedStroke: COLORS.WHITE,
    dataTestId: 'billing',
    hideOnProfessionalView: false
  }]

const LeftNav = () => {
  const [selectedTab, setSelectedTab] = useState('');


  const navigate = useNavigate();
  const { hash } = window.location;

  useEffect(() => {
    const baseHash = hash?.split('/')[1];
    let activeTab = '';
    activeTab = baseHash?.split('?')[0];
    setSelectedTab(activeTab ? `/${activeTab}` : NAV_BAR_CONSTANTS[0]?.path);
  }, [hash]);

  const handleMenuClick = () => { };
  const isNavOpen = true;

  const getVisibility = useCallback(() => {
    if (isNavOpen) return 'visible';
    return 'hidden';
  }, [isNavOpen]);

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
            <span className="text-primaryColor text-xl font-extrabold font-[cursive]">
              MULTI TECH
            </span>
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