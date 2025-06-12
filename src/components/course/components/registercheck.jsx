import React, { useState } from 'react';
import { FaTimesCircle, FaPrint, FaDownload, FaLink, FaSearch, FaFileContract } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContractVerificationPage = () => {
  const [contractNumber, setContractNumber] = useState('');
  const [contractData, setContractData] = useState(undefined);
  const [showContract, setShowContract] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockContractDatabase = {
    'CONT789': {
      contractId: 'CONT789',
      companyName: 'TechSolutions Inc.',
      clientName: 'Global Enterprises Ltd.',
      contractType: 'Service Agreement',
      startDate: 'January 15, 2025',
      endDate: 'January 14, 2026',
      value: '$250,000',
      status: 'Active',
      terms: [
        '24/7 technical support',
        'Monthly maintenance',
        'Software updates',
        'Emergency response within 4 hours'
      ],
      signatories: [
        { name: 'John Smith', title: 'CEO, TechSolutions Inc.', date: 'Jan 10, 2025' },
        { name: 'Sarah Johnson', title: 'CTO, Global Enterprises Ltd.', date: 'Jan 12, 2025' }
      ]
    },
    'CONT456': {
      contractId: 'CONT456',
      companyName: 'BuildRight Constructions',
      clientName: 'Metro City Development',
      contractType: 'Construction Agreement',
      startDate: 'March 1, 2025',
      endDate: 'December 31, 2026',
      value: '$5,750,000',
      status: 'Active',
      terms: [
        'Complete construction of commercial complex',
        'Adherence to safety standards',
        'Monthly progress reports',
        'Liquidated damages for delays'
      ],
      signatories: [
        { name: 'Robert Chen', title: 'President, BuildRight Constructions', date: 'Feb 25, 2025' },
        { name: 'Michael Brown', title: 'Director, Metro City Development', date: 'Feb 28, 2025' }
      ]
    }
  };

  const handleCheck = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = mockContractDatabase[contractNumber.toUpperCase()];
      setContractData(data ?? null);
      setShowContract(true);
      setCopySuccess('');
      setIsLoading(false);
    }, 800);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Contract ${contractData.contractId}</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Times New Roman', serif;
            }
            .watermark {
              position: absolute;
              opacity: 0.1;
              font-size: 72px;
              color: #000;
              transform: rotate(-45deg);
              z-index: -1;
              white-space: nowrap;
            }
          </style>
        </head>
        <body>
          <div style="
            width: 100%;
            min-height: 100vh;
            padding: 40px;
            position: relative;
          ">
            <div class="watermark" style="top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg);">
              ${contractData.status} CONTRACT
            </div>
            
            <div style="
              border: 2px solid #000;
              padding: 40px;
              height: 100%;
              position: relative;
            ">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">
                  ${contractData.companyName.toUpperCase()}
                </h1>
                <div style="
                  height: 2px;
                  background: linear-gradient(90deg, transparent, #000, transparent);
                  margin: 0 auto 20px;
                  width: 300px;
                "></div>
                <h2 style="font-size: 22px; font-weight: bold;">
                  ${contractData.contractType.toUpperCase()}
                </h2>
              </div>
              
              <div style="margin-bottom: 30px;">
                <p style="text-align: center; font-size: 16px; margin-bottom: 30px;">
                  This Agreement is made and entered into as of ${contractData.startDate} by and between:
                </p>
                
                <div style="display: flex; justify-content: space-around; margin-bottom: 30px;">
                  <div style="width: 45%;">
                    <h3 style="font-size: 18px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px;">
                      ${contractData.companyName}
                    </h3>
                    <p style="font-size: 14px; margin-top: 5px;">
                      (Hereinafter referred to as "Service Provider")
                    </p>
                  </div>
                  
                  <div style="width: 45%;">
                    <h3 style="font-size: 18px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px;">
                      ${contractData.clientName}
                    </h3>
                    <p style="font-size: 14px; margin-top: 5px;">
                      (Hereinafter referred to as "Client")
                    </p>
                  </div>
                </div>
              </div>
              
              <div style="margin-bottom: 30px;">
                <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">
                  CONTRACT TERMS AND CONDITIONS
                </h3>
                
                <ol style="padding-left: 20px; font-size: 14px;">
                  ${contractData.terms.map((term, index) => `
                    <li style="margin-bottom: 10px;">${term}</li>
                  `).join('')}
                </ol>
              </div>
              
              <div style="margin-bottom: 40px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                  <div>
                    <p style="font-weight: bold;">Contract Value:</p>
                    <p>${contractData.value}</p>
                  </div>
                  <div>
                    <p style="font-weight: bold;">Contract Period:</p>
                    <p>${contractData.startDate} to ${contractData.endDate}</p>
                  </div>
                  <div>
                    <p style="font-weight: bold;">Status:</p>
                    <p>${contractData.status}</p>
                  </div>
                </div>
              </div>
              
              <div style="display: flex; justify-content: space-around; margin-top: 60px;">
                ${contractData.signatories.map(signatory => `
                  <div style="width: 40%; text-align: center;">
                    <div style="border-top: 1px solid #000; width: 100%; margin: 0 auto 10px; padding-top: 10px;"></div>
                    <p style="font-weight: bold;">${signatory.name}</p>
                    <p style="font-size: 14px;">${signatory.title}</p>
                    <p style="font-size: 14px;">Date: ${signatory.date}</p>
                  </div>
                `).join('')}
              </div>
              
              <div style="
                position: absolute;
                bottom: 20px;
                right: 40px;
                font-size: 12px;
                color: #666;
              ">
                Contract ID: ${contractData.contractId}
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    alert('Download functionality would generate a PDF in a real implementation');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/contracts/${contractData.contractId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess('Verification link copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Contract Verification</h1>
          <p className="text-gray-600">Verify your business contracts</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter Contract Number (e.g. CONT789)"
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              />
            </div>

            <button
              onClick={handleCheck}
              disabled={!contractNumber || isLoading}
              className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                !contractNumber || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  <FaFileContract /> Verify Contract
                </>
              )}
            </button>
          </div>

          {showContract && contractData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Valid Contract</h3>
                  <p className="text-gray-600">This contract is verified and legally binding</p>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-800 p-6 rounded-lg shadow-inner font-serif mb-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold uppercase mb-2">{contractData.companyName}</h1>
                  <div className="h-px bg-gray-800 w-64 mx-auto my-4"></div>
                  <h2 className="text-xl font-bold">{contractData.contractType}</h2>
                </div>
                
                <div className="mb-6">
                  <p className="text-center mb-4">
                    This Agreement is made and entered into as of {contractData.startDate} by and between:
                  </p>
                  
                  <div className="flex flex-wrap justify-around mb-6">
                    <div className="w-full md:w-5/12 mb-4 md:mb-0">
                      <h3 className="font-bold border-b border-gray-800 pb-1">{contractData.companyName}</h3>
                      <p className="text-sm">(Hereinafter referred to as "Service Provider")</p>
                    </div>
                    <div className="w-full md:w-5/12">
                      <h3 className="font-bold border-b border-gray-800 pb-1">{contractData.clientName}</h3>
                      <p className="text-sm">(Hereinafter referred to as "Client")</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-3">CONTRACT TERMS AND CONDITIONS</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    {contractData.terms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="flex flex-wrap justify-between mb-8">
                  <div>
                    <p className="font-bold">Contract Value:</p>
                    <p>{contractData.value}</p>
                  </div>
                  <div>
                    <p className="font-bold">Contract Period:</p>
                    <p>{contractData.startDate} to {contractData.endDate}</p>
                  </div>
                  <div>
                    <p className="font-bold">Status:</p>
                    <p>{contractData.status}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-around mt-10">
                  {contractData.signatories.map((signatory, index) => (
                    <div key={index} className="w-full md:w-5/12 mb-6 text-center">
                      <div className="border-t border-gray-800 w-full pt-2 mb-2"></div>
                      <p className="font-bold">{signatory.name}</p>
                      <p className="text-sm">{signatory.title}</p>
                      <p className="text-sm">Date: {signatory.date}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-right text-sm text-gray-600 mt-4">
                  Contract ID: {contractData.contractId}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 shadow-md"
                >
                  <FaPrint /> Print Contract
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 shadow-md"
                >
                  <FaDownload /> Download
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 shadow-md"
                >
                  <FaLink /> Share
                </motion.button>
              </div>

              {copySuccess && (
                <div className="mt-3 text-center text-sm text-green-600 bg-green-50 py-1.5 px-3 rounded-lg">
                  {copySuccess}
                </div>
              )}
            </motion.div>
          )}

          {showContract && contractData === null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-3 justify-center py-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <FaTimesCircle className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Contract Not Found</h3>
                  <p className="text-gray-600">No valid contract matches the provided number</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractVerificationPage;