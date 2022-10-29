import React from 'react';
import { NextPage } from 'next';
import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

const Document: NextPage = () => (
  <Html>
    <Head />
    <body>
      <ColorModeScript initialColorMode="dark" />
      <Main />
      <NextScript />
    </body>
  </Html>
);

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  return initialProps;
};

export default Document;
