// import { EntityTarget, getRepository, Repository } from 'typeorm';
// import { Todo } from '../../src/entities/Todo';

// export async function isExist(entity: EntityTarget<Todo>, id: string) {
//   const todoRepository: Repository<Todo> = getRepository(entity);
//   const todo: Todo | null = await todoRepository.findOne(id);

//   if (!todo) {
//     throw new Error(`id ${id} not found`);
//   }

//   return todo;
// }
