import {accessToken, subdomain} from "./constant.js";

const fetchOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
};

export const getDeals = async (url) => {
    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`Ошибка при запросе: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const getDealInfo = async (id) => {
    try {
        console.log("ID DEAL: ", id)
        const response = await fetch(`https://${subdomain}.amocrm.ru/api/v4/tasks?filter[entity_id]=${id}&filter[entity_type]=leads`, fetchOptions);

        const data = await response.json();
        console.log('DEAL_INFO: ', data)
        return data;
    } catch (error) {
        console.error('Не удалось получить инфу по сделке', error.message);
    }
};