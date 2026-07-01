import {User} from "../types/user.ts"
import {APIClient} from "../api/APIClient.ts";
import {makeAutoObservable, runInAction} from "mobx";

class UserStore {
    currentUser: User | null = null;
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.restoreUser();
    }

    private async restoreUser() {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const user = await APIClient.getMe();
            runInAction(() => this.currentUser = user);
        } catch {
            localStorage.removeItem("token");
        }
    }

    async loginUser(email: string, password: string) {
        this.loading = true;
        this.error = null;

        try {
            const token = await APIClient.login(email, password);
            localStorage.setItem("token", token);

            const data = await APIClient.getMe();
            runInAction(() => {
                this.currentUser = data;
            });

        } catch (e) {
            runInAction(() => this.error =
                e instanceof Error ? e.message : "Не удалось войти в систему.");
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem("token");
    }

    get isAuth() {
        return this.currentUser !== null;
    }

    setErrorNull() {
        this.error = null;
    }
}

export default new UserStore();