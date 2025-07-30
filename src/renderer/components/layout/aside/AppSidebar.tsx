/**
 * Application sidebar component that provides navigation and adapts to different platforms and states.
 * Renders different navigation components based on the current route and handles responsive behavior.
 */
import usePlatform from 'hooks/usePlatform';
import { useLocation } from 'react-router-dom';
import useAppearanceStore from 'stores/useAppearanceStore';
import GlobalNav from './GlobalNav';
import ChatNav from './ChatNav';
import AppNav from './AppNav';
import Footer from './Footer';

import './AppSidebar.scss';
import BookmarkNav from './BookmarkNav';

/**
 * Main sidebar component that renders the application's navigation sidebar.
 * Adapts its appearance based on platform (Darwin/Linux), route, and sidebar state (hidden/collapsed).
 * Conditionally renders different navigation components based on the active route.
 * 
 * @returns {JSX.Element} The rendered sidebar component with appropriate navigation and styling
 */
export default function Sidebar() {
  const location = useLocation();
  const { isDarwin, isLinux } = usePlatform();
  const sidebar = useAppearanceStore((state) => state.sidebar);
  const width = sidebar.hidden ? 'w-0' : 'w-auto';
  const left = sidebar.hidden ? 'md:left-0' : '-left-64 md:left-0';
  const leftCollapsed = sidebar.hidden ? '-left-64' : '-left-64 md:left-0';

  /**
   * Determines which navigation component to render based on the current route.
   * 
   * @returns {JSX.Element} The appropriate navigation component for the active route
   */
  const renderNav = () => {
    const activeRoute = location.pathname.split('/')[1];
    switch (activeRoute) {
      case 'apps':
        return <AppNav collapsed={sidebar.collapsed} />;
      case 'bookmarks':
        return <BookmarkNav collapsed={sidebar.collapsed} />;
      default:
        return <ChatNav collapsed={sidebar.collapsed} />;
    }
  };

  renderNav();

  let paddingClass = 'md:pt-0';
  if (isDarwin) {
    paddingClass = 'darwin pt-10';
  } else if (isLinux) {
    paddingClass = 'pt-8 md:pt-0';
  }

  return (
    <aside
      className={`shadow-md md:shadow-none z-10 flex-shrink-0 ${paddingClass} ${
        sidebar.collapsed ? width : 'w-64 md:w-[17rem]'
      } fixed inset-y-0 top-0 ${
        sidebar.collapsed ? leftCollapsed : left
      } flex flex-col h-full md:relative app-sidebar`}
    >
      <div className="flex h-full flex-1 flex-col">
        <GlobalNav collapsed={sidebar.collapsed} />
        {renderNav()}
        <Footer collapsed={sidebar.collapsed} />
      </div>
    </aside>
  );
}