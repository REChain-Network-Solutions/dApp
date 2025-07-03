import { Joint } from "./joint.interface.ts";

export interface ErrorResponse {
    error: string
}

export type JointResponse = Joint

export type DefinitionResponse = Array<any>

export interface DefinitionsResponse {
    [address: string]: DefinitionResponse
}


export type DefinitionAAResponse = ['autonomous agent', any]


export interface AasBasedByAAsResponse {
    address: string
    definition: DefinitionAAResponse
    unit: string
    creation_date: string
}

export interface StateVarsResponse {
    [key: string]: any
}

export interface aasBasedByAAsWithVarsResponse {
    address: string
    definition: DefinitionAAResponse
    unit: string
    creation_date: string
    stateVars: StateVarsResponse
}

export interface BalancesResponse {
    [address: string]: {
        [asset: 'base' | string]: {
            stable: number
            pending: number
            stable_outputs_count: number
            pending_outputs_count: number
            total: number
        }
    }
}

export interface AssetMetadataResponse {
    metadata_unit: string
    registry_address: string
    suffix: null | string
    asset: string
    name: string
    decimals: number
}

export interface AssetsMetadataResponse {
    [asset: string]: AssetMetadataResponse
}

export type AssetBySymbolResponse = string;

export interface AssetBySymbolsResponse {
    [symbol: string]: AssetBySymbolResponse
}
