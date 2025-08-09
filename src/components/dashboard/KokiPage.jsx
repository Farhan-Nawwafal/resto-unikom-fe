import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import api from '../../lib/api';

const KokiPage = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [ordersLog, setOrdersLog] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/antrian');
        const data = res.data.data;

        const formatted = data.map((order) => ({
          id_pemesanan: order.id_pemesanan,
          no_meja: order.no_meja,
          no_antrian: order.no_antrian,
          jumlah_pesanan_menu: order.pesanan.reduce((sum, p) => sum + p.jumlah_pemesanan, 0),
          status_pesanan: 'sedang diproses',
          items: order.pesanan.map(p => `${p.nama_menu} x ${p.jumlah_pemesanan}`),
        }));

        setOrders(formatted);
      } catch (error) {
        console.error(`Gagal ambil antrian: ${error}`);
      }
    };

    const fetchOrdersLog = async () => {
      try {
        const res = await api.get('/antrian/pesananDone');
        const data = res.data.data;

        const formatted = data.map(order => ({
          id_pemesanan: order.id_pemesanan,
          tgl_transaksi: `${order.month}/${order.day}/${order.year}`
        }));

        setOrdersLog(formatted);
      } catch (error) {
        console.error('Gagal mengambil log pesanan');
      }
    };
    fetchOrders();
    fetchOrdersLog();
  }, []);

  const handleCompleteOrder = async (no_antrian) => {
    try {
      await api.put(`antrian/${no_antrian}`);

      setOrders((prev) => 
        prev.map(order => 
          order.no_antrian === no_antrian ? { ...order, status_pesanan: 'selesai'} : order  
        )
      );

      toast({
        title: 'Success',
        description: `Pesanan antrian ${no_antrian} berhasil diselesaikan!`
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: `Gagal menyelesaikan no antrian ${no_antrian}`,
        variant: 'destructive'
      });
    }
  }

  const getStatusBadge = (status_pesanan) => {
    switch(status_pesanan.toLowerCase()) {
      case 'sedang diproses':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">
            Sedang Diproses
          </Badge>
        );
      case 'selesai':
        return (
          <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
            Done
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-foreground">Koki</h1>
        <p className="text-muted-foreground">Kelola antrian pesanan dapur</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent">Antrian Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/20">
                  <th className="text-left p-3 font-semibold">ID Pesanan</th>
                  <th className="text-left p-3 font-semibold">No. Meja</th>
                  <th className="text-left p-3 font-semibold">No. Antrian</th>
                  <th className="text-left p-3 font-semibold">Items</th>
                  <th className="text-left p-3 font-semibold">Jumlah</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .sort((a, b) => a.no_antrian - b.no_antrian)
                  .map((order) => (
                  <tr key={order.id_pemesanan} className="border-b border-accent/10">
                    <td className="p-3 font-medium">{order.id_pemesanan}</td>
                    <td className="p-3">{order.no_meja}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-accent/10">
                        #{order.no_antrian}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{order.jumlah_pesanan_menu}</td>
                    <td className="p-3">
                      {getStatusBadge(order.status_pesanan)}
                    </td>
                    <td className="p-3">
                      {order.status_pesanan === 'sedang diproses' ? (
                        <Button
                          size="sm"
                          onClick={() => handleCompleteOrder(order.no_antrian)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Selesai
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-sm">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {orders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada pesanan dalam antrian</p>
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
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter(p => p.status_pesanan === 'sedang diproses').length}
              </p>
              <p className="text-sm text-muted-foreground">Sedang Diproses</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {ordersLog.filter(o => 
                  parseInt(o.tgl_transaksi.split('/')[1]) === new Date().getDate()).length
                }
              </p>
              <p className="text-sm text-muted-foreground">Selesai</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                {ordersLog.filter(o => 
                  parseInt(o.tgl_transaksi.split('/')[1]) === new Date().getDate()).length
                }
              </p>
              <p className="text-sm text-muted-foreground">Total Pesanan</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KokiPage;