import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const PageLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
    <Header />
    <main className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default PageLayout;