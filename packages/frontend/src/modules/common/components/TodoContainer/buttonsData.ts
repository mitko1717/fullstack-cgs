export interface IButton {
  value: string;
  title: string;
  name: string;
  type: string;
}

export const buttons: IButton[] = [
  {
    value: 'all',
    title: 'all',
    name: 'all',
    type: 'list'
  },
  {
    value: 'private',
    title: 'private',
    name: 'private',
    type: 'status'
  },
  {
    value: 'public',
    title: 'public',
    name: 'public',
    type: 'status'
  },
  {
    value: 'completed',
    title: 'completed',
    name: 'completed',
    type: 'list'
  }
];
