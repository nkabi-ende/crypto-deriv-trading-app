import { Observable } from '@nativescript/core';

export class PriceService extends Observable {
  private websocket: any;
  private prices: Map<string, number> = new Map();

  constructor() {
    super();
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    // TODO: Implement real websocket connection to price feed
    // This is a placeholder for demo purposes
    setInterval(() => {
      this.simulatePriceUpdate();
    }, 1000);
  }

  private simulatePriceUpdate() {
    // Simulate price updates for demo
    const symbols = ['BTC-USDT', 'ETH-USDT', 'DOGE-USDT'];
    symbols.forEach(symbol => {
      const currentPrice = this.prices.get(symbol) || 100;
      const newPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.002);
      this.prices.set(symbol, newPrice);
      this.notifyPropertyChange(symbol, newPrice);
    });
  }

  public getPrice(symbol: string): number {
    return this.prices.get(symbol) || 0;
  }
}