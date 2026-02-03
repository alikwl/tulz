import Script from 'next/script'

export function GoogleAnalyticsScripts() {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-148D01JH2R"
                strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-148D01JH2R');
        `}
            </Script>
        </>
    )
}
