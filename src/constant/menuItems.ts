import { BookA, CirclePlus, ListCollapse, ListVideo, User2 } from 'lucide-react';

// Menu items.
const users = [
  {
    title: 'Users',
    url: 'users',
    icon: User2,
  },
];

const lessons = [
  {
    title: 'Lessons',
    url: 'lessons',
    icon: ListCollapse,
  },
  {
    title: 'Add Lessons',
    url: 'add-lessons',
    icon: CirclePlus,
  },
];

const vocabulary = [
  {
    title: 'Vocabulary',
    url: 'vocabulary',
    icon: BookA,
  },
  {
    title: 'Add Vocabulary',
    url: 'add-vocabulary',
    icon: CirclePlus,
  },
];

const tutorials = [
  {
    title: 'Tutorials',
    url: 'tutorials',
    icon: ListVideo,
  },
  {
    title: 'Add Tutorial',
    url: 'add-tutorial',
    icon: CirclePlus,
  },
];

export { lessons, tutorials, users, vocabulary };
