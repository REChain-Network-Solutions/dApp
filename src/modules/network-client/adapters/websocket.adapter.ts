import { BaseAdapter } from "./base.adapter.ts";
import { getTag, sleep } from "../../../utils/utils.ts";
import { kvFunction } from "../../../interfaces/kv.interface.ts";
import { WebSocketState } from "../../../enum/ws-state.enum.ts";

// ToDo: area for improving, put in constructor?
let WebSocket: new (url: string) => any;
if (typeof window !== 'undefined') {
  ({WebSocket} = window);
} else {
  // eslint-disable-line global-require
  WebSocket = require('ws');
}

export class WebSocketAdapter implements BaseAdapter {
  readonly #baseUrl: string;

  #ws: any;
  #queue = [];
  #tagToHandler: kvFunction = {};

  constructor(baseUrl: string) {
    if (baseUrl.startsWith('http://') || baseUrl.startsWith('https://')) {
      baseUrl = baseUrl.replace('http://', 'ws://')
          .replace('https://', 'wss://');
    }
    this.#baseUrl = baseUrl;

    this.#connectWebSocket();
  }

  #connectWebSocket() {
    this.#ws = new WebSocket(`${this.#baseUrl}/ws`);
    this.#ws.addEventListener('open', this.#openHandler.bind(this));
    this.#ws.addEventListener('message', this.#messageHandler.bind(this));
    this.#ws.addEventListener('error', (err: { code: string; }) => {
      console.log('[WS] Error Code: ', err.code);
    })
    this.#ws.addEventListener('close', async () => {
      await sleep(3000);
      this.#connectWebSocket();
    });
  }

  #openHandler() {
    this.#queue.forEach((msg) => {
      this.#ws.send(JSON.stringify(msg));
    });

    this.#queue = [];
  }

  #messageHandler(event: { data: string }) {
    const data = JSON.parse(event.data);
    const id = data.id;

    if (this.#tagToHandler[id]) {
      if (data.error) {
        this.#tagToHandler[id].reject({
          method: this.#tagToHandler[id].method,
          error: data.error,
        });
      } else {
        this.#tagToHandler[id].resolve(data.result);
      }

      delete this.#tagToHandler[id];
    }
  }

  async #checkReady() {
    if (this.#ws.readyState === WebSocketState.OPEN) {
      return true
    }

    while (true) {
      if (this.#ws.readyState === WebSocketState.OPEN) {
        return true;
      }

      if (this.#ws.readyState === WebSocketState.CLOSING || this.#ws.readyState === WebSocketState.CLOSED) {
        return false;
      }

      await sleep(5); // if still not ready(connecting), wait 5ms
    }
  }

  async request(data: any): Promise<any> {
    const ready = await this.#checkReady();

    const id = getTag();
    const msg = {
      id,
      ...data
    }

    if (!ready) {
      // @ts-ignore
      this.#queue.push(msg);
      return new Promise((resolve, reject) => {
        this.#tagToHandler[id] = { resolve, reject, method: data.type };
      });
    }

    this.#ws.send(JSON.stringify(msg));

    return new Promise((resolve, reject) => {
      this.#tagToHandler[id] = { resolve, reject, method: data.type };
    });
  }
}
