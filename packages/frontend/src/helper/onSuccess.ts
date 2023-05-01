import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS, ROUTER_KEYS } from '../modules/common/consts/app-keys.const';

export function useOnAddTodoSuccess() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function onAddTodoSuccess() {
    await queryClient.refetchQueries(QUERY_KEYS.TODOS);
    navigate(ROUTER_KEYS.CONTENT);
  }

  return onAddTodoSuccess;
}

export function useOnDeleteSuccess() {
  const queryClient = useQueryClient();

  async function onDeleteSuccess() {
    await queryClient.invalidateQueries(QUERY_KEYS.TODOS);
  }

  return onDeleteSuccess;
}

export function useOnCompleteSuccess() {
  const queryClient = useQueryClient();

  async function onCompleteSuccess() {
    await queryClient.invalidateQueries(QUERY_KEYS.TODOS);
    await queryClient.invalidateQueries(QUERY_KEYS.TODO);
  }

  return onCompleteSuccess;
}
