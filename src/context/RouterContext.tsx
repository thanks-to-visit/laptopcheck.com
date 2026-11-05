import React, { createContext, useContext, useEffect, useState } from 'react';

export interface RouteInfo {
  path: string;
  slug?: string;
  hash: string;
  categoryParam?: string;
}

interface RouterContextType {
  route: RouteInfo;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  route: { path: '/', hash: '' },
  navigate: () => {}
});

function parseLocation(): RouteInfo {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get('category') || undefined;

  // Normalize path
  let path = pathname;
  if (!path || path === '') path = '/';

  // Check guides/[slug]
  const guideMatch = path.match(/^\/guides\/([a-zA-Z0-9_-]+)/);
  if (guideMatch) {
    return {
      path: '/guides',
      slug: guideMatch[1],
      hash,
      categoryParam
    };
  }

  return {
    path,
    hash,
    categoryParam
  };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteInfo>(parseLocation);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocation());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Handle hash scrolling if hash changes
  useEffect(() => {
    if (route.hash) {
      const id = route.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [route.path, route.slug, route.hash]);

  const navigate = (to: string) => {
    if (to.startsWith('http')) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }

    if (to.startsWith('#')) {
      window.location.hash = to;
      setRoute(parseLocation());
      return;
    }

    window.history.pushState(null, '', to);
    setRoute(parseLocation());
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}

export const Link: React.FC<{
  href: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}> = ({ href, className, children, title, ariaLabel, onClick }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={href}
      title={title}
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (!href.startsWith('http') && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault();
          navigate(href);
        }
      }}
    >
      {children}
    </a>
  );
};
