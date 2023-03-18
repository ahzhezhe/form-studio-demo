import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuilderPage, FormPage, HomePage } from './pages';

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/builder" element={<BuilderPage />} />
    </Routes>
  </BrowserRouter>
);
