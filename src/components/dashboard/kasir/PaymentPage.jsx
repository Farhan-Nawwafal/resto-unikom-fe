import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Receipt } from 'lucide-react';
import api from '../../../lib/api';

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [metodePembayaran, setMetodePembayaran] = useState('');
  const [loading, setLoading] = useState(false);

  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/transaksi/detail/${orderId}`);
        setOrderDetail(res.data.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Gagal mengambil detail pesanan!',
          variant: 'destructive'
        });
        navigate('/dashboard/kasir');
      }
    };  
    fetchDetail();
  }, []);

  // if (!orderDetail) {
  //   return (
  //     <div className="text-center py-8">
  //       <p className="text-muted-foreground">Pesanan tidak ditemukan</p>
  //       <Button onClick={() => navigate('/dashboard/kasir')} className="mt-4">
  //         Kembali
  //       </Button>
  //     </div>
  //   );
  // }
  if (!orderDetail) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Memuat detail pesanan...</p>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!metodePembayaran) {
      toast({
        title: "Error",
        description: "Harap pilih metode pembayaran!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await api.put(`/transaksi/bayar/${orderId}`, {
        metode_pembayaran: metodePembayaran,
      });

      toast({
        title: 'Pembayaran berhasil!',
        description: `Pesanan #${orderId} telah dibayar!`
      });
      navigate('/dashboard/kasir');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal memproses pembayaran!',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }

    // Simulasi loading dan proses pembayaran
    setTimeout(() => {
      toast({
        title: "Pembayaran Berhasil",
        description: `Pesanan #${orderDetail.id_pemesanan} telah dibayar!`,
      });
      setLoading(false);
      navigate('/dashboard/kasir');
    }, 2000);
  };

  const handlePrintReceipt = () => {
    toast({
      title: "Nota Dicetak",
      description: "Nota pembayaran sedang dicetak...",
    });
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    return `INV${dateStr}${String(orderDetail.id_pemesanan).padStart(3, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/kasir')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">Detail Pembayaran</h1>
          <p className="text-muted-foreground">Pesanan #{orderDetail.id_pemesanan}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detail Pesanan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Detail Pesanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">No. Invoice</p>
                <p className="font-semibold">{generateInvoiceNumber()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">No. Meja</p>
                <p className="font-semibold">{orderDetail.no_meja}</p>
              </div>
              <div>
                <p className="text-muted-foreground">No. Antrian</p>
                <p className="font-semibold">#{orderDetail.no_antrian}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tanggal</p>
                <p className="font-semibold">{new Date().toLocaleDateString('id-ID')}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Items Pesanan</h4>
              <div className="space-y-2">
                {orderDetail.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.nama_menu}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.jumlah_pemesanan} x Rp {item.harga_satuan.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-semibold">
                      Rp {(item.jumlah_pemesanan * item.harga_satuan).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">Rp {orderDetail.total_harga.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Pembayaran */}
        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Form Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Metode Pembayaran</label>
              <Select value={metodePembayaran} onValueChange={setMetodePembayaran}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tunai">Tunai</SelectItem>
                  <SelectItem value="Kartu Debit">Kartu Debit</SelectItem>
                  <SelectItem value="Kartu Kredit">Kartu Kredit</SelectItem>
                  <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                  <SelectItem value="QRIS">QRIS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-accent/5 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Informasi Restoran</h4>
              <p className="text-sm text-muted-foreground">{orderDetail.alamat_resto}</p>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={handlePayment}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading || !metodePembayaran}
              >
                {loading ? 'Memproses Pembayaran...' : 'Bayar'}
              </Button>
              
              <Button 
                onClick={handlePrintReceipt}
                variant="outline"
                className="w-full"
              >
                <Receipt size={16} className="mr-2" />
                Cetak Nota/Struk
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;