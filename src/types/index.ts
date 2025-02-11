export interface BucketItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface BucketList {
  id: string;
  name: string;
  items: BucketItem[];
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  lists: BucketList[];
}