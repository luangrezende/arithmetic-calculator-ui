import { _id, _times, _fullName } from './_mock';

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
