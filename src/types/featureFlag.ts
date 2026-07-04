export type FlagEnvironment = 'production' | 'staging' | 'dev';
export type FlagStatus = 'enabled' | 'disabled';

export interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    status: FlagStatus;
    environment: FlagEnvironment;
    owner_team_id?: string;
    owner: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}
