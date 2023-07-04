import { AuctionInterface } from 'interfaces/auction';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AuctioneerInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  auction?: AuctionInterface[];
  user?: UserInterface;
  _count?: {
    auction?: number;
  };
}

export interface AuctioneerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
