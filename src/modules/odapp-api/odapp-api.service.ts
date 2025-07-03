import { DataFeedParams } from "../../interfaces/data-feed.interface.ts";
import type {
  AasBasedByAAsResponse,
  aasBasedByAAsWithVarsResponse,
  AssetBySymbolResponse,
  AssetBySymbolsResponse,
  AssetMetadataResponse,
  AssetsMetadataResponse,
  BalancesResponse,
  DefinitionResponse,
  DefinitionsResponse,
  ErrorResponse,
  JointResponse,
  StateVarsResponse
} from "../../interfaces/client-responses.interface.ts";
import { NetworkClientService } from "../network-client/network-client.service.ts";
import {ExecuteGetterParams} from "../../interfaces/executeGetter.interface.ts";

/**
 * Initializes a new instance of the ODappApiService.
 *
 * @param {string} [baseUrl] - The base URL for the network client service.
 * @param {boolean} [useRestClient] - Optional flag to determine whether to use a REST client. Defaults to false.
 */
export default class ODappApiService {
  private networkClientService: NetworkClientService;

  constructor(baseUrl: string, useRestClient = false) {
    if (!baseUrl) {
      baseUrl = 'https://api.rechain.network/odapp';
    }

    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    
    this.networkClientService = new NetworkClientService(baseUrl, useRestClient);
  }

  getJoint(unit: string): Promise<JointResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getJoint',
      unit,
    }) as Promise<JointResponse | ErrorResponse>;
  }

  getJoints(units: string[]): Promise<JointResponse[] | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getJoints',
      units,
    }) as Promise<JointResponse[] | ErrorResponse>;
  }

  getDefinition(address: string): Promise<DefinitionResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getDefinition',
      address,
    }) as Promise<DefinitionResponse | ErrorResponse>;
  }

  getDefinitions(addresses: string[]): Promise<DefinitionsResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getDefinitions',
      addresses,
    }) as Promise<DefinitionsResponse | ErrorResponse>;
  }

  getAAsByBaseAAs(baseAAs: string | string[]): Promise<AasBasedByAAsResponse[] | ErrorResponse> {
    if (typeof baseAAs === 'string') {
      baseAAs = [baseAAs];
    }

    return this.networkClientService.request({
      type: 'getAAsByBaseAAs',
      baseAAs,
    }) as Promise<AasBasedByAAsResponse[] | ErrorResponse>;
  }

  getAAsByBaseAAsWithVars(baseAAs: string | string[]): Promise<aasBasedByAAsWithVarsResponse[] | ErrorResponse> {
    if (typeof baseAAs === 'string') {
      baseAAs = [baseAAs];
    }

    return this.networkClientService.request({
      type: 'getAAsByBaseAAsWithVars',
      baseAAs,
    }) as Promise<aasBasedByAAsWithVarsResponse[] | ErrorResponse>;
  }

  getBalances(addresses: string | string[]): Promise<BalancesResponse | ErrorResponse> {
    if (typeof addresses === 'string') {
      addresses = [addresses];
    }

    return this.networkClientService.request({
      type: 'getBalances',
      addresses,
    }) as Promise<BalancesResponse | ErrorResponse>;
  }

  getAAsStateVars(aas: string[], startWith?: string, endWith?: string): Promise<StateVarsResponse[] | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAAsStateVars',
      aas,
      startWith,
      endWith,
    }) as Promise<StateVarsResponse[] | ErrorResponse>;
  }

  getAAStateVars(aa: string, startWith?: string, endWith?: string): Promise<StateVarsResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAAStateVars',
      aa,
      startWith,
      endWith,
    }) as Promise<StateVarsResponse | ErrorResponse>;
  }

  getAAStateVar(aa: string, varName: string): Promise<number | string | boolean | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAAStateVar',
      aa,
      varName,
    }) as Promise<number | string | boolean | ErrorResponse>;
  }

  getDataFeed(oracles: string | string[], feedName: string, otherParams: DataFeedParams = {}): Promise<string | number | ErrorResponse> {
    if (typeof oracles === 'string') {
      oracles = [oracles];
    }

    return this.networkClientService.request({
      type: 'getDataFeed',
      params: {
        oracles,
        feed_name: feedName,
        ...otherParams,
      },
    }) as Promise<string | number | ErrorResponse>;
  }

  getAssetMetadata(asset: string): Promise<AssetMetadataResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetMetadata',
      asset,
    }) as Promise<AssetMetadataResponse | ErrorResponse>;
  }

  getAssetsMetadata(assets: string[]): Promise<AssetsMetadataResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetsMetadata',
      assets,
    }) as Promise<AssetsMetadataResponse | ErrorResponse>;
  }

  getAssetBySymbol(symbol: string, registryAddress?: string): Promise<AssetBySymbolResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetBySymbol',
      symbol,
      registryAddress,
    }) as Promise<AssetBySymbolResponse | ErrorResponse>;
  }

  getAssetBySymbols(symbols: string[], registryAddress?: string): Promise<AssetBySymbolsResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetBySymbols',
      symbols,
      registryAddress,
    }) as Promise<AssetBySymbolsResponse | ErrorResponse>;
  }

  executeGetter(params: ExecuteGetterParams): Promise<any | ErrorResponse> {
    return this.networkClientService.request({
      type: 'executeGetter',
      ...params,
    });
  }
}
