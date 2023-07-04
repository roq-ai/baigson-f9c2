import axios from 'axios';
import queryString from 'query-string';
import { AuctioneerInterface, AuctioneerGetQueryInterface } from 'interfaces/auctioneer';
import { GetQueryInterface } from '../../interfaces';

export const getAuctioneers = async (query?: AuctioneerGetQueryInterface) => {
  const response = await axios.get(`/api/auctioneers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAuctioneer = async (auctioneer: AuctioneerInterface) => {
  const response = await axios.post('/api/auctioneers', auctioneer);
  return response.data;
};

export const updateAuctioneerById = async (id: string, auctioneer: AuctioneerInterface) => {
  const response = await axios.put(`/api/auctioneers/${id}`, auctioneer);
  return response.data;
};

export const getAuctioneerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/auctioneers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAuctioneerById = async (id: string) => {
  const response = await axios.delete(`/api/auctioneers/${id}`);
  return response.data;
};
