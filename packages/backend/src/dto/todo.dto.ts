export interface TodoDTO {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly private?: boolean;
  readonly userId: number;
}
