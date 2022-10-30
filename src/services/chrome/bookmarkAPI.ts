export type Bookmark = {
  id: string;
  title: string;
  url: string | undefined;
};

const bookmarkAPI = Object.freeze({
  /**
   * async/await를 지원하지 않아서 Promise 래핑
   * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
   */
  getTree(): Promise<chrome.bookmarks.BookmarkTreeNode> {
    return new Promise((resolve) => {
      chrome.bookmarks.getTree(([tree]) => resolve(tree));
    });
  },

  async getFlattenList(): Promise<Bookmark[]> {
    const tree = await this.getTree();
    if (!tree.children) return [];

    let bookmarks = tree.children.flatMap((v) => v.children!);
    while (bookmarks.find((v) => v.children)) {
      bookmarks = bookmarks.flatMap((v) => v.children || [v]);
    }

    return bookmarks.map(({ id, title, url }) => ({ id, title, url }));
  },
});

export default bookmarkAPI;
