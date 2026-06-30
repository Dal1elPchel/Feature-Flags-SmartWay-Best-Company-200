import {FeatureFlag} from "../types/featureFlag.ts";
import {User} from "../types/user.ts";
import {authUser, createdFlag, mockFlags, ttoken} from "./mokData.tsx";

export class APIClient {
    private static baseURL: string = "https://api";

    private static getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    }

    static async getFlags(): Promise<FeatureFlag[]> {

        // const response = await fetch(`${this.baseURL}/flags`,
        //     {
        //         method: "GET",
        //         headers: this.getAuthHeaders()
        //     });

        return mockFlags;
    }

    static async createNewFlag(newFlag: {
        name: string,
        description: string,
        status: string,
        environment: string}): Promise<string> {

        // const response = await fetch(`${this.baseURL}/flags`,
        //     {
        //         method: "POST",
        //         headers: this.getAuthHeaders(),
        //         body: JSON.stringify({
        //             name: newFlag.name,
        //             description: newFlag.description,
        //             status: newFlag.status,
        //             environment: newFlag.environment,
        //         })
        //     });
        //
        // if (!response.ok) {
        //     switch (response.status) {
        //         case 400:
        //             throw new Error('Неверный формат данных');
        //         case 401:
        //             throw new Error('Сессия истекла, авторизуйтесь снова');
        //         case 403:
        //             throw new Error('Доступ запрещён');
        //         case 409:
        //             throw new Error('Флаг с таким именем уже существует');
        //         case 422:
        //             throw new Error('Некорректные данные флага');
        //         case 429:
        //             throw new Error('Слишком много попыток, попробуйте позже');
        //         case 500:
        //         case 502:
        //         case 503:
        //             throw new Error('Ошибка сервера, попробуйте позже');
        //         default:
        //             throw new Error(`Неизвестная ошибка: ${response.status}`);
        //     }
        // }
        //
        // const data = await response.json();

        return createdFlag.id;
    }

    static async updateFlag(id: string, changes: {
        name: string,
        description: string,
        environment: string}
        ): Promise<void> {

        //const response = await fetch(`${this.baseURL}/flags${id}`,
        //     {
        //         method: "PUT",
        //         headers: this.getAuthHeaders(),
        //         body: JSON.stringify({
        //             name: changes.name,
        //             description: changes.description,
        //             environment: changes.environment,
        //         })
        //     });
        //
        // if (!response.ok) {
        //     switch (response.status) {
        //         case 400:
        //             throw new Error('Неверный формат данных');
        //         case 401:
        //             throw new Error('Сессия истекла, авторизуйтесь снова');
        //         case 403:
        //             throw new Error('Доступ запрещён');
        //         case 404:
        //             throw new Error('Флаг не найден');
        //         case 409:
        //             throw new Error('Флаг с таким именем уже существует');
        //         case 422:
        //             throw new Error('Некорректные данные флага');
        //         case 429:
        //             throw new Error('Слишком много попыток, попробуйте позже');
        //         case 500:
        //         case 502:
        //         case 503:
        //             throw new Error('Ошибка сервера, попробуйте позже');
        //         default:
        //             throw new Error(`Неизвестная ошибка: ${response.status}`);
        //     }
        // }

        return;
    }

    static async turnFlag(id: string, turnOff: boolean): Promise<void> {
        // const response = await fetch(`${this.baseURL}/flags${id}/status`,
        //     {
        //         method: "PACH",
        //         headers: this.getAuthHeaders(),
        //         body: JSON.stringify({
        //             status: turnOff ? "disabled" : "enabled"
        //         })
        //     });
        //
        // if (!response.ok) {
        //     switch (response.status) {
        //         case 400:
        //             throw new Error('Неверный формат данных');
        //         case 401:
        //             throw new Error('Сессия истекла, авторизуйтесь снова');
        //         case 403:
        //             throw new Error('Доступ запрещён');
        //         case 404:
        //             throw new Error('Флаг не найден');
        //         case 409:
        //             throw new Error('Флаг с таким именем уже существует');
        //         case 422:
        //             throw new Error('Некорректные данные флага');
        //         case 429:
        //             throw new Error('Слишком много попыток, попробуйте позже');
        //         case 500:
        //         case 502:
        //         case 503:
        //             throw new Error('Ошибка сервера, попробуйте позже');
        //         default:
        //             throw new Error(`Неизвестная ошибка: ${response.status}`);
        //     }
        // }

        return;
    }

    static async login(email: string, password: string): Promise<string> {

        // const response = await fetch(`${this.baseURL}/auth/login`,
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             password: password
        //         })
        //     });
        //
        // if (!response.ok) {
        //     switch (response.status) {
        //         case 400:
        //             throw new Error('Неверный формат данных');
        //         case 401:
        //             throw new Error('Неверный email или пароль');
        //         case 403:
        //             throw new Error('Доступ запрещён');
        //         case 404:
        //             throw new Error('Пользователь не найден');
        //         case 429:
        //             throw new Error('Слишком много попыток, попробуйте позже');
        //         case 500:
        //         case 502:
        //         case 503:
        //             throw new Error('Ошибка сервера, попробуйте позже');
        //         default:
        //             throw new Error(`Неизвестная ошибка: ${response.status}`);
        //     }
        // }
        //
        // const data = await response.json();

        return ttoken;
    }

    static async getMe(): Promise<User> {

        // const response = await fetch(`${this.baseURL}/me`,
        //     {
        //         method: "GET",
        //         headers: this.getAuthHeaders()
        //     });
        //
        // if (!response.ok) {
        //
        //     switch (response.status) {
        //         case 401:
        //             throw new Error('Сессия истекла, авторизуйтесь снова');
        //         case 403:
        //             throw new Error('Доступ запрещён');
        //         case 404:
        //             throw new Error('Пользователь не найден');
        //         default:
        //             throw new Error(`Ошибка: ${response.status}`);
        //     }
        //     }
        //
        // const data = await response.json();

        // const authUser: User = {
        //     id: data.id,
        //     name: data.name,
        //     email: data.email,
        //     surname: data.surname
        // };

        return authUser;
    }
}