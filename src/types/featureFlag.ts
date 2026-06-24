export type FlagEnvironment = "production" | "staging" | "development";
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
}

