import { useEffect, useState } from 'react';
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui/react-components';
import Mousetrap from 'mousetrap';
import {
  PanelLeftText24Filled,
  PanelLeftText24Regular,
  Search24Filled,
  Search24Regular,
  Wifi124Filled,
  Wifi124Regular,
  WifiOff24Filled,
  WifiOff24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import useOnlineStatus from 'hooks/useOnlineStatus';
import { useTranslation } from 'react-i18next';
import usePlatform from 'hooks/usePlatform';
import useAppearanceStore from '../../../stores/useAppearanceStore';
import './AppHeader.scss';
import SearchDialog from '../SearchDialog';
import TrafficLights from '../TrafficLights';
import UpgradeIndicator from '../UpgradeIndicator';

const PanelLeftIcon = bundleIcon(PanelLeftText24Filled, PanelLeftText24Regular);
const SearchIcon = bundleIcon(Search24Filled, Search24Regular);
const OnlineIcon = bundleIcon(Wifi124Filled, Wifi124Regular);
const OfflineIcon = bundleIcon(WifiOff24Filled, WifiOff24Regular);

/**
 * Application header component that displays navigation controls, search functionality,
 * network status indicator, and platform-specific elements.
 * 
 * @returns {JSX.Element} The rendered header component
 */
export default function AppHeader() {
  const { isDarwin } = usePlatform();
  const collapsed = useAppearanceStore((state) => state.sidebar.collapsed);
  const toggleSidebarVisibility = useAppearanceStore(
    (state) => state.toggleSidebarVisibility,
  );
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const NetworkStatusIcon = useOnlineStatus() ? (
    <Popover withArrow size="small" closeOnScroll>
      <PopoverTrigger disableButtonEnhancement>
        <Button icon={<OnlineIcon />} appearance="transparent" />
      </PopoverTrigger>
      <PopoverSurface>
        <div> {t('Common.Online')}</div>
      </PopoverSurface>
    </Popover>
  ) : (
    <Popover withArrow size="small" closeOnScroll>
      <PopoverTrigger disableButtonEnhancement>
        <Button icon={<OfflineIcon />} appearance="transparent" />
      </PopoverTrigger>
      <PopoverSurface>
        <div> {t('Common.Offline')}</div>
      </PopoverSurface>
    </Popover>
  );

  useEffect(() => {
    Mousetrap.bind('mod+f', () => setSearchOpen(true));
    return () => {
      Mousetrap.unbind('mod+f');
    };
  }, []);

  return (
    <div>
      <div
        className={`app-header z-30   pb-2 w-auto ${
          collapsed ? 'md:w-[10rem]' : 'md:w-[17rem]'
        } flex  ${isDarwin ? 'items-center pl-20 pt-1.5' : 'items-start pl-2 p-10'}`}
      >
        {isDarwin && <TrafficLights />}

        <div className="block md:hidden pl-1">
          <Button
            icon={<PanelLeftIcon />}
            appearance="transparent"
            onClick={() => toggleSidebarVisibility()}
          />
        </div>
        <div className="pl-1">
          <Button
            icon={<SearchIcon />}
            appearance="transparent"
            onClick={() => setSearchOpen(true)}
          />
        </div>
        <div>{NetworkStatusIcon}</div>
        <div className="ml-2">{collapsed || <UpgradeIndicator />}</div>
      </div>
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
    </div>
  );
}