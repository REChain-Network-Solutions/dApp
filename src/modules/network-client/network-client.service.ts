import { HttpAdapter } from "./adapters/http.adapter.ts";
import { WebSocketAdapter } from "./adapters/websocket.adapter.ts";

export class NetworkClientService {
  networkClient;

  constructor(baseUrl: string, useHttpClient = false) {
    if (useHttpClient) {
      this.networkClient = new HttpAdapter(baseUrl);
      return;
    }

    this.networkClient = new WebSocketAdapter(baseUrl);
  }

  async request(data: any): Promise<any> {
    return this.networkClient.request(data);
  }
}
