import React, { useCallback, useEffect, useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { InspectionProvider } from './context/InspectionContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { OfflineBanner } from './components/OfflineBanner';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { HomePage } from './pages/HomePage';
import { GuidesPage } from './pages/GuidesPage';
import { ToolsPage } from './pages/ToolsPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { ReportPage } from './pages/ReportPage';
import { AboutPage } from './pages/AboutPage';

let hasCheckedInitialHomepageLoad = false;

const AppContent: React.FC = () => {
  const { route } = useRouter();
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(() => {
    if (hasCheckedInitialHomepageLoad) return false;
    hasCheckedInitialHomepageLoad = true;
    return route.path === '/';
  });

  useEffect(() => {
    if (route.path !== '/' && showLoadingScreen) {
      setShowLoadingScreen(false);
    }
  }, [route.path, showLoadingScreen]);

  const handleLoadingComplete = useCallback(() => {
    setShowLoadingScreen(false);
  }, []);

  const renderCurrentPage = () => {
    switch (route.path) {
      case '/':
      case '/tools':
        return <ToolsPage />;
      case '/directory':
        return <HomePage />;
      case '/guides':
        return <GuidesPage />;
      case '/checklist':
        return <ChecklistPage />;
      case '/report':
        return <ReportPage />;
      case '/about':
      case '/faq':
      case '/terms':
      case '/privacy':
      case '/contact':
        return <AboutPage />;
      case '/blogs':
        return <HomePage />;
      default:
        // Default landing page is Tools
        return <ToolsPage />;
    }
  };

  return (
    <>
      {showLoadingScreen && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div
        aria-hidden={showLoadingScreen || undefined}
        className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors"
      >
        <OfflineBanner />
        <Header />

        <main id="main-content" className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 flex-1">
          {renderCurrentPage()}
        </main>

        <Footer />
        <MobileNav />
      </div>
    </>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <InspectionProvider>
        <AppContent />
      </InspectionProvider>
    </RouterProvider>
  );
}
