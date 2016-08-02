module.exports = {
  lists: [
    {
      title: 'title1',
      author: 'author1',
      upvote: '1',
      downvote: '1',
      id: '1',
      comments: [
        {
          user: '2',
          upvote: '2',
          downvote: '2',
          text: 'user2 comment'
        }
      ]
    },
    {
      title: 'title2',
      author: 'author2',
      upvote: '3',
      downvote: '2',
      id: '2',
      comments: [
        {
          user: 'comment_user',
          upvote: '0',
          downvote: '1',
          text: 'comment_user comment'
        }
      ]
    }
  ]
};
