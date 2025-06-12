import React, { useState } from 'react';
import { FiCheck, FiStar, FiCreditCard, FiX, FiShield, FiZap } from 'react-icons/fi';

const SubscriptionPlans = ({ plans }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlanSelect = (plan) => {
    if (plan.price === 'Contact Us') {
      // Handle contact form or redirect
      window.location.href = 'mailto:contact@yourcompany.com';
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const calculatePrice = (plan) => {
    if (plan.price === 'Contact Us') return plan.price;
    const basePrice = plan.price;
    return billingPeriod === 'yearly' ? Math.floor(basePrice * 10) : basePrice; // 2 months free on yearly
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with actual payment processors like:
      // - Stripe: https://stripe.com/docs/payments/accept-a-payment
      // - PayPal: https://developer.paypal.com/
      // - Razorpay: https://razorpay.com/docs/
      // - For Nepal: eSewa, Khalti, IME Pay
      
      alert(`Payment successful! Welcome to ${selectedPlan.name} plan!`);
      setShowPaymentModal(false);
      setSelectedPlan(null);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h3>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Plan Summary */}
          <div className="bg-purple-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-purple-900 mb-2">{selectedPlan?.name} Plan</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {billingPeriod === 'yearly' ? 'Annual' : 'Monthly'} Subscription
              </span>
              <span className="text-2xl font-bold text-purple-600">
                NPR{calculatePrice(selectedPlan)?.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">
                  /{billingPeriod === 'yearly' ? 'year' : 'month'}
                </span>
              </span>
            </div>
            {billingPeriod === 'yearly' && (
              <p className="text-sm text-green-600 mt-1">🎉 Save 2 months with annual billing!</p>
            )}
          </div>

          {/* Billing Period Toggle */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Billing Period</label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">Save 17%</span>
              </button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-purple-600 mr-3"
                />
                <FiCreditCard className="w-5 h-5 text-gray-400 mr-2" />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="esewa"
                  checked={paymentMethod === 'esewa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-purple-600 mr-3"
                />
                <div className="w-5 h-5 bg-green-500 rounded mr-2"></div>
                <span>eSewa</span>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="khalti"
                  checked={paymentMethod === 'khalti'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-purple-600 mr-3"
                />
                <div className="w-5 h-5 bg-purple-500 rounded mr-2"></div>
                <span>Khalti</span>
              </label>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </>
            )}

            {(paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center text-sm text-gray-500 py-3">
              <FiShield className="w-4 h-4 mr-2" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FiZap className="w-5 h-5 mr-2" />
                  Complete Purchase
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl transform -skew-y-1"></div>
      
      <div className="relative z-10 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Unlock More with Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Flexible Plans
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto px-4">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border-t-8 ${
                plan.borderColor
              } transform hover:scale-105 transition-all duration-300 ${
                plan.bgColor
              } hover:shadow-2xl relative overflow-hidden ${
                plan.popular ? 'ring-4 ring-purple-200 scale-105' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                    <FiStar className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan icon */}
              <div className={`w-16 h-16 rounded-full ${plan.iconBg || 'bg-purple-100'} flex items-center justify-center mb-6`}>
                <span className="text-2xl">{plan.icon || '🚀'}</span>
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">{plan.name}</h3>
              
              <div className="mb-6">
                <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {plan.price === 'Contact Us' ? plan.price : `NPR${plan.price.toLocaleString()}`}
                </p>
                {plan.price !== 'Contact Us' && (
                  <p className="text-xl font-medium text-gray-500">/month</p>
                )}
                {plan.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">NPR{plan.originalPrice.toLocaleString()}</p>
                )}
              </div>

              <ul className="text-gray-700 text-lg mb-8 space-y-4 flex-grow w-full">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <FiCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`mt-auto w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                    : 'bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                }`}
              >
                {plan.buttonText || 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Trusted by 10,000+ job seekers</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <span className="text-sm">30-day money back guarantee</span>
            <span className="text-sm">•</span>
            <span className="text-sm">Cancel anytime</span>
            <span className="text-sm">•</span>
            <span className="text-sm">24/7 support</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default SubscriptionPlans;