// app/exchange/page.tsx
'use client';

import { useState } from 'react';
import { ConnectButton } from '@mysten/wallet-kit';

// Tipos básicos (puedes expandirlos)
type TradePair = 'DRX/DXC' | 'DXC/DUSD' | 'DUSD/USDT';

type OrderBookEntry = {
  price: number;
  amount: number;
  total: number;
  type: 'bid' | 'ask';
};

type Trade = {
  time: string;
  price: number;
  amount: number;
  side: 'buy' | 'sell';
};

export default function ExchangePage() {
  const [activePair, setActivePair] = useState<TradePair>('DRX/DXC');
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  
  // Ejemplo de datos (reemplaza con llamadas a Sui/contratos)
  const mockOrderBook: OrderBookEntry[] = [
    { price: 2.34, amount: 150.5, total: 352.17, type: 'bid' },
    { price: 2.33, amount: 200.0, total: 466.0, type: 'bid' },
    { price: 2.32, amount: 120.0, total: 278.4, type: 'bid' },
    { price: 2.35, amount: 180.2, total: 423.47, type: 'ask' },
    { price: 2.36, amount: 90.5, total: 213.58, type: 'ask' },
    { price: 2.37, amount: 250.0, total: 592.5, type: 'ask' },
  ];

  const mockTrades: Trade[] = [
    { time: '18:01:05', price: 370.5, amount: 10.2, side: 'buy' },
    { time: '18:00:45', price: 370.2, amount: 5.5, side: 'sell' },
    { time: '18:00:21', price: 370.8, amount: 12.0, side: 'buy' },
  ];

  // Estado del formulario
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const total = price && amount ? (parseFloat(price) * parseFloat(amount)).toFixed(2) : '';

  const handleBuy = () => {
    if (!price || !amount) return;
    alert(`Buy ${amount} DRX at ${price} DXC`);
    // Aquí irá la lógica de Sui (call a contrato)
  };

  const handleSell = () => {
    if (!price || !amount) return;
    alert(`Sell ${amount} DRX at ${price} DXC`);
    // Aquí irá la lógica de Sui
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">
        Crypto Exchange
      </h1>

      {/* Tabs de pares */}
      <div className="flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground mb-6">
        {(['DRX/DXC', 'DXC/DUSD', 'DUSD/USDT'] as const).map((pair) => (
          <button
            key={pair}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${
              activePair === pair ? 'bg-background text-foreground shadow-sm' : ''
            }`}
            onClick={() => setActivePair(pair as TradePair)}
          >
            {pair}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel izquierdo: gráfico + order book + trades */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gráfico de precios */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="text-2xl font-semibold leading-none tracking-tight font-headline">
                {activePair} Price Chart
              </div>
              <div className="text-sm text-muted-foreground">Last 24 hours</div>
            </div>
            <div className="p-6 pt-0 h-64 flex items-center justify-center bg-muted rounded-b-lg">
              {/* Copilot puede ayudarte a integrar recharts o un gráfico real */}
              <span className="text-muted-foreground">Price chart (to be implemented)</span>
            </div>
          </div>

          {/* Order Book + Recent Trades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Book */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold tracking-tight font-headline text-lg">Order Book</div>
              </div>
              <div className="p-6 pt-0 overflow-auto max-h-80">
                <table className="w-full text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium text-green-500">
                        Price ({activePair.split('/')[1]})
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Amount ({activePair.split('/')[0]})
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Total ({activePair.split('/')[1]})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {mockOrderBook
                      .filter((o) => o.type === 'bid')
                      .map((order, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="p-2 align-middle text-green-500">{order.price}</td>
                          <td className="p-2 align-middle">{order.amount}</td>
                          <td className="p-2 align-middle">{order.total}</td>
                        </tr>
                      ))}
                    <tr className="border-b">
                      <td colSpan={3} className="p-2 text-center font-bold h-10">
                        Spread
                      </td>
                    </tr>
                    {mockOrderBook
                      .filter((o) => o.type === 'ask')
                      .map((order, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="p-2 align-middle text-red-500">{order.price}</td>
                          <td className="p-2 align-middle">{order.amount}</td>
                          <td className="p-2 align-middle">{order.total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold tracking-tight font-headline text-lg">
                  Recent Trades
                </div>
              </div>
              <div className="p-6 pt-0 overflow-auto max-h-80">
                <table className="w-full text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Time
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Price ({activePair.split('/')[1]})
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Amount ({activePair.split('/')[0]})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {mockTrades.map((trade, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="p-2 align-middle">{trade.time}</td>
                        <td
                          className={`p-2 align-middle ${
                            trade.side === 'buy' ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {trade.price}
                        </td>
                        <td className="p-2 align-middle">{trade.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho: formulario de trading */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="text-2xl font-semibold leading-none tracking-tight font-headline">
                Trade {activePair.split('/')[0]}
              </div>
            </div>
            <div className="p-6 pt-0">
              {/* Tabs Buy/Sell */}
              <div className="grid grid-cols-2 gap-1 mb-4 bg-muted p-1 rounded-md">
                <button
                  className={`py-2 text-sm font-medium rounded-sm transition-colors ${
                    activeTab === 'buy'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setActiveTab('buy')}
                >
                  Buy
                </button>
                <button
                  className={`py-2 text-sm font-medium rounded-sm transition-colors ${
                    activeTab === 'sell'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setActiveTab('sell')}
                >
                  Sell
                </button>
              </div>

              {/* Formulario */}
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="price">
                    Price ({activePair.split('/')[1]})
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price in DXC"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="amount">
                    Amount ({activePair.split('/')[0]})
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount in DRX"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="total">
                    Total ({activePair.split('/')[1]})
                  </label>
                  <input
                    id="total"
                    type="text"
                    value={total}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <button
                  className={`w-full h-10 px-4 py-2 rounded-md text-sm font-medium text-white ${
                    activeTab === 'buy'
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                  onClick={activeTab === 'buy' ? handleBuy : handleSell}
                >
                  {activeTab === 'buy' ? 'Buy' : 'Sell'} {activePair.split('/')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}