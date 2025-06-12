import React, { useState } from 'react';
import { FaTimesCircle, FaPrint, FaDownload, FaLink, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RegisterCheckPage = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificateData, setCertificateData] = useState(undefined);
  const [showCertificate, setShowCertificate] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockCertificateDatabase = {
    'CERT123': {
      name: 'Rachit Chettri',
      course: 'ReactJS Bootcamp',
      date: 'June 01, 2025',
      certId: 'CERT123',
    },
    'CERT456': {
      name: 'Anita Sharma',
      course: 'Next.js Workshop',
      date: 'June 03, 2025',
      certId: 'CERT456',
    },
    'B22121': {
      name: 'Bisesh Adhikari',
      course: 'DevOps Certification',
      date: 'May 08, 2025',
      certId: 'B22121',
    }
  };

  const handleCheck = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = mockCertificateDatabase[certificateNumber.toUpperCase()];
      setCertificateData(data ?? null);
      setShowCertificate(true);
      setCopySuccess('');
      setIsLoading(false);
    }, 800);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate</title>
          <style>
            @page {
              size: landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Georgia', serif;
            }
          </style>
        </head>
        <body>
          <div style="
            width: 100vw;
            height: 100vh;
            background: linear-gradient(to right, #f8f9fa 1px, transparent 1px), 
                        linear-gradient(to bottom, #f8f9fa 1px, transparent 1px);
            background-size: 20px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          ">
            <div style="
              width: 100%;
              height: 90%;
              border: 15px solid #4B5563;
              padding: 40px;
              position: relative;
              background-color: white;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              display: flex;
              flex-direction: column;
            ">
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 10px;
                background: linear-gradient(90deg, #3B82F6, #10B981, #F59E0B);
              "></div>
              
              <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="text-align: center; flex: 1;">
                  <div style="margin-bottom: 20px;">
                    <img src="https://via.placeholder.com/150x80?text=Academy+Logo" 
                         alt="Academy Logo" 
                         style="height: 80px; margin-bottom: 20px;" />
                    <h1 style="
                      font-size: 36px;
                      font-weight: bold;
                      color: #1F2937;
                      margin-bottom: 10px;
                      letter-spacing: 2px;
                    ">CERTIFICATE OF ACHIEVEMENT</h1>
                    <div style="
                      height: 2px;
                      background: linear-gradient(90deg, transparent, #4B5563, transparent);
                      margin: 20px auto;
                      width: 300px;
                    "></div>
                    <p style="font-size: 16px; color: #6B7280;">This is to certify that</p>
                  </div>
                  
                  <h2 style="
                    font-size: 32px;
                    font-weight: bold;
                    color: #2563EB;
                    margin: 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  ">${certificateData.name}</h2>
                  
                  <p style="font-size: 16px; color: #6B7280;">
                    has successfully completed the course
                  </p>
                  
                  <h3 style="
                    font-size: 24px;
                    font-weight: bold;
                    color: #10B981;
                    margin: 20px 0;
                    font-style: italic;
                  ">"${certificateData.course}"</h3>
                  
                  <p style="font-size: 16px; color: #6B7280;">
                    with distinction on ${certificateData.date}
                  </p>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-top: auto;">
                  <div style="width: 45%;">
                    <div style="
                      border-top: 1px solid #9CA3AF;
                      width: 200px;
                      margin: 0 auto 10px;
                      padding-top: 10px;
                    "></div>
                    <p style="font-size: 14px; color: #6B7280; text-align: center;">Director of Education</p>
                  </div>
                  
                  <div style="width: 45%;">
                    <div style="
                      border-top: 1px solid #9CA3AF;
                      width: 200px;
                      margin: 0 auto 10px;
                      padding-top: 10px;
                    "></div>
                    <p style="font-size: 14px; color: #6B7280; text-align: center;">Chief Executive Officer</p>
                  </div>
                </div>
              </div>
              
              <div style="
                position: absolute;
                bottom: 20px;
                right: 40px;
                font-size: 12px;
                color: #9CA3AF;
              ">
                Validated at: academy.org/verify/${certificateData.certId}
              </div>
              
              <div style="
                position: absolute;
                bottom: 20px;
                left: 40px;
                border: 1px dashed #9CA3AF;
                padding: 10px 20px;
              ">
                <p style="font-size: 14px; color: #6B7280; margin: 0; text-align: center;">Certificate ID</p>
                <p style="
                  font-size: 18px;
                  font-weight: bold;
                  color: #1F2937;
                  letter-spacing: 2px;
                  margin: 0;
                  text-align: center;
                ">${certificateData.certId}</p>
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
    // In a real implementation, you would generate a PDF or image here
    alert('Download functionality would generate a PDF in a real implementation');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/certificates/${certificateData.certId}`;
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate Verification</h1>
          <p className="text-gray-600">Verify your digital certificates</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter Certificate Number (e.g. CERT123)"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              />
            </div>

            <button
              onClick={handleCheck}
              disabled={!certificateNumber || isLoading}
              className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                !certificateNumber || isLoading
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
                  <FaSearch /> Verify Certificate
                </>
              )}
            </button>
          </div>

          {showCertificate && certificateData && (
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
                  <h3 className="text-xl font-bold text-gray-800">Valid Certificate</h3>
                  <p className="text-gray-600">This certificate is verified and authentic</p>
                </div>
              </div>

              <div className="bg-white border-4 border-gray-700 p-8 rounded-lg shadow-inner font-serif mb-6 aspect-[16/9] overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                      <div className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 mb-4"></div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-wider">CERTIFICATE OF ACHIEVEMENT</h1>
                      <div className="h-px bg-gray-300 w-64 mx-auto my-4"></div>
                      <p className="text-gray-600">This is to certify that</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-blue-600 my-4 uppercase tracking-wider">{certificateData.name}</h2>
                    
                    <p className="text-gray-600">has successfully completed the course</p>
                    
                    <h3 className="text-xl font-semibold text-green-600 my-4 italic">"{certificateData.course}"</h3>
                    
                    <p className="text-gray-600">with distinction on {certificateData.date}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-auto">
                    <div className="border border-dashed border-gray-400 p-3 rounded">
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="text-lg font-bold text-gray-800 tracking-widest">{certificateData.certId}</p>
                    </div>
                    
                    <div className="flex gap-8">
                      <div className="text-center">
                        <div className="border-t border-gray-400 w-32 mx-auto pt-2"></div>
                        <p className="text-sm text-gray-500">Director of Education</p>
                      </div>
                      <div className="text-center">
                        <div className="border-t border-gray-400 w-32 mx-auto pt-2"></div>
                        <p className="text-sm text-gray-500">Chief Executive Officer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 shadow-md"
                >
                  <FaPrint /> Print Certificate
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

          {showCertificate && certificateData === null && (
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
                  <h3 className="text-xl font-bold text-gray-800">Certificate Not Found</h3>
                  <p className="text-gray-600">No valid certificate matches the provided number</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterCheckPage;