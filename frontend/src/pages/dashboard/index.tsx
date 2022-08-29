import { useState, useEffect } from "react";

import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import Modal from 'react-modal';
import { ModalOrder } from "../../components/ModalOrder";


type ItemProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
};

interface OrderProps {
    orderList: ItemProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    };
    order: {
        id: string;
        table: number | boolean;
        status: boolean;
        name: string | null;
    };
};

export default function Dashboard({ orderList }: OrderProps) {
    const [order, setOrder] = useState(orderList || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/orders/detail', {
            params: {
                order_id: id
            }
        });

        console.log(response);

        setModalItem(response.data);
        setModalVisible(true);
    }



    async function handleFinishItem(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.put('/orders/finish', {
            order_id: id
        });

        const response = await apiClient.get('/orders');

        setOrder(response.data);

        setModalVisible(false);
    }

    async function handleRefreshOrders() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/orders');
        setOrder(response.data);
    }


    return (
        <>

            <Head>
                <title>Painel - Sujeiro Pizza</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button onClick={handleRefreshOrders}>
                            <FiRefreshCcw color="3FFFA3" />
                        </button>
                    </div>
                    <article className={styles.listOrder}>

                        {order.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhum pedido aberto foi encontrado...
                            </span>
                        )}
                        {
                            order.map((item) => {


                                return (
                                    <section className={styles.orderItem} key={item.id} >
                                        <button onClick={() => { handleOpenModalView(item.id); }}>
                                            <div className={styles.tag}>
                                            </div>
                                            <span>Mesa {item.table}</span>
                                        </button>
                                    </section>
                                );
                            })
                        }
                    </article>

                </main>
                {modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                        handleFinishOrder={handleFinishItem}
                    />
                )}
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/orders');

    return {
        props: {
            orderList: response.data
        }
    };
});