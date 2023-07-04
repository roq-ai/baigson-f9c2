import { ItemInterface } from 'interfaces/item';
import { AuctioneerInterface } from 'interfaces/auctioneer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AuctionInterface {
  id?: string;
  name: string;
  auctioneer_id?: string;
  inventory_specialist_id?: string;
  created_at?: any;
  updated_at?: any;
  item?: ItemInterface[];
  auctioneer?: AuctioneerInterface;
  user?: UserInterface;
  _count?: {
    item?: number;
  };
}

export interface AuctionGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  auctioneer_id?: string;
  inventory_specialist_id?: string;
}
