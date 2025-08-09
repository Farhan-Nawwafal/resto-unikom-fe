import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus, Trash2, Search } from 'lucide-react';
import api from '../../lib/api';

const PelayanPage = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [jumlahPelanggan, setJumlahPelanggan] = useState('');
  const [selectedMeja, setSelectedMeja] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [mejaData, setMejaData] = useState([]);

  useEffect(() => {
    // Ambil data menu
    api.get('/menu')
      .then((res) => setMenuItems(res.data.data))
      .catch((err) => console.error('Gagal ambil data menu', err));

    // Ambil data meja
    api.get('/meja')
      .then((res) => setMejaData(res.data.data))
      .catch((err) => console.error('Gagal ambil data meja', err));
  }, []);

  const addToCart = (menu) => {
    const existingItem = cart.find(item => item.id_menu === menu.id_menu);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id_menu === menu.id_menu 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...menu, quantity: 1 }]);
    }
  };

  const updateQuantity = (id_menu, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id_menu);
      return;
    }
    setCart(cart.map(item => 
      item.id_menu === id_menu ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id_menu) => {
    setCart(cart.filter(item => item.id_menu !== id_menu));
  };

  const getAvailableTables = () => {
    if (!jumlahPelanggan) return [];
    const pelangganCount = parseInt(jumlahPelanggan);
    return mejaData.filter(meja =>
      meja.status === 'tersedia' && meja.kapasitas >= pelangganCount
    );
  };


  const filteredMenuItems = menuItems.filter(menu =>
    menu.nama_menu.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  const getCartItemQuantity = (id_menu) => {
    const cartItem = cart.find(item => item.id_menu === id_menu);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.harga_satuan * item.quantity), 0);
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Keranjang masih kosong!",
        variant: "destructive",
      });
      return;
    }

    if (!jumlahPelanggan || !selectedMeja) {
      toast({
        title: "Error",
        description: "Harap isi jumlah pelanggan dan pilih meja!",
        variant: "destructive",
      });
      return;
    }

    const mejaObj = mejaData.find(meja => meja.id_meja.toString() === selectedMeja);
    const no_meja = mejaObj?.no_meja;

    const orderData = {
      jml_pelanggan: parseInt(jumlahPelanggan),
      no_meja: no_meja,
      menu: cart.map(item => ({
        nama_menu: item.nama_menu,
        jumlah_pemesanan_menu: item.quantity
      }))
    };

    api.post('/pemesanan/kirim', orderData)
    .then(() => {
      toast({ title: "Berhasil", description: "Pesanan berhasil dibuat!" });
      setCart([]);
      setJumlahPelanggan('');
      setSelectedMeja('');
    })
    .catch((err) => {
      console.error(err);
      toast({ title: "Error", description: "Gagal membuat pesanan!", variant: "destructive" });
    });

    // Reset form
    setCart([]);
    setJumlahPelanggan('');
    setSelectedMeja('');

    toast({
      title: "Berhasil",
      description: "Pesanan berhasil dibuat!",
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">Pelayan Dashboard</h1>
        <p className="text-muted-foreground text-lg">Kelola pesanan pelanggan dengan mudah</p>
      </div>

      {/* Menu Catalog */}
      <Card className="border-accent/30 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-gold/10 border-b border-accent/20">
          <CardTitle className="text-2xl font-playfair text-accent">🍽️ Katalog Menu RejaFood</CardTitle>
          <p className="text-muted-foreground">Pilih menu favorit pelanggan</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-accent/30 focus:border-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredMenuItems.map((menu) => {
              const quantity = getCartItemQuantity(menu.id_menu);
              return (
              <div 
                key={menu.id_menu} 
                className="bg-card border border-accent/20 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="rounded-lg mb-3 overflow-hidden">
                  <img 
                    src={'/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png'} 
                    alt={menu.nama_menu}
                    className="w-full h-28 object-cover"
                  />
                </div>
                
                <div className="text-center space-y-2 mb-4">
                  <h3 className="font-playfair font-semibold text-foreground text-sm leading-tight">{menu.nama_menu}</h3>
                  <p className="text-primary font-bold text-base">
                    Rp {menu.harga_satuan.toLocaleString()}
                  </p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex justify-center">
                  {quantity === 0 ? (
                    <Button
                      size="sm"
                      onClick={() => addToCart(menu)}
                      className="w-8 h-8 p-0 bg-primary hover:bg-primary/90 rounded-full"
                    >
                      <Plus size={16} className="text-primary-foreground" />
                    </Button>
                  ) : (
                    <div className="flex items-center bg-background rounded-full border border-accent/30 px-2 py-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(menu.id_menu, quantity - 1)}
                        className="h-6 w-6 p-0 hover:bg-accent/10 rounded-full"
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(menu.id_menu, quantity + 1)}
                        className="h-6 w-6 p-0 hover:bg-accent/10 rounded-full"
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
            })}
          </div>
          
          {filteredMenuItems.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tidak ada menu yang ditemukan untuk "{searchTerm}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Keranjang */}
      <Card className="border-accent/30 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gold/10 to-accent/10 border-b border-accent/20">
          <CardTitle className="text-2xl font-playfair text-gold">🛒 Keranjang Pesanan</CardTitle>
          <p className="text-muted-foreground">Kelola pesanan pelanggan</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
                <Plus size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">Keranjang masih kosong</p>
              <p className="text-sm text-muted-foreground">Pilih menu dari katalog untuk mulai memesan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id_menu} className="flex items-center justify-between bg-gradient-to-r from-accent/5 to-gold/5 p-4 rounded-xl border border-accent/10 hover:shadow-md transition-all duration-300">
                  <div className="flex-1">
                    <h4 className="font-playfair font-semibold text-foreground text-lg">{item.nama_menu}</h4>
                    <p className="text-muted-foreground">
                      Rp {item.harga_satuan.toLocaleString()} x {item.quantity}
                    </p>
                    <p className="text-primary font-bold mt-1">
                      Subtotal: Rp {(item.harga_satuan * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-background rounded-lg border border-accent/20">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id_menu, item.quantity - 1)}
                        className="h-8 w-8 p-0 hover:bg-accent/10"
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id_menu, item.quantity + 1)}
                        className="h-8 w-8 p-0 hover:bg-accent/10"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(item.id_menu)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-accent/20 pt-4">
                <div className="bg-gradient-to-r from-primary/10 to-gold/10 p-4 rounded-lg">
                  <p className="text-2xl font-playfair font-bold text-center text-primary">
                    Total: Rp {calculateTotal().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Pelanggan dan Meja */}
          <div className="bg-card border border-accent/20 p-6 rounded-xl">
            <h3 className="text-lg font-playfair font-semibold text-foreground mb-4">📋 Informasi Pesanan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Jumlah Pelanggan</label>
                <Input
                  type="number"
                  value={jumlahPelanggan}
                  onChange={(e) => setJumlahPelanggan(e.target.value)}
                  placeholder="Masukkan jumlah pelanggan"
                  min="1"
                  className="bg-background border-accent/30 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Pilih Meja</label>
                <Select value={selectedMeja} onValueChange={setSelectedMeja}>
                  <SelectTrigger className="bg-background border-accent/30 focus:border-primary">
                    <SelectValue placeholder="Pilih meja yang tersedia" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableTables().map((meja) => (
                      <SelectItem key={meja.id_meja} value={meja.id_meja.toString()}>
                        🪑 Meja {meja.no_meja} (Kapasitas: {meja.kapasitas} orang)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleOrder}
            className="w-full h-14 bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-lg font-playfair font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={cart.length === 0}
          >
            {cart.length === 0 ? '🛒 Keranjang Kosong' : `🍽️ Pesan Sekarang (${cart.length} Item)`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PelayanPage;