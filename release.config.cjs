/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [
    {
      name: 'main',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assignees: '@nelson6e65',
        discussionCategoryName: 'announcements',
      },
    ],
  ],
};
