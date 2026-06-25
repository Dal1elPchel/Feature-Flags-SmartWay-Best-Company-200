import {FeatureFlag} from "../types/featureFlag.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {APIClient} from "../api/APIClient.ts";
import userStore from "./UserStore.ts"

class FeatureFlagStore {
    flags: FeatureFlag[] = [];
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    private startLoading(): void {
        this.isLoading = true;
        this.error = null;
    }

    private stopLoading(): void {
        this.isLoading = false;
    }

    async loadFlags() {
        this.startLoading();

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
                this.stopLoading();
            });
        }
    }

    async createNew(newFlag: {name: string, description: string,
        env: string, status: string}) {
        this.startLoading();

        try {
            if (userStore.currentUser) {
                const owner = userStore.currentUser.id;
                const data = await APIClient.createNewFlag(newFlag, owner);
                runInAction(() => {
                    this.flags.push(data);
                });
            }
        } catch (e) {
            runInAction(() => {
                this.error = "Не удалось создать флаг, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async update(id: string, changes: Partial<FeatureFlag>) {
        this.startLoading();

        try {
            const data = await APIClient.updateFlag(id, changes);
            runInAction(() => {
                var index = this.flags.
                findIndex(item => item.id === id);
                if (index !== -1) this.flags[index] = data;
            });
        } catch (e) {
            runInAction(() => {
                this.error = "Не удалось обновить флаг, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async turn(id: string, turnOff: boolean) {
        this.startLoading();

        try {
            await APIClient.turnFlag(id, turnOff);
            runInAction(() => {
                const currentFlag= this.flags.
                find(item => item.id === id);

                if (currentFlag) {
                    currentFlag.status = turnOff ?
                        "disabled" : "enabled";
                }
            });
        } catch (e) {
            runInAction(() => {
                this.error = `Не удалось ${turnOff ? "выключить" : "включить"} флаг, попробуйте позже`;
            });
        }
        finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }
}

export default new FeatureFlagStore();