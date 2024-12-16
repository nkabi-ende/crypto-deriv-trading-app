import { Observable } from '@nativescript/core';
import { PriceService } from '../../services/api/priceService';
import { OrderService, OrderType, OrderSide } from '../../services/trading/orderService';
import { Position, PositionSide } from '../../models/trading/position';

export class TradingViewModel extends Observable {
  private priceService: PriceService;
  private orderService: OrderService;
  
  private _positions: Position[] = [];
  private _symbol: string = 'BTC-USDT';
  private _amount: number = 0;
  private _leverage: number = 1;
  private _stopLoss: number = 0;

  constructor() {
    super();
    this.priceService = new PriceService();
    this.orderService = new OrderService();
    
    // Update prices every second
    setInterval(() => {
      this.notifyPropertyChange('btcPrice', this.btcPrice);
      this.notifyPropertyChange('ethPrice', this.ethPrice);
      this.notifyPropertyChange('dogePrice', this.dogePrice);
    }, 1000);
  }

  get positions(): Position[] {
    return this._positions;
  }

  get btcPrice(): string {
    return `BTC: $${this.priceService.getPrice('BTC-USDT').toFixed(2)}`;
  }

  get ethPrice(): string {
    return `ETH: $${this.priceService.getPrice('ETH-USDT').toFixed(2)}`;
  }

  get dogePrice(): string {
    return `DOGE: $${this.priceService.getPrice('DOGE-USDT').toFixed(4)}`;
  }

  async onLongTap() {
    await this.placeOrder(OrderSide.BUY);
  }

  async onShortTap() {
    await this.placeOrder(OrderSide.SELL);
  }

  private async placeOrder(side: OrderSide) {
    const order = {
      symbol: this._symbol,
      type: OrderType.MARKET,
      side: side,
      quantity: this._amount,
      leverage: this._leverage
    };

    const success = await this.orderService.placeOrder(order);
    if (success) {
      // Add position to the list
      const position = new Position(
        this._symbol,
        side === OrderSide.BUY ? PositionSide.LONG : PositionSide.SHORT,
        this._leverage,
        this.priceService.getPrice(this._symbol),
        this._amount,
        this._stopLoss
      );
      this._positions.push(position);
      this.notifyPropertyChange('positions', this._positions);
    }
  }
}