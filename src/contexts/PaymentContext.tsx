
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PaymentMethod = 'manual' | 'sslcommerz' | 'pay-later';
export type PaymentStatus = 'unpaid' | 'paid' | 'pending' | 'confirmed';

interface Payment {
  id: string;
  bookingId?: string;
  tournamentId?: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  confirmedAt?: string;
  confirmedBy?: string;
}

interface PaymentContextType {
  payments: Payment[];
  createPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => string;
  updatePaymentStatus: (id: string, status: PaymentStatus, confirmedBy?: string) => void;
  getPaymentByBooking: (bookingId: string) => Payment | undefined;
  getPaymentByTournament: (tournamentId: string) => Payment | undefined;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const createPayment = (paymentData: Omit<Payment, 'id' | 'createdAt'>): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const newPayment: Payment = {
      ...paymentData,
      id,
      createdAt: new Date().toISOString(),
    };
    
    setPayments(prev => [...prev, newPayment]);
    return id;
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus, confirmedBy?: string) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === id 
          ? { 
              ...payment, 
              status, 
              confirmedAt: status === 'confirmed' ? new Date().toISOString() : payment.confirmedAt,
              confirmedBy: confirmedBy || payment.confirmedBy
            } 
          : payment
      )
    );
  };

  const getPaymentByBooking = (bookingId: string): Payment | undefined => {
    return payments.find(payment => payment.bookingId === bookingId);
  };

  const getPaymentByTournament = (tournamentId: string): Payment | undefined => {
    return payments.find(payment => payment.tournamentId === tournamentId);
  };

  const value = {
    payments,
    createPayment,
    updatePaymentStatus,
    getPaymentByBooking,
    getPaymentByTournament
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};
