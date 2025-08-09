import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '../../../lib/api';

const KasirHome = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [transactionLog, setTransactionLog] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transaksi/siap');
        const allTrans = res.data.data;

        const formatted = allTrans.map(item => ({
          id_pemesanan: item.id_pemesanan,
          no_meja: item.no_meja,
          no_antrian: item.no_antrian,
          status_pesanan: item.status_pesanan,
          status_transaksi: item.status_transaksi,
          total_harga: item.total_harga,
          items: item.pesanan.map(p => `${p.nama_menu} x ${p.jumlah_pemesanan}`)
        }));

        setTransactions(formatted);
      } catch (error) {
        console.error(`Gagal ambil data transaksi: ${error}`);
      }
    };

    const fetchTransactionLog = async () => {
      try {
        const res = await api.get('/owner/historiTransaksi');
        const data = res.data.data;

        const formatted = data.map(item => ({
          tgl_transaksi: `${item.month}/${item.day}/${item.year}`,          
          mtd_bayar: item.mtd_bayar,
          status_transaksi: item.status_transaksi,
          total_harga: item.total_harga,
        }));

        setTransactionLog(formatted);
      } catch (error) {
        console.error('Gagal mengambil data histori transaksi!');
      }
    };

    fetchTransactions();
    fetchTransactionLog();
  }, []);

  const handleDetailPesanan = (orderId) => {
    navigate(`/dashboard/kasir/payment/${orderId}`);
  };

  const getPaymentStatusBadge = (status) => {
    if (status === 'belum dibayar') {
      return (
        <Badge className="bg-red-500/20 text-red-700 border-red-500/30">
          Belum dibayar
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
        Dibayar
      </Badge>
    );
  };

  // Filter hanya pesanan yang sudah selesai (Done)
  const completedOrders = transactions.filter(t => t.status_pesanan === 'selesai');
  const historiTransaksi = transactionLog.filter(t => t.status_transaksi === 'dibayar');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-foreground">Kasir</h1>
        <p className="text-muted-foreground">Kelola pembayaran dan transaksi</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent">Daftar Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/20">
                  <th className="text-left p-3 font-semibold">ID Pesanan</th>
                  <th className="text-left p-3 font-semibold">No. Meja</th>
                  <th className="text-left p-3 font-semibold">No. Antrian</th>
                  <th className="text-left p-3 font-semibold">Total Harga</th>
                  <th className="text-left p-3 font-semibold">Status Transaksi</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {completedOrders.map((transaction) => (
                  <tr key={transaction.id_pemesanan} className="border-b border-accent/10">
                    <td className="p-3 font-medium">{transaction.id_pemesanan}</td>
                    <td className="p-3">{transaction.no_meja}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-accent/10">
                        #{transaction.no_antrian}
                      </Badge>
                    </td>
                    <td className="p-3 font-semibold text-primary">
                      Rp {transaction.total_harga.toLocaleString()}
                    </td>
                    <td className="p-3">
                      {getPaymentStatusBadge(transaction.status_transaksi)}
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        onClick={() => handleDetailPesanan(transaction.id_pemesanan)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        Detail Pesanan
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {completedOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada transaksi yang perlu diproses</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {completedOrders.filter(t => t.status_transaksi === 'belum dibayar').length}
              </p>
              <p className="text-sm text-muted-foreground">Belum Dibayar</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {historiTransaksi
                .filter(t => 
                t.status_transaksi === 'dibayar' &&
                parseInt(t.tgl_transaksi.split('/')[1]) === new Date().getDate()
                ).length}
              </p>
              <p className="text-sm text-muted-foreground">Sudah Dibayar</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                Rp {historiTransaksi
                  .filter(t => 
                    t.status_transaksi === 'dibayar' && 
                    parseInt(t.tgl_transaksi.split('/')[1]) === new Date().getDate()
                  )
                  .reduce((total, t) => total + t.total_harga, 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Pendapatan</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KasirHome;