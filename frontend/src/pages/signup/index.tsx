import { FormEvent, useContext, useState } from 'react';

import Head from 'next/head';
import styles from '../../../styles/home.module.scss';
import Image from 'next/image';

import LogoImg from '../../../public/Logo.svg';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { AuthContext } from '../../contexts/AuthContext';

import Link from 'next/link';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Signup() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleSignup(event: FormEvent) {
        event.preventDefault();

        if (name === '' || password === '' || email === '') {
            toast.error("Preencha todos os campos");
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        };

        await signUp(data);

        setLoading(false);


    };

    return (
        <>
            <Head>
                <title>Sujeito Pizza - Faça seu login</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={LogoImg} alt="Logo sujeito pizza" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignup}>
                        <Input
                            type='text'
                            placeholder='Nome da empresa'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type='text'
                            placeholder='Digite seu Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            type='password'
                            placeholder='Sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type='submit'
                            loading={loading}
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