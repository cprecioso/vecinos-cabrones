import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { JSX, useEffect, useState } from "react";

export const IconTheming = () => (
  // from https://realfavicongenerator.net/
  <Head>
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />
    <link
      key="icon-32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />
    <link
      key="icon-194"
      rel="icon"
      type="image/png"
      sizes="194x194"
      href="/favicon-194x194.png"
    />
    <link
      key="icon-192"
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/android-chrome-192x192.png"
    />
    <link
      key="icon-16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />
    <link key="manifest" rel="manifest" href="/site.webmanifest" />
    <link
      key="mask-icon"
      rel="mask-icon"
      href="/safari-pinned-tab.svg"
      color="#fec32a"
    />
    <meta
      key="apple-mobile-web-app-title"
      name="apple-mobile-web-app-title"
      content="Vecinos Cabrones"
    />
    <meta
      key="application-name"
      name="application-name"
      content="Vecinos Cabrones"
    />
    <meta
      key="msapplication-TileColor"
      name="msapplication-TileColor"
      content="#16181b"
    />
    <meta key="theme-color" name="theme-color" content="#16181b" />
  </Head>
);

export const PageSeo = ({
  pageTitle,
  imageUrl = "https://vecinoscabrones.com/static/emilio.jpg",
  pageDescription,
}: {
  pageTitle?: string;
  imageUrl?: string;
  pageDescription?: string;
}) => {
  const router = useRouter();

  const url = new URL(router.asPath, "https://vecinoscabrones.com/").href;
  const fullTitle = `${pageTitle ? `${pageTitle} | ` : ""}Vecinos Cabrones`;
  const fullDescription = `${
    pageDescription ? `${pageDescription} | ` : ""
  }Encuentra tu escena favorita de Aquí no hay quien viva`;

  // from https://metatags.io/
  return (
    <Head>
      {/* Main tags */}
      <title>{fullTitle}</title>
      <meta key="title" name="title" content={fullTitle} />
      <meta key="description" name="description" content={fullDescription} />

      {/* Facebook tags */}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta
        key="og:description"
        property="og:description"
        content={fullDescription}
      />
      <meta key="og:image" property="og:image" content={imageUrl} />

      {/* Twitter tags */}
      <meta
        key="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:url" property="twitter:url" content={url} />
      <meta key="twitter:title" property="twitter:title" content={fullTitle} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={fullDescription}
      />
      <meta key="twitter:image" property="twitter:image" content={imageUrl} />
    </Head>
  );
};

export const GoogleAnalytics = () => {
  const { asPath } = useRouter();
  const [initialPath, setInitialPath] = useState<string | null>(asPath);
  useEffect(() => {
    if (window.ga && asPath !== initialPath) {
      setInitialPath(null);
      setTimeout(() => {
        window.ga!("set", "page", asPath);
        window.ga!("send", "pageview");
      }, 10);
    }
  }, [asPath, initialPath]);

  return (
    <>
      <Script id="ga_init" strategy="afterInteractive">
        {`
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-163615540-1', 'auto');
          ga('send', 'pageview');
        `}
      </Script>
      <Script
        src="https://www.google-analytics.com/analytics.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export const sendEvent = async (
  eventCategory: string,
  eventAction: string,
  eventLabel?: string,
  eventValue?: number,
) => {
  await new Promise((f, r) => {
    setTimeout(r, 3000);
    window.ga!("send", "event", {
      eventCategory,
      eventAction,
      eventLabel,
      eventValue,
      hitCallback: f,
    });
  });
};
export type EventData = Parameters<typeof sendEvent>;

export const AnalyticsEventLink = ({
  children,
  href,
  event,
  ...props
}: Omit<JSX.IntrinsicElements["a"], "onClick"> & {
  event?: EventData;
}) => {
  return (
    <a
      {...props}
      href={href}
      onClick={async (e) => {
        e.preventDefault();
        if (event) {
          try {
            await sendEvent(...event);
          } catch {}
        }
        if (href) window.location.href = href;
      }}
    >
      {children}
    </a>
  );
};
