import React, { useState } from 'react';
import { QueryKey, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Box, Button, TextField } from '@mui/material';
import {
  SliderContainer,
  TodoContainer,
  ButtonBox,
  ButtonGrid,
  ContainerInputButtons
} from './TodoContainer.styled';
import { ITodo, IUser } from '../../../../interfaces/interface';
import { TodoElementContainer } from '../TodoElement';
import { TodoSlider } from './TodoSlider';
import { APP_KEYS } from '../../consts';
import { ButtonComponent } from '../Button';
import todoService from '../../../../service/todo.service';
import { QUERY_KEYS, STORAGE_KEYS } from '../../consts/app-keys.const';
import Layout from '../Layout';
import { buttons } from './buttons';
import { IParams } from '../../types/TodosParams.types';
import { useGetAllSuccess } from '../../../../helper/onSuccess';
import userService from '../../../../service/user.service';

export const TodoContainerContainer = () => {
  const onGetAllSuccess = useGetAllSuccess();
  const [listButton, setListButton] = useState('all');
  const [privateOrPublic, setPrivateOrPublic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [queryK, setQueryK] = useState<QueryKey>([
    QUERY_KEYS.TODOS,
    { search: '', status: '', list: '' }
  ]);

  const email = localStorage.getItem(STORAGE_KEYS.EMAIL);
  const { data: userData } = useQuery<IUser>([QUERY_KEYS.USER, email], async () =>
    userService.getUserByEmail(email!)
  );

  const fetchTodos = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [, params] = queryKey as [string, IParams];
    const { search = '', status = '', list = '' } = params;
    return todoService.getAllTodos({ search, status, list, userId: userData?.id! });
  };

  const {
    data: todosData,
    isLoading,
    isError
  } = useQuery<ITodo[]>(queryK, fetchTodos, {
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
      { search: searchQuery, status: privateOrPublic, list: listButton }
    ]);
  };

  const handleListClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const { value } = e.currentTarget;
    setListButton(value);
    setQueryK([QUERY_KEYS.TODOS, { search: searchQuery, status: privateOrPublic, list: value }]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
    setQueryK([
      QUERY_KEYS.TODOS,
      { search: e.currentTarget.value, status: privateOrPublic, list: listButton }
    ]);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching data happened!</Alert>;

  return (
    <Layout>
      <ContainerInputButtons sx={{ my: 2 }}>
        <ButtonGrid container sx={{ my: 2 }}>
          {buttons.map((b) => (
            <Button
              key={b.title}
              onClick={b.type === 'status' ? handlePrivateOrPublicClick : handleListClick}
              name={b.name}
              value={b.value}
              variant={
                listButton === b.value || privateOrPublic === b.value ? 'contained' : 'outlined'
              }
              style={{
                color: listButton === b.value || privateOrPublic === b.value ? 'primary' : 'default'
              }}
            >
              {b.title}
            </Button>
          ))}
        </ButtonGrid>
        <TextField
          sx={{ margin: 2 }}
          id="outlined-basic"
          size="medium"
          color="primary"
          label="at least 3 characters to search by text"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
        />
      </ContainerInputButtons>
      {todosData ? (
        <Box>
          <ButtonBox>
            <Link to={APP_KEYS.ROUTER_KEYS.ADDTODO}>
              <ButtonComponent>add new todo</ButtonComponent>
            </Link>
          </ButtonBox>
          <TodoContainer>
            {todosData.map((item) => (
              <TodoElementContainer key={item.id} item={item} />
            ))}
          </TodoContainer>
          {/* tablet slider */}
          <SliderContainer>
            <TodoSlider items={todosData} />
          </SliderContainer>
        </Box>
      ) : (
        <Alert severity="error">No data fetched!</Alert>
      )}
    </Layout>
  );
};
