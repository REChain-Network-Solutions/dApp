export abstract class BaseAdapter {
  abstract request(data: any): Promise<any>;
}
