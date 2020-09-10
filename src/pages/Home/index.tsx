import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Container, Button, Content, Input } from './styles';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

export const CREATE_OR_LOGIN_USER = gql`
  mutation($email: String!) {
    createOrLoginUser(data: {
      email: $email
    }) {
      id
    }
  }
`

const Home: React.FC = () => {

  const [input, setInput] = useState<string>('');
  const history = useHistory()

  const [createOrLoginUser, { data }] = useMutation(CREATE_OR_LOGIN_USER)

  useEffect(() => {
    if (data) {
      const { createOrLoginUser } = data
      const { id } = createOrLoginUser
      history.push(`/messages?id=${id}`)
    }

  }, [data, history])

  async function handleRegister(e: React.MouseEvent) {

    console.log('entrou aqui')
    e.preventDefault()

    if (input.length < 1) {
      alert('Insert a valid e-mail!')
      return;
    }

    createOrLoginUser({ variables: { email: input } });
    setInput('');
  }

  return (
    <Container>
      <Content>
        <form>
          <Input placeholder='Digite seu e-mail..' value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={handleRegister}>
            <FaCheck size={36} color="#fff" />
            <span>Login or Register</span>
          </Button>
        </form>
      </Content>
    </Container>
  )
}

export default Home