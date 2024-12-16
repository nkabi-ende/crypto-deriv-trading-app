import { EventData, Page } from '@nativescript/core';
import { TradingViewModel } from './views/trading/trading-view-model';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new TradingViewModel();
}