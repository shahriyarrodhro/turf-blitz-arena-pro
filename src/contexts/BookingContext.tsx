
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  date: string;
  time: string;
  duration: number;
  playerName: string;
  playerEmail: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => string;
  getBookingsByUser: (email: string) => Booking[];
  updateBookingStatus: (id: string, status: Booking['status']) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      turfId: '1',
      turfName: 'Champions Arena',
      date: '2024-12-15',
      time: '18:00',
      duration: 1,
      playerName: 'Ahmed Rahman',
      playerEmail: 'player@example.com',
      totalAmount: 2500,
      status: 'confirmed',
      createdAt: '2024-12-01T10:00:00Z'
    }
  ]);

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const newBooking: Booking = {
      ...bookingData,
      id,
      createdAt: new Date().toISOString(),
    };
    
    setBookings(prev => [...prev, newBooking]);
    return id;
  };

  const getBookingsByUser = (email: string): Booking[] => {
    return bookings.filter(booking => booking.playerEmail === email);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const value = {
    bookings,
    createBooking,
    getBookingsByUser,
    updateBookingStatus
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
