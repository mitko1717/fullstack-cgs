import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS, ROUTER_KEYS, STORAGE_KEYS } from '../modules/common/consts/app-keys.const';

export function useGetAllSuccess() {
  const queryClient = useQueryClient();

  async function onGetAllSuccess() {
    await queryClient.refetchQueries(QUERY_KEYS.TODOS);
    await queryClient.invalidateQueries(QUERY_KEYS.TODOS);
  }
  return onGetAllSuccess;
}

export function useOnAddTodoSuccess() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function onAddTodoSuccess() {
    await queryClient.refetchQueries(QUERY_KEYS.TODOS);
    await queryClient.invalidateQueries(QUERY_KEYS.TODOS);
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
    await queryClient.refetchQueries([QUERY_KEYS.TODOS]);
    await queryClient.refetchQueries(QUERY_KEYS.TODO);
  }
  return onCompleteSuccess;
}

export function useOnLoginSuccess() {
  const navigate = useNavigate();
  async function onCompleteSuccess() {
    navigate(ROUTER_KEYS.CONTENT);
  }
  return onCompleteSuccess;
}

export function useOnLogoutSuccess() {
  const navigate = useNavigate();
  async function onCompleteSuccess() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    navigate(ROUTER_KEYS.ROOT);
  }
  return onCompleteSuccess;
}

export function useOnChangedPasswordSuccess() {
  const navigate = useNavigate();
  async function onCompleteSuccess() {
    navigate(ROUTER_KEYS.ROOT);
  }

  return onCompleteSuccess;
}
