import {FeatureFlag} from "../types/featureFlag.ts";
import {User} from "../types/user.ts";

export class APIClient {
    private static baseURL: string = "https://api";

    static async getFlags(): Promise<FeatureFlag[]> {
        return [
            {
                id: "1",
                name: "beta_profile",
                description: "Бета-версия профиля пользователя",
                environment: "production",
                status: "enabled",
                owner: "Core team",
                createdAt: "2024-05-22T16:45:00",
                createdBy: "Дмитрий Волков",
                updatedAt: "2024-05-24T14:32:00",
                updatedBy: "Алексей Кузнецов",
            },
        ];
    }

    static async createNewFlag(newFlag: {name: string, description: string,
    env: string, status: string}, owner: string): Promise<FeatureFlag> {
        throw new Error("не сделано");
    }

    static async updateFlag(id: string, changes: Partial<FeatureFlag>): Promise<FeatureFlag> {
        throw new Error("не сделано");
    }

    static async turnFlag(id: string, turnOff: boolean): Promise<void> {
        throw new Error("не сделано");
    }

    static async login(email: string, password: string): Promise<User> {
        throw new Error("не сделано");
    }
}