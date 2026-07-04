import { FeatureFlag, FlagEnvironment, FlagStatus } from '../types/featureFlag.ts';
import { makeAutoObservable, runInAction } from 'mobx';
import { APIClient } from '../api/APIClient.ts';

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

    async loadFlags(optionalData?: {
        search?: string;
        environment?: string;
        status?: string;
        team?: string;
    }) {
        this.startLoading();

        try {
            const data = await APIClient.getFlags(optionalData);
            runInAction(() => {
                this.flags = data;
            });
        } catch (e) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : 'Не удалось загрузить флаги, попробуйте позже';
            });
        } finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async loadFlag(id: string) {
        this.startLoading();

        try {
            const data = await APIClient.getFlagById(id);
            runInAction(() => {
                this.currentFlag = data;
            });
        } catch (e) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : 'Не удалось загрузить флаг, попробуйте позже';
            });
        } finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async createNew(newFlag: {
        name: string;
        description: string;
        status: string;
        environment: string;
    }) {
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
                this.error =
                    e instanceof Error ? e.message : 'Не удалось создать флаг, попробуйте позже';
            });
        } finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async update(
        id: string,
        changes: {
            name: string;
            description: string;
            environment: FlagEnvironment;
            status: FlagStatus;
        },
    ) {
        this.startLoading();

        try {
            await APIClient.updateFlag(id, changes);
            const data = await APIClient.getFlagById(id);
            runInAction(() => {
                this.currentFlag = data;
            });
        } catch (e) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : 'Не удалось обновить флаг, попробуйте позже';
            });
        } finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    async turn(id: string, turnOff: boolean) {
        this.startLoading();

        try {
            await APIClient.turnFlag(id, turnOff);
            const data = await APIClient.getFlagById(id);
            runInAction(() => {
                this.currentFlag = data;
            });
        } catch (e) {
            runInAction(() => {
                this.error =
                    e instanceof Error
                        ? e.message
                        : `Не удалось ${turnOff ? 'выключить' : 'включить'} флаг, попробуйте позже`;
            });
        } finally {
            runInAction(() => {
                this.stopLoading();
            });
        }
    }

    setErrorNull() {
        this.error = null;
    }
}

export default new FeatureFlagStore();
