import {FeatureFlag} from "../types/featureFlag.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {APIClient} from "../api/APIClient.ts";

class FeatureFlagStore {
    flags: FeatureFlag[] = [];
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async loadFlags() {
        this.isLoading = true;
        this.error = null;

        try {
            const data = await APIClient.getFlags();
            runInAction(() => {
                this.flags = data;
            });
        } catch (e) {
            runInAction(() => {
                this.error = "Не удалось загрузить флаги, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async createNew(newFlag: FeatureFlag) {
        this.isLoading = true;
        this.error = null;

        try {
            const data = await APIClient.createNewFlag(newFlag);
            runInAction(() => {
                if (data === true) {
                    this.flags.push(newFlag);
                }
            });
        } catch (e) {
            runInAction(() => {
                this.error = "Не удалось загрузить флаги, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async update(id: string, changes: Partial<FeatureFlag>) {
        this.isLoading = true;
        this.error = null;

        try {
            const data = await APIClient.updateFlag(id, changes);
            runInAction(() => {
                this.flags = this.flags.
                filter(item => item.id !== id);
                this.flags.push(data);
            });
        } catch (e) {
            runInAction(() => {
                this.error = "Не удалось загрузить флаги, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async turn(id: string, turnOff: boolean) {
        this.isLoading = true;
        this.error = null;

        try {
            await APIClient.turnFlag(id, turnOff);
            runInAction(() => {
                const currentFlag= this.flags.
                find(item => item.id === id);

                currentFlag?.status = currentFlag?.status === "enabled" ?
                    "disabled" : "enabled";
            });
        } catch (e) {
            runInAction(() => {
                this.error = "Не удалось загрузить флаги, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}

export default new FeatureFlagStore();