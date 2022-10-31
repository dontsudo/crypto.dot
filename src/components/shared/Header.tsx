import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';

import bookmarkAPI, { Bookmark } from '../../services/chrome/bookmarkAPI';
import { getOriginURL } from '../../utils';

const Header: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    async function fetchBrowserBookmarks() {
      setBookmarks(await bookmarkAPI.getFlattenList());
    }

    fetchBrowserBookmarks();
  }, [setBookmarks]);

  return (
    <Box className="header">
      <Flex justifyContent="space-between" alignItems="center" pt="4" pb="4">
        <Heading size="lg" color="green.500">
          🐂 CRYPTO WATCH
        </Heading>

        <Button size="sm" onClick={toggleColorMode} mt={1}>
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>
      {bookmarks.length && (
        <Box bg={useColorModeValue('gray.100', 'whiteAlpha.100')} borderRadius={12} p={4} mb={4}>
          {bookmarks.map((bookmark) => (
            <Box display="inline-block" w={12} _hover={{ opacity: '0.6' }} m={2}>
              <Link href={bookmark.url}>
                <Image
                  src={
                    bookmark.url
                      ? `chrome://favicon/size/24/${getOriginURL(bookmark.url)}`
                      : undefined
                  }
                  w={6}
                  mx="auto"
                  pb={1}
                />
                <Text fontSize="smaller" textAlign="center">
                  {bookmark.title.length > 5 ? `${bookmark.title.slice(0, 5)}...` : bookmark.title}
                </Text>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Header;
