import { IButton } from '../components/TodoContainer/buttonsData';

export interface ILimitInputBoxProps {
  limitInput: number;
  handleLimitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setLimit: (limit: number) => void;
}

export interface IButtonsProps {
  buttons: IButton[];
  listButton: string;
  privateOrPublic: string;
  handlePrivateOrPublicClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleListClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ISearchInputProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
