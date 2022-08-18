import { FormEvent, useContext } from 'react';
import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import Image from 'next/image';

import LogoImg from '../../public/Logo.svg';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';

import Link from 'next/link';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: 'teste@teste.com',
      password: '123123'
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={LogoImg} alt="Logo sujeito pizza" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type='text'
              placeholder='Digite seu Email'
            />

            <Input
              type='password'
              placeholder='Digite sua Senha'
            />
            <Button
              type='submit'
              loading={false}
            >
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <a href='' className={styles.text}>Não possui uma conta? cadastre-se</a>
          </Link>

        </div>
      </div>
    </>
  );
}