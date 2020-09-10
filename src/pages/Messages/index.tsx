import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Message } from './styles';

const GET_ALL_MESSAGES = gql`
  query {
    getMessages {
      id
      content
      getUser {
        id
        email
      }
    }
  }
`

const Messages: React.FC = () => {

  const { loading, error, data } = useQuery(GET_ALL_MESSAGES);
  console.log('data', data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      {
        data.getMessages.length > 0 && data.getMessages.map((message: any, i: number) => (
          <Message key={Math.random() + i}>
            <p>{message.getUser.email}</p>
            <span>{message.content}</span>
          </Message>
        ))
      }
    </Container>
  )
}

export default Messages