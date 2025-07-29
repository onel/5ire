import { useTranslation } from 'react-i18next';
import Empty from '../components/Empty';

/**
 * NotFound component that displays a "not found" error page.
 * 
 * This component renders an empty state with a construction image and 
 * localized text to indicate that the requested content or page was not found.
 * 
 * @returns {JSX.Element} An Empty component configured for not found scenarios
 */
export default function NotFound() {
  const { t } = useTranslation();
  return <Empty image="construction" text={t('Apps.Error.NotFound')} />;
}