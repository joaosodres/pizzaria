import Head from 'next/head';
import styles from '../../../styles/home.module.scss';
import Image from 'next/image';

import LogoImg from '../../../public/Logo.svg';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import Link from 'next/link';

export default function Signup() {
    return (
        <>
            <Head>
                <title>Sujeito Pizza - Faça seu login</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={LogoImg} alt="Logo sujeito pizza" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form >
                        <Input
                            type='text'
                            placeholder='Nome da empresa'
                        />
                        <Input
                            type='text'
                            placeholder='Digite seu Email'
                        />

                        <Input
                            type='password'
                            placeholder='Sua senha'
                        />
                        <Button
                            type='submit'
                            loading={false}
                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link href="/">
                        <a href='' className={styles.text}>Ja possui uma conta? Faça o login</a>
                    </Link>

                </div>
            </div>
        </>
    );
}