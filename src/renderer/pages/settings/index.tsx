import { useTranslation } from 'react-i18next';

import './Settings.scss';

import { Link } from 'react-router-dom';
import usePlatform from 'hooks/usePlatform';
import Version from './Version';
import AppearanceSettings from './AppearanceSettings';
import EmbedSettings from './EmbedSettings';
import LanguageSettings from './LanguageSettings';

/**
 * Settings page component that renders the main settings interface.
 * 
 * Displays various settings sections including API configuration notice,
 * embed settings, appearance settings, language settings, and version information.
 * The layout adapts based on the platform (Darwin/macOS vs other platforms)
 * with different bottom padding values.
 * 
 * @returns {JSX.Element} The rendered settings page with header, navigation link to providers, and settings sections
 */
export default function Settings() {
  const { isDarwin } = usePlatform();
  const { t } = useTranslation();

  return (
    <div className="page h-full" id="page-settings">
      <div className="page-top-bar" />
      <div className="page-header">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{t('Common.Settings')}</h1>
        </div>
      </div>
      <div
        className={`overflow-y-auto h-full  -mr-5 pr-5 ${isDarwin ? 'pb-28' : 'pb-16'}`}
      >
        <div className="settings-section">
          <div className="settings-section--header">{t('Common.API')}</div>
          <div className="py-4 flex-grow mt-1 gap-1">
            <span className="tips">
              {t('Settings.ProviderSettingsMovedTo')}&nbsp;
            </span>
            <Link to="/providers" className="underline">
              {t('Common.Providers')}
            </Link>
          </div>
        </div>
        <EmbedSettings />
        <AppearanceSettings />
        <LanguageSettings />
        <Version />
      </div>
    </div>
  );
}