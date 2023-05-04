import React, { useState } from 'react';
import { QueryKey, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Box, Pagination, Typography } from '@mui/material';
import {
  SliderContainer,
  TodoContainer,
  ButtonBox,
  ContainerInputButtons
} from './TodoContainer.styled';
import { Buttons } from './Buttons';
import { ITodosData, IUser } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement';
import { TodoSlider } from './TodoSlider';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import todoService from '../../../../service/todo.service';
import { QUERY_KEYS, STORAGE_KEYS } from '../../consts/app-keys.const';
import Layout from '../Layout';
import { buttons } from './buttonsData';
import { IParams } from '../../types/TodosParams.types';
import { useGetAllSuccess } from '../../../../helper/onSuccess';
import userService from '../../../../service/user.service';
import { SearchInput } from './SearchInput';
import { LimitInputBox } from './LimitInput';

export const TodoContainerContainer = () => {
  const onGetAllSuccess = useGetAllSuccess();
  const [listButton, setListButton] = useState('all');
  const [privateOrPublic, setPrivateOrPublic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationNum, setPaginationNum] = useState(1);
  const [limitInput, setLimitInput] = useState(5);
  const [limitQuery, setLimit] = useState(5);

  const email = localStorage.getItem(STORAGE_KEYS.EMAIL);
  const { data: userData } = useQuery<IUser>([QUERY_KEYS.USER, email], async () =>
    userService.getUserByEmail(email!)
  );

  const [queryK, setQueryK] = useState<QueryKey>([
    QUERY_KEYS.TODOS,
    { search: '', status: '', list: '', userId: userData?.id, page: 1, limit: 5 }
  ]);

  const fetchTodos = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [, params] = queryKey as [string, IParams];
    const {
      search = '',
      status = '',
      list = '',
      userId = userData?.id!,
      page = paginationNum,
      limit = limitQuery
    } = params;
    return todoService.getAllTodos({
      search,
      status,
      list,
      userId,
      page,
      limit
    });
  };

  const {
    data: todosData,
    isLoading,
    isError
  } = useQuery<ITodosData>(queryK, fetchTodos, {
    refetchOnWindowFocus: false,
    onSuccess: onGetAllSuccess,
    enabled: !!userData // start fetching data only after userData is defined
  });

  const handlePrivateOrPublicClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const { value } = e.currentTarget;
    if (value === privateOrPublic) {
      setPrivateOrPublic('');
    } else setPrivateOrPublic(value);
    setQueryK([
      QUERY_KEYS.TODOS,
      {
        search: searchQuery,
        status: privateOrPublic,
        list: listButton,
        limit: limitQuery,
        userId: userData?.id!,
        page: paginationNum
      }
    ]);
  };

  const handleListClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const { value } = e.currentTarget;
    setListButton(value);
    setQueryK([
      QUERY_KEYS.TODOS,
      {
        search: searchQuery,
        status: privateOrPublic,
        list: value,
        limit: limitQuery,
        userId: userData?.id!,
        page: paginationNum
      }
    ]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
    setQueryK([
      QUERY_KEYS.TODOS,
      {
        search: e.currentTarget.value,
        status: privateOrPublic,
        list: listButton,
        limit: limitQuery,
        userId: userData?.id!,
        page: paginationNum
      }
    ]);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = +e.target.value;
    setLimitInput(newLimit);
  };

  const handleSetLimit = () => {
    setQueryK([
      QUERY_KEYS.TODOS,
      {
        search: searchQuery,
        status: privateOrPublic,
        list: listButton,
        userId: userData?.id!,
        page: paginationNum,
        limit: limitInput
      }
    ]);
    setLimit(limitInput);
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPaginationNum(page);
    setQueryK([
      QUERY_KEYS.TODOS,
      {
        search: searchQuery,
        status: privateOrPublic,
        list: listButton,
        limit: limitInput.toString(),
        page: page.toString()
      }
    ]);
  };

  return (
    <Layout>
      <ContainerInputButtons sx={{ my: 2 }}>
        <Buttons
          buttons={buttons}
          listButton={listButton}
          privateOrPublic={privateOrPublic}
          handlePrivateOrPublicClick={handlePrivateOrPublicClick}
          handleListClick={handleListClick}
        />
        <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      </ContainerInputButtons>
      {todosData?.todos ? (
        <Box>
          <ButtonBox>
            <Link to={APP_KEYS.ROUTER_KEYS.ADDTODO}>
              <ButtonComponent>add new todo</ButtonComponent>
            </Link>
          </ButtonBox>
          <Typography component="div" sx={{ textAlign: 'center' }}>
            total todo count: {todosData?.totalCount}
          </Typography>
          <TodoContainer>
            {todosData.todos.map((item) => (
              <TodoElementContainer key={item.id} item={item} />
            ))}
          </TodoContainer>
          {/* tablet slider */}
          <SliderContainer>
            <TodoSlider items={todosData.todos} />
          </SliderContainer>

          <LimitInputBox
            limitInput={limitInput}
            handleLimitChange={handleLimitChange}
            setLimit={handleSetLimit}
          />
          
            <Pagination
              count={todosData.totalPages}
              color="primary"
              page={paginationNum}
              onChange={handlePageChange}
              sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
            />
        </Box>
      ) : (
        <span />
      )}
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Error fetching data happened!</Alert>}
    </Layout>
  );
};
