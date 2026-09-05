import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'MDN Global School Kaithal';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
}

export default function SEOHead({ title, description, path }: SEOHeadProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = path ? `${window.location.origin}${path}` : window.location.href;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
