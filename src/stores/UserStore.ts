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

    private restoreUser() {
        const savedUser = localStorage.getItem("user");
        if (savedUser) this.currentUser = JSON.parse(savedUser);
    }

    async loginUser(email: string, password: string) {
        this.loading = true;
        this.error = null;

        try {
            const data = await APIClient.login(email, password);
            runInAction(() => {
                this.currentUser = data;
            });

            localStorage.setItem("user", JSON.stringify(this.currentUser));

        } catch (e) {
            runInAction(() => this.error = "Не удалось войти в систему.");
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem("user");
    }

    get isAuth() {
        return this.currentUser !== null;
    }
}

export default new UserStore();