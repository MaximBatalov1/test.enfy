import {StatusCircle} from "./StatusCircle.jsx";

export const TaskCard = ({ task }) => {
    if (!task) {
        return <p>Нет задач для этой сделки...</p>;
    }

    const { id, text, complete_till } = task;

    return (
        <div className="card">
            <ul className="card-items">
                <li>ID: {id}</li>
                <li>Название задачи: {text}</li>
                <li>Дата завершения: {new Date(complete_till * 1000).toLocaleDateString()}</li>
                <li>
                    Статус: <StatusCircle timestamp={complete_till * 1000} />
                </li>
            </ul>
        </div>
    );
};