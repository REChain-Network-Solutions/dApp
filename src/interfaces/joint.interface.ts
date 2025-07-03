export interface Joint {
  unit: Unit
  ball: string
  skiplist_units: string[]
}

export interface Unit {
  version: string
  alt: string
  messages: Message[]
  authors: Author[]
  parent_units: string[]
  last_ball: string
  last_ball_unit: string
  timestamp: number
  witness_list_unit: string
  headers_commission: number
  payload_commission: number
  unit: string
  main_chain_index: number
}

export interface Message {
  app: string
  payload_location: string
  payload_hash: string
  payload: Payload
}

export interface Payload {
  inputs?: Input[]
  outputs?: Output[]

  [key: string]: any;
}

export interface Input {
  unit: string
  message_index: number
  output_index: number
}

export interface Output {
  address: string
  amount: number
}

export interface Author {
  address: string
  authentifiers: Authentifiers
}

export interface Authentifiers {
  r: string
}
