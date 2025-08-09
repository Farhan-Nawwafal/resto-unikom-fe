import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Receipt, Calendar } from 'lucide-react';
import { useState ,useEffect } from 'react';
import api from '../../lib/api.js';

// Data dummy untuk owner dashboard
const REVENUE_DATA = {
  total_revenue: 2750000,
  daily_revenue: 450000,
  monthly_revenue: 12500000,
  transactions_today: 15,
  transactions_total: 342
};

const SALES_CHART_DATA = [
  { date: '2024-01-15', total: 350000 },
  { date: '2024-01-16', total: 420000 },
  { date: '2024-01-17', total: 380000 },
  { date: '2024-01-18', total: 510000 },
  { date: '2024-01-19', total: 445000 },
  { date: '2024-01-20', total: 390000 },
  { date: '2024-01-21', total: 480000 },
];


const OwnerPage = () => {
  const [transactionLog, setTransactionLog] = useState([]);

  useEffect(() => {
    const fetchTransactionLog = async () => {
      try {
        const res = await api.get('/owner/historiTransaksi');
        const data = res.data.data;

        const formatted = data.map(item => ({
          id_transaksi: item.id_transaksi,
          username: item.username,
          no_invoice: item.no_invoice,
          total_harga: item.total_harga,
          mtd_bayar: item.mtd_bayar,
          tgl_transaksi: `${item.month}/${item.day}/${item.year}`,
          status_transaksi: item.status_transaksi 
        }));

        setTransactionLog(formatted);
      } catch (error) {
        console.error('Gagal mengambil histori transaksi!');
      }
    }; 
    fetchTransactionLog();
  }, []);

  const getPaymentMethodBadge = (method) => {
    const colors = {
      'Tunai': 'bg-green-500/20 text-green-700 border-green-500/30',
      'QRIS': 'bg-blue-500/20 text-blue-700 border-blue-500/30',
      'Kartu Debit': 'bg-purple-500/20 text-purple-700 border-purple-500/30',
      'E-Wallet': 'bg-orange-500/20 text-orange-700 border-orange-500/30',
    };
    
    return (
      <Badge className={colors[method] || 'bg-gray-500/20 text-gray-700'}>
        {method}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-foreground">Owner Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan kinerja dan analitik restoran</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendapatan Hari Ini</p>
                <p className="text-2xl font-bold text-primary">
                  Rp {transactionLog
                    .filter(t => parseInt(t.tgl_transaksi.split('/')[1]) === new Date().getDate())
                    .reduce((initVal, currVal) => initVal + currVal.total_harga, 0)
                    .toLocaleString()
                  }
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
              {/* Rupiah */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendapatan Bulan Ini</p>
                <p className="text-2xl font-bold text-accent">
                  Rp {transactionLog
                  .filter(t => parseInt(t.tgl_transaksi.split('/')[0]) === new Date().getMonth() + 1)
                  .reduce((initVal, currVal) => initVal + currVal.total_harga, 0)
                  .toLocaleString()
                  }
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transaksi Hari Ini</p>
                <p className="text-2xl font-bold text-gold">
                  {transactionLog
                  .filter(t => parseInt(t.tgl_transaksi.split('/')[1]) === new Date().getDate()).length
                  }
                </p>
              </div>
              <Receipt className="h-8 w-8 text-gold" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transaksi</p>
                <p className="text-2xl font-bold text-muted">
                  {transactionLog
                    .filter(t => t.status_transaksi === 'dibayar').length
                  }
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-accent">Grafik Penjualan (7 Hari Terakhir)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple bar chart representation */}
            {SALES_CHART_DATA.map((data, index) => {
              const maxValue = Math.max(...SALES_CHART_DATA.map(d => d.total));
              const percentage = (data.total / maxValue) * 100;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-muted-foreground">
                    {new Date(data.date).toLocaleDateString('id-ID', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex-1 bg-muted/20 rounded-full h-6 relative">
                    <div 
                      className="bg-primary h-6 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                    <span className="absolute right-2 top-0 h-6 flex items-center text-xs font-medium">
                      Rp {data.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-accent">Histori Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/20">
                  <th className="text-left p-3 font-semibold">ID Transaksi</th>
                  <th className="text-left p-3 font-semibold">Kasir</th>
                  <th className="text-left p-3 font-semibold">No. Invoice</th>
                  <th className="text-left p-3 font-semibold">Total Harga</th>
                  <th className="text-left p-3 font-semibold">Metode Bayar</th>
                  <th className="text-left p-3 font-semibold">Tanggal</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionLog.map((transaction) => (
                  <tr key={transaction.id_transaksi} className="border-b border-accent/10">
                    <td className="p-3 font-medium">{transaction.id_transaksi}</td>
                    <td className="p-3 font-medium">{transaction.username}</td>
                    <td className="p-3 font-mono text-sm">{transaction.no_invoice}</td>
                    <td className="p-3 font-semibold text-primary">
                      Rp {transaction.total_harga.toLocaleString()}
                    </td>
                    <td className="p-3">
                      {getPaymentMethodBadge(transaction.mtd_bayar)}
                    </td>
                    <td className="p-3">
                      {new Date(transaction.tgl_transaksi).toLocaleDateString('en-US')}
                    </td>
                    <td className="p-3">
                      <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                        {transaction.status_transaksi}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Rata-rata per Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              Rp {Math.round(REVENUE_DATA.daily_revenue / REVENUE_DATA.transactions_today).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Menu Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">Gudeg Jogja</p>
            <p className="text-sm text-muted-foreground">23 porsi terjual hari ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Waktu Sibuk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">12:00 - 14:00</p>
            <p className="text-sm text-muted-foreground">Peak hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerPage;