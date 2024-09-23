import { useState, useEffect } from 'react';
import {subdomain} from "../utils/constant.js";
import {getDealInfo, getDeals} from "../utils/index.js";
import {TaskCard} from "./components/TaskCard.jsx";


export const DealsTable = () => {
    const [deals, setDeals] = useState([]);
    const [loadingDeals, setLoadingDeals] = useState(true);
    const [loadingTask, setLoadingTask] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [task, setTask] = useState(null);

    const startUrl = `https://${subdomain}.amocrm.ru/api/v4/leads?page=1`;

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const data = await getDeals(startUrl);
                console.log(data)
                setDeals(data._embedded.leads);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingDeals(false);
            }
        };

        fetchDeals();
    }, []);

    useEffect(() => {
        console.log('TASKA:', task)
    }, [task]);

    const handleDealClick = async (id) => {
        setSelectedDeal(id);
        setLoadingTask(true);
        try {
            const data = await getDealInfo(id);
            console.log('SET_TASK:', data?._embedded?.tasks[0])
            setTask(data?._embedded?.tasks[0] || null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingTask(false);
        }
    };

    if (loadingDeals) {
        return <div>Загрузка сделок...</div>;
    }

    if (error) {
        return <div>Не удалось загрузить сделки: {error}</div>;
    }

    return (
        <div className="container">
            <h1>Тестовое задание</h1>
            <table className="cards">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Бюджет</th>
                </tr>
                </thead>
                <tbody>
                {deals.map((deal) => (
                    <tr key={deal.id} onClick={() => handleDealClick(deal.id)}>
                        <td>{deal.id}</td>
                        <td>{deal.name}</td>
                        <td>{deal.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedDeal && (
                <div>
                    <h2>Информация по сделке {selectedDeal}</h2>
                    {loadingTask ? <p>Загрузка задачи...</p> : <TaskCard task={task} />}
                </div>
            )}
        </div>
    );
};

export default DealsTable;
