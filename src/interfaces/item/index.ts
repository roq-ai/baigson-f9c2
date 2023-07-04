import { AuctionInterface } from 'interfaces/auction';
import { GetQueryInterface } from 'interfaces';

export interface ItemInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  auction_id?: string;
  created_at?: any;
  updated_at?: any;

  auction?: AuctionInterface;
  _count?: {};
}

export interface ItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  auction_id?: string;
}
