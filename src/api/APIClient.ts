import {FeatureFlag, FlagEnvironment, FlagStatus} from "../types/featureFlag.ts";
import {User} from "../types/user.ts";

export class APIClient {
    private static baseURL: string = "http://localhost:8080";

    private static getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    }

    static async getFlags(optionalData?: {
        search?: string,
        environment?: string,
        status?: string
    }): Promise<FeatureFlag[]> {

        const params = new URLSearchParams();

        if (optionalData?.search) {
            params.append("search", optionalData.search);
        }

        if (optionalData?.environment) {
            params.append("environment", optionalData.environment);
        }

        if (optionalData?.status) {
            params.append("status", optionalData.status);
        }

        const response = await fetch(`${this.baseURL}/flags?${params.toString()}`,
            {
                method: "GET",
                headers: this.getAuthHeaders()
            });

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error("Не удалось обработать запрос");

                case 401:
                    throw new Error("Необходимо выполнить вход");

                case 403:
                    throw new Error("У вас нет доступа к списку фич-флагов");

                case 404:
                    throw new Error("Список фич-флагов не найден");

                case 500:
                case 502:
                case 503:
                    throw new Error("Сервис временно недоступен. Попробуйте позже");

                default:
                    throw new Error(`Ошибка ${response.status}`);
            }
        }

        const data = await response.json();

        const flags: FeatureFlag[] = data.map((item:
                                               { id: string;
                                                   name: string;
                                                   description: string;
                                                   environment: string;
                                                   status: string;
                                                   owner: string;
                                                   createdBy: string;
                                                   createdAt: string;
                                                   updatedBy: string;
                                                   updatedAt: string; }) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            environment: item.environment,
            status: item.status,
            owner: item.owner,
            createdBy: item.createdBy,
            createdAt: item.createdAt,
            updatedBy: item.updatedBy,
            updatedAt: item.updatedAt,
        }));

        return flags;
    }

    static async getFlagById(id: string): Promise<FeatureFlag> {
        const response = await fetch(`${this.baseURL}/flags/${id}`,
            {
                method: "GET",
                headers: this.getAuthHeaders()
            });

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error("Не удалось загрузить флаг");

                case 401:
                    throw new Error("Необходимо выполнить вход");

                case 403:
                    throw new Error("У вас нет доступа к  фич-флагу");

                case 404:
                    throw new Error("Фич-флаг не найден");

                case 500:
                case 502:
                case 503:
                    throw new Error("Сервис временно недоступен. Попробуйте позже");

                default:
                    throw new Error(`Ошибка ${response.status}`);
            }
        }
        const data = await response.json();

        const flag: FeatureFlag = {
            id: data.id,
            name: data.name,
            description: data.description,
            environment: data.environment,
            status: data.status,
            owner: data.owner,
            createdBy: data.createdBy,
            createdAt: data.createdAt,
            updatedBy: data.updatedBy,
            updatedAt: data.updatedAt,
            commandId: data. commandId // ПОМЕНЯТЬ, ВОЗМОЖНО КЛЮЧ ДРУГОЙ!!!!
        };

        return flag;
    }

    static async createNewFlag(newFlag: {
        name: string,
        description: string,
        status: string,
        environment: string}): Promise<string> {

        const response = await fetch(`${this.baseURL}/flags`,
            {
                method: "POST",
                headers: this.getAuthHeaders(),
                body: JSON.stringify({
                    name: newFlag.name,
                    description: newFlag.description,
                    status: newFlag.status,
                    environment: newFlag.environment,
                })
            });

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error('Неверный формат данных');
                case 401:
                    throw new Error('Сессия истекла, авторизуйтесь снова');
                case 403:
                    throw new Error('Доступ запрещён');
                case 409:
                    throw new Error('Флаг с таким именем уже существует');
                case 422:
                    throw new Error('Некорректные данные флага');
                case 500:
                case 502:
                case 503:
                    throw new Error('Ошибка сервера, попробуйте позже');
                default:
                    throw new Error(`Неизвестная ошибка: ${response.status}`);
            }
        }

        const data = await response.json();

        return data.id;

    }

    static async updateFlag(id: string, changes: {
        name: string,
        description: string,
        environment: FlagEnvironment,
        status: FlagStatus}
        ): Promise<void> {

        const response = await fetch(`${this.baseURL}/flags/${id}`,
            {
                method: "PUT",
                headers: this.getAuthHeaders(),
                body: JSON.stringify({
                    name: changes.name,
                    description: changes.description,
                    environment: changes.environment,
                    status: changes.status
                })
            });

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error("Запрос содержит некорректные данные");

                case 401:
                    throw new Error("Сессия истекла. Войдите в систему снова");

                case 403:
                    throw new Error("У вас нет прав на изменение этого фич-флага");

                case 404:
                    throw new Error("Фич-флаг не найден");

                case 409:
                    throw new Error("Фич-флаг с таким именем уже существует");

                case 422:
                    throw new Error("Не удалось сохранить изменения. Проверьте введённые данные");

                case 429:
                    throw new Error("Слишком много запросов. Попробуйте позже");

                case 500:
                case 502:
                case 503:
                    throw new Error("Сервис временно недоступен. Попробуйте позже");

                default:
                    throw new Error(`Ошибка ${response.status}`);
            }
        }
    }

    static async turnFlag(id: string, turnOff: boolean): Promise<void> {
        const response = await fetch(`${this.baseURL}/flags/${id}/status`,
            {
                method: "PATCH",
                headers: this.getAuthHeaders(),
                body: JSON.stringify({
                    status: turnOff ? "disabled" : "enabled"
                })
            });

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error('Неверный формат данных');
                case 401:
                    throw new Error('Сессия истекла, авторизуйтесь снова');
                case 403:
                    throw new Error('Доступ запрещён');
                case 404:
                    throw new Error('Флаг не найден');
                case 409:
                    throw new Error('Флаг с таким именем уже существует');
                case 422:
                    throw new Error('Некорректные данные флага');
                case 429:
                    throw new Error('Слишком много попыток, попробуйте позже');
                case 500:
                case 502:
                case 503:
                    throw new Error('Ошибка сервера, попробуйте позже');
                default:
                    throw new Error(`Неизвестная ошибка: ${response.status}`);
            }
        }
    }

    static async login(email: string, password: string): Promise<string> {

        const response = await fetch(`${this.baseURL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error('Неверный формат данных');
                case 401:
                    throw new Error('Неверный email или пароль');
                case 404:
                    throw new Error('Пользователь не найден');
                case 500:
                case 502:
                case 503:
                    throw new Error('Ошибка сервера, попробуйте позже');
                default:
                    throw new Error(`Неизвестная ошибка: ${response.status}`);
            }
        }

        const data = await response.json();

        return data.token;
    }

    static async getMe(): Promise<User> {

        const response = await fetch(`${this.baseURL}/me`,
            {
                method: "GET",
                headers: this.getAuthHeaders()
            });

        if (!response.ok) {

            switch (response.status) {
                case 401:
                    throw new Error('Сессия истекла, авторизуйтесь снова');
                case 403:
                    throw new Error('Доступ запрещён');
                case 404:
                    throw new Error('Пользователь не найден');
                default:
                    throw new Error(`Ошибка: ${response.status}`);
            }
            }

        const data = await response.json();

        const authUser: User = {
            id: data.id,
            name: data.name,
            email: data.email,
            surname: data.surname,
            commandId: data.command
        };

        return authUser;
    }
}