import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import KasirHome from './kasir/KasirHome';
import PaymentPage from './kasir/PaymentPage';

const KasirPage = () => {
  return (
    <Routes>
      <Route path="/" element={<KasirHome />} />
      <Route path="/payment/:orderId" element={<PaymentPage />} />
    </Routes>
  );
};

export default KasirPage;