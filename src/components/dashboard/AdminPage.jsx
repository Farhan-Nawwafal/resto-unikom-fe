import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../../lib/api';

// Data dummy menu
const INITIAL_MENU = [
  { id_menu: 1, nama_menu: 'Gudeg Jogja', harga_satuan: 25000, image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png' },
  { id_menu: 2, nama_menu: 'Rawon Surabaya', harga_satuan: 30000, image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png' },
  { id_menu: 3, nama_menu: 'Soto Ayam', harga_satuan: 20000, image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png' },
  { id_menu: 4, nama_menu: 'Nasi Pecel', harga_satuan: 15000, image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png' },
  { id_menu: 5, nama_menu: 'Bakso Malang', harga_satuan: 18000, image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png' },
];


const AdminPage = () => {
  const { toast } = useToast();
  const [menuList, setMenuList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({
    nama_menu: '',
    harga_satuan: '',
    image: ''
  });

  const resetForm = () => {
    setFormData({
      nama_menu: '',
      harga_satuan: '',
      image: ''
    });
  };

  useEffect(() => {
    // Ambil data menu
    api.get('/menu')
      .then((res) => setMenuList(res.data.data))
      .catch((err) => console.error('Gagal ambil data menu', err));
  }, []);

  const handleAddMenu = async () => {
    if (!formData.nama_menu || !formData.harga_satuan) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang diperlukan!",
        variant: "destructive",
      });
      return;
    }
  
    try {
      await api.post('/menu/tambah', {
        nama_menu: formData.nama_menu,
        harga_satuan: parseInt(formData.harga_satuan)
      });
  
  
      // Tambahkan menu baru ke list
  
      setShowAddModal(false);
      resetForm();
  
      toast({
        title: "Berhasil",
        description: "Menu baru berhasil ditambahkan!",
      });
  
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditMenu = () => {
    if (!formData.nama_menu || !formData.harga_satuan) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang diperlukan!",
        variant: "destructive",
      });
      return;
    }

    setMenuList(menuList.map(menu => 
      menu.id_menu === editingMenu.id_menu 
        ? {
            ...menu,
            nama_menu: formData.nama_menu,
            harga_satuan: parseInt(formData.harga_satuan),
            image: formData.image || menu.image
          }
        : menu
    ));

    setShowEditModal(false);
    setEditingMenu(null);
    resetForm();

    toast({
      title: "Berhasil",
      description: "Menu berhasil diperbarui!",
    });
  };

  const handleDeleteMenu = async (id_menu, nama_menu) => {
    try {
      if (window.confirm(`Apakah Anda yakin ingin menghapus menu "${nama_menu}"?`)) {
        await api.delete(`/menu/hapus/${id_menu}`);
        
        toast({
          title: "Berhasil",
          description: "Menu berhasil dihapus!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openEditModal = (menu) => {
    setEditingMenu(menu);
    setFormData({
      nama_menu: menu.nama_menu,
      harga_satuan: menu.harga_satuan.toString(),
      image: menu.image
    });
    setShowEditModal(true);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">Admin</h1>
          <p className="text-muted-foreground">Kelola menu restoran</p>
        </div>
        <Button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus size={16} className="mr-2" />
          Tambah Menu
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent">Daftar Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/20">
                  <th className="text-left p-3 font-semibold">ID</th>
                  <th className="text-left p-3 font-semibold">Gambar</th>
                  <th className="text-left p-3 font-semibold">Nama Menu</th>
                  <th className="text-left p-3 font-semibold">Harga</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {menuList.map((menu) => (
                  <tr key={menu.id_menu} className="border-b border-accent/10">
                    <td className="p-3 font-medium">{menu.id_menu}</td>
                    <td className="p-3">
                      <img 
                        src={'/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png'} 
                        alt={menu.nama_menu}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-3">{menu.nama_menu}</td>
                    <td className="p-3 font-semibold text-primary">
                      Rp {menu.harga_satuan.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(menu)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteMenu(menu.id_menu, menu.nama_menu)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Menu Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-accent">Tambah Menu Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Menu</label>
              <Input
                value={formData.nama_menu}
                onChange={(e) => setFormData({...formData, nama_menu: e.target.value})}
                placeholder="Masukkan nama menu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Harga Satuan</label>
              <Input
                type="number"
                value={formData.harga_satuan}
                onChange={(e) => setFormData({...formData, harga_satuan: e.target.value})}
                placeholder="Masukkan harga satuan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Gambar (Opsional)</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="URL gambar menu"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Batalkan
              </Button>
              <Button onClick={handleAddMenu} className="bg-primary hover:bg-primary/90">
                Tambah
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Menu Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-accent">Edit Menu</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Menu</label>
              <Input
                value={formData.nama_menu}
                onChange={(e) => setFormData({...formData, nama_menu: e.target.value})}
                placeholder="Masukkan nama menu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Harga Satuan</label>
              <Input
                type="number"
                value={formData.harga_satuan}
                onChange={(e) => setFormData({...formData, harga_satuan: e.target.value})}
                placeholder="Masukkan harga satuan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Gambar</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="URL gambar menu"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Batalkan
              </Button>
              <Button onClick={handleEditMenu} className="bg-primary hover:bg-primary/90">
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;