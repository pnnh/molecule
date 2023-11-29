import Script from 'next/script'
export function GoogleAnalytics () {
  return <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-0D4TGDBGBV" />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-0D4TGDBGBV');
        `}
      </Script>
    </>
}
