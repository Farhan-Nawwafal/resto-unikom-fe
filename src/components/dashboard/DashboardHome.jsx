import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const DashboardHome = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-foreground">
          Selamat Datang, {user?.username}!
        </h1>
        <p className="text-muted-foreground">
          Dashboard RejaFood - {user?.role}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Pilih menu di sidebar kiri untuk mengakses fitur sesuai dengan role Anda.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Status Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span className="text-sm">Sistem Aktif</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Role: {user?.role}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Anda memiliki akses penuh sesuai dengan role yang diberikan.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;