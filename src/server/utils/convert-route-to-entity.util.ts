const mapping: Record<string, string> = {
  auctions: 'auction',
  auctioneers: 'auctioneer',
  items: 'item',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
