import { Container } from "@chakra-ui/react";

import Header from "./components/shared/Header";
import TickerTable from "./components/ticker/TickerTable";

const MyApp: React.FC = () => {
  return (
    <Container>
      <Header />
      <TickerTable />
    </Container>
  );
};

export default MyApp;
