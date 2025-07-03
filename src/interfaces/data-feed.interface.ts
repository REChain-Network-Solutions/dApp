export interface DataFeedParams {
  feed_value?: string | number | boolean;
  min_mci?: number;
  ifseveral?: 'abort' | 'last';
  what?: 'unit' | 'value';
  type?: 'string' | 'auto';
  ifnone?: string | number | boolean;
}
