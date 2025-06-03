
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, Clock, Banknote, CheckCircle } from 'lucide-react';
import { PaymentMethod, usePayment } from '@/contexts/PaymentContext';
import { toast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  title: string;
  description: string;
  onPaymentComplete: (paymentId: string, method: PaymentMethod) => void;
  bookingId?: string;
  tournamentId?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  title,
  description,
  onPaymentComplete,
  bookingId,
  tournamentId
}) => {
  const { createPayment } = usePayment();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('manual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      let status: 'unpaid' | 'paid' | 'pending' = 'unpaid';
      let finalTransactionId = '';

      switch (selectedMethod) {
        case 'sslcommerz':
          // Simulate SSLCommerz payment
          status = 'paid';
          finalTransactionId = `SSL_${Math.random().toString(36).substr(2, 10).toUpperCase()}`;
          break;
        case 'manual':
          status = 'unpaid';
          finalTransactionId = transactionId;
          break;
        case 'pay-later':
          status = 'unpaid';
          break;
      }

      const paymentId = createPayment({
        bookingId,
        tournamentId,
        amount,
        method: selectedMethod,
        status,
        transactionId: finalTransactionId
      });

      toast({
        title: "Payment Processed",
        description: selectedMethod === 'sslcommerz' 
          ? "Payment completed successfully!" 
          : selectedMethod === 'manual'
          ? "Manual payment recorded. Awaiting confirmation."
          : "Payment scheduled for later.",
      });

      onPaymentComplete(paymentId, selectedMethod);
      onClose();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md backdrop-blur-xl bg-white/95 border border-white/30 rounded-3xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
            <CreditCard className="w-6 h-6 mr-3 text-emerald-600" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Display */}
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">৳{amount}</div>
              <div className="text-sm text-gray-600">Total Amount</div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Choose Payment Method</Label>
            <RadioGroup value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}>
              <div className="space-y-3">
                {/* SSLCommerz */}
                <div className="flex items-center space-x-3 p-3 border border-white/30 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                  <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                  <Label htmlFor="sslcommerz" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">SSLCommerz</div>
                      <div className="text-xs text-gray-600">Credit/Debit Card, Mobile Banking</div>
                    </div>
                  </Label>
                </div>

                {/* Manual Payment */}
                <div className="flex items-center space-x-3 p-3 border border-white/30 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <Banknote className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Manual Payment</div>
                      <div className="text-xs text-gray-600">Bank Transfer, bKash, Nagad</div>
                    </div>
                  </Label>
                </div>

                {/* Pay Later */}
                <div className="flex items-center space-x-3 p-3 border border-white/30 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                  <RadioGroupItem value="pay-later" id="pay-later" />
                  <Label htmlFor="pay-later" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-medium">Pay Later</div>
                      <div className="text-xs text-gray-600">Pay at the venue</div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Manual Payment Details */}
          {selectedMethod === 'manual' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  placeholder="+880 1XXX-XXXXXX"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="rounded-xl border-white/30 bg-white/50 focus:bg-white/70"
                />
              </div>
              <div>
                <Label htmlFor="txnId">Transaction ID (Optional)</Label>
                <Input
                  id="txnId"
                  placeholder="Enter transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="rounded-xl border-white/30 bg-white/50 focus:bg-white/70"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl border-white/30 bg-white/50 hover:bg-white/70"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing || (selectedMethod === 'manual' && !mobileNumber)}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {selectedMethod === 'sslcommerz' ? 'Pay Now' : 
                   selectedMethod === 'manual' ? 'Submit Payment' : 'Confirm'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
