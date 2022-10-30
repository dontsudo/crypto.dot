import { Box, Button, Flex, Heading, Link, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';

import bookmarkAPI, { Bookmark } from '../../services/chrome/bookmarkAPI';

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
      <Box>
        {bookmarks.map((bookmark) => (
          <Link href={bookmark.url} as={Button} mx={2} my={1} fontSize="2xs" rounded="full">
            {bookmark.title.length > 7 ? `${bookmark.title.slice(0, 7)}...` : bookmark.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
