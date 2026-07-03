export type FlagEnvironment = "production" | "staging" | "dev";
export type FlagStatus = "enabled" | "disabled";

export interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    environment: FlagEnvironment;
    status: FlagStatus;
    owner: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    commandId?: string;
}

