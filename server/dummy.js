module.exports = {
  lists: [
    {
      title: 'title1',
      author: 'author1',
      upvote: '1',
      downvote: '1',
      id: '1',
      img: 'http://i.ytimg.com/vi/yAIGLAgEa84/0.jpg',
      content:
        {
          a: "this is the fattest of all time",
          b: "second fattest",
          c: "should we keep going?",
          d: "I think so",
          e: "why would someone have such a fat cat?",
          f: "probs because they are funny",
          g: "I ain't going there",
          h: "I actually did",
          i: "keep it short",
          j: "SHORTEST!!!!!!"
        },
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
