import { DefaultSeo } from 'next-seo';
import '../styles/globals.css';

import SEO from '../next-seo.config';
import store from '../state/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DefaultSeo {...SEO} />

      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
