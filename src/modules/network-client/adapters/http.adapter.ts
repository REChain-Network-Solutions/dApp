import { BaseAdapter } from "./base.adapter.ts";

// ToDo: area for improving, put in constructor?
let fetch: any;
if (typeof window !== 'undefined') {
  ({fetch} = window);
} else {
  fetch = require('node-fetch');
}

export class HttpAdapter implements BaseAdapter {
  readonly #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async request(data: any): Promise<any> {
    const result = await fetch(`${this.#baseUrl}/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const r = await result.json();
    if (r.error) {
      return Promise.reject({
        method: data.type,
        error: r.error,
      }); 
    }
    
    return r;
  }
}
