import {
    _id,
    _price,
    _times,
    _company,
    _boolean,
    _fullName,
    _taskNames,
    _postTitles,
    _description,
    _productNames,
  } from './_mock';
  
  // ----------------------------------------------------------------------
  
  export const _myAccount = {
    displayName: 'USER_NAME',
    email: 'USER_EMAIL',
    photoURL: '/assets/images/avatar/avatar-default.webp',
  };
  
  // ----------------------------------------------------------------------
  
  const COLORS = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107',
  ];
  
  export const _products = [...Array(24)].map((_, index) => {
    const setIndex = index + 1;
  
    return {
      id: _id(index),
      price: _price(index),
      name: _productNames(index),
      priceSale: setIndex % 3 === 0 ? _price(index) : null, // Preço em promoção apenas para índices divisíveis por 3
      coverUrl: `/assets/images/product/product-${setIndex}.webp`,
      colors:
        setIndex === 1
          ? COLORS.slice(0, 2)
          : setIndex === 2
          ? COLORS.slice(1, 3)
          : setIndex === 3
          ? COLORS.slice(2, 4)
          : setIndex === 4
          ? COLORS.slice(3, 6)
          : setIndex === 23
          ? COLORS.slice(4, 6)
          : setIndex === 24
          ? COLORS.slice(5, 6)
          : COLORS,
      status:
        [1, 3, 5].includes(setIndex)
          ? 'sale'
          : [4, 8, 12].includes(setIndex)
          ? 'new'
          : '',
    };
  });
  
  // ----------------------------------------------------------------------
  
  export const _timeline = [...Array(5)].map((_, index) => ({
    id: _id(index),
    title: [
      '1983, orders, $4220',
      '12 Invoices have been paid',
      'Order #37745 from September',
      'New order placed #XF-2356',
      'New order placed #XF-2346',
    ][index],
    type: `order${index + 1}`,
    time: _times(index),
  }));
  
  // ----------------------------------------------------------------------
  
  export const _tasks = [...Array(5)].map((_, index) => ({
    id: _id(index),
    name: _taskNames(index),
  }));
  
  // ----------------------------------------------------------------------
  
  export const _notifications = [
    {
        id: _id(2),
        type: 'friend-interactive',
        title: _fullName(2),
        isUnRead: true,
        description: 'sent $50 to your account',
        avatarUrl: '/assets/images/avatar/avatar-friend.webp',
        postedAt: _times(0),
    },
    {
      id: _id(3),
      type: 'chat-message',
      title: 'You have a new message',
      isUnRead: false,
      description: 'You have 2 unread messages.',
      avatarUrl: null,
      postedAt: _times(1),
    },
  ];
  