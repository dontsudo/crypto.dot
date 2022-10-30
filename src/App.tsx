import { Container } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import TickerTable from './components/ticker/TickerTable';

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>🐂 Crypto.Dot</title>
        <link rel="canonical" href="http://crypto-dot.vercel.app" />
      </Helmet>
      <Container>
        <Header />
        <TickerTable />
        <Footer />
      </Container>
    </>
  );
};

export default App;
