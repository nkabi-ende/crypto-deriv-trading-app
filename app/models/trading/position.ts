import { Observable } from '@nativescript/core';

export enum PositionSide {
  LONG = 'LONG',
  SHORT = 'SHORT'
}

export class Position extends Observable {
  constructor(
    public symbol: string,
    public side: PositionSide,
    public leverage: number,
    public entryPrice: number,
    public size: number,
    public liquidationPrice: number
  ) {
    super();
  }

  get unrealizedPnL(): number {
    // Basic PnL calculation - this should be enhanced with proper mark price
    const currentPrice = this.getCurrentPrice();
    if (this.side === PositionSide.LONG) {
      return (currentPrice - this.entryPrice) * this.size * this.leverage;
    }
    return (this.entryPrice - currentPrice) * this.size * this.leverage;
  }

  private getCurrentPrice(): number {
    // TODO: Implement real price fetching from API
    return this.entryPrice; // Placeholder
  }
}