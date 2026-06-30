import {FeatureFlag} from "../types/featureFlag.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {APIClient} from "../api/APIClient.ts";

class FeatureFlagStore {
    flags: FeatureFlag[] = [];
    currentFlag: FeatureFlag | null = null;
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
                this.error = e instanceof Error ? e.message : "Не удалось загрузить флаги, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async loadFlag(id: string) {
        this.startLoading();

        try {
            if (this.flags.length === 0) {
                const data = await APIClient.getFlags();
                runInAction(() => {
                    this.flags = data;
                });
            }
            runInAction(() => {
                this.currentFlag = this.flags.find(f => f.id === id) ?? null;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Не удалось загрузить флаг, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async createNew(newFlag: {
        name: string,
        description: string,
        status: string,
        environment: string}) {
        this.startLoading();

        try {
            const id = await APIClient.createNewFlag(newFlag);
            const data = await APIClient.getFlags();
            runInAction(() => {
                this.flags = data;
            });
            return id;
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Не удалось создать флаг, попробуйте позже";
            });
        }
        finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async update(id: string, changes: {
        name: string,
        description: string,
        environment: string
    }) {
        this.startLoading();

        try {
            await APIClient.updateFlag(id, changes);
            const data = await APIClient.getFlags();
            runInAction(() => {
                this.flags = data;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Не удалось обновить флаг, попробуйте позже";
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
                this.error = e instanceof Error ? e.message : `Не удалось ${turnOff ? "выключить" : "включить"} флаг, попробуйте позже`;
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