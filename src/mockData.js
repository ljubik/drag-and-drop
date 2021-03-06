const mockData = {
  lists: {
    '01list': {
      id: '01list',
      title: 'To do',
      cards: [
        {
          id: '01card',
          title: 'Test 01'
        },
        {
          id: '02card',
          title: 'Test 02'
        },
        {
          id: '03card',
          title: 'Test 03 Trello tasks'
        },
      ]
    },
    '02list': {
      id: '02list',
      title: 'In progress...',
      cards: []
    }
  },
  listIds: ['01list', '02list']
}

export default mockData