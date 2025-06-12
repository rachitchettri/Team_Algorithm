import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import {
  FiUpload,
  FiFileText,
  FiBriefcase,
  FiLoader,
  FiClipboard,
  FiAlertCircle,
  FiInfo
} from 'react-icons/fi';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const CVAnalyzer = () => {
  const [cvText, setCvText] = useState('');
  const [jobRequirement, setJobRequirement] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfFileName, setPdfFileName] = useState('');
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [fileError, setFileError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [apiError, setApiError] = useState(null);

  const fileInputRef = useRef(null);

  // Clear errors after 5 seconds
  useEffect(() => {
    if (fileError || generalError || apiError) {
      const timeout = setTimeout(() => {
        setFileError('');
        setGeneralError('');
        setApiError(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [fileError, generalError, apiError]);

  const handlePdfUpload = async (file) => {
    if (!file) return;

    setPdfFileName(file.name);
    setCvText('');
    setResult(null);
    setFileError('');
    setGeneralError('');
    setApiError(null);

    // Validate file size & type
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB limit');
      return;
    }
    if (file.type !== 'application/pdf') {
      setFileError('Please upload a PDF file');
      return;
    }

    setAnalysisInProgress(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => (typeof item.str === 'string' ? item.str : ''))
          .filter(Boolean)
          .join(' ');

        fullText += pageText.trim() + '\n';
      }

      if (!fullText.trim()) {
        setFileError('No extractable text found in PDF');
        setCvText('');
      } else {
        setCvText(fullText.trim());
      }
    } catch (error) {
      console.error('Error reading PDF:', error);
      setFileError('Failed to process PDF file');
      setCvText('');
    } finally {
      setAnalysisInProgress(false);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files.length === 0) return;
    handlePdfUpload(e.target.files[0]);
    e.target.value = null;
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length === 0) return;
    handlePdfUpload(e.dataTransfer.files[0]);
  };

  const validateResponse = (data) => {
    if (!data) return false;
    
    const requiredFields = [
      'match_percentage',
      'missing_technical_skills',
      'missing_soft_skills',
      'suggested_courses',
      'suggested_jobs',
      'strengths',
      'weaknesses',
      'summary'
    ];
    
    return requiredFields.every(field => field in data);
  };

  const cleanApiResponse = (text) => {
    // Remove markdown code blocks if present
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
  };

  const handleAnalyze = async () => {
    if (!cvText.trim() || !jobRequirement.trim()) {
      setGeneralError('Please provide both CV text and job requirements.');
      return;
    }

    setLoading(true);
    setResult(null);
    setGeneralError('');
    setApiError(null);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: `You are a career advisor analyzing CVs against job requirements. 
              Provide specific, actionable feedback in valid JSON format only (no additional text).
              Consider skills, experience, education, and other relevant factors.`,
            },
            {
              role: 'user',
              content: `
CV Content:
${cvText}

Job Requirements:
${jobRequirement}

Analyze this CV against the job requirements and provide strictly formatted JSON with these keys:
- match_percentage (number between 0-100)
- missing_technical_skills (array of strings)
- missing_soft_skills (array of strings)
- suggested_courses (array of strings)
- suggested_jobs (array of strings)
- strengths (array of strings)
- weaknesses (array of strings)
- summary (string)

IMPORTANT: Your response must be pure JSON with no additional text or markdown formatting.`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content ?? '';
      const cleanedContent = cleanApiResponse(rawContent);

      try {
        const output = JSON.parse(cleanedContent);
        
        if (!validateResponse(output)) {
          throw new Error('Invalid response structure from API');
        }
        
        setResult(output);
      } catch (e) {
        console.error('Failed to parse API response:', e);
        console.log('Raw API response:', cleanedContent);
        setApiError({
          message: 'Failed to process analysis results',
          details: e.message,
          rawResponse: cleanedContent
        });
      }
    } catch (error) {
      console.error('Error analyzing CV:', error);
      setApiError({
        message: 'Failed to analyze CV',
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const isAnalyzeDisabled = loading || !cvText.trim() || !jobRequirement.trim();
  const progress = Math.min(Math.max(result?.match_percentage || 0, 0), 100);
  const strokeDashoffset = 100 - progress;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700">
            CV & Job Requirement Analyzer
          </h2>
          <p className="text-gray-600 mt-2">
            Upload your CV or paste the text and job description to get personalized career advice
          </p>
        </div>

        <div className="space-y-6">
          {/* File Upload with drag & drop */}
          <div>
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${dragOver ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white'}`}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
              }}
              aria-label="Upload your CV file"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <FiFileText className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {pdfFileName || 'Click or drag & drop PDF file here'}
                </span>
              </div>
            </div>
            {analysisInProgress && (
              <p className="mt-2 text-sm text-purple-600 flex items-center gap-1">
                <FiLoader className="animate-spin" /> Extracting text from PDF...
              </p>
            )}
            {fileError && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <FiAlertCircle /> {fileError}
              </p>
            )}
          </div>

          {/* Optional manual CV text input */}
          <div>
            <label htmlFor="cvText" className="block font-semibold mb-1 flex items-center gap-2">
              <FiFileText className="text-purple-600" />
              Or paste CV text here:
            </label>
            <textarea
              id="cvText"
              rows={6}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your CV text here if not uploading a PDF"
              className="w-full rounded-md border border-gray-300 p-3 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Job Requirement input */}
          <div>
            <label htmlFor="jobRequirement" className="block font-semibold mb-1 flex items-center gap-2">
              <FiBriefcase className="text-purple-600" />
              Job Requirement Description:
            </label>
            <textarea
              id="jobRequirement"
              rows={6}
              value={jobRequirement}
              onChange={(e) => setJobRequirement(e.target.value)}
              placeholder="Paste or type the job requirement details here"
              className="w-full rounded-md border border-gray-300 p-3 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzeDisabled}
            className={`w-full py-3 rounded-md font-semibold text-white transition-colors
              ${isAnalyzeDisabled ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" /> Analyzing...
              </span>
            ) : (
              'Analyze CV'
            )}
          </button>

          {/* Error messages */}
          {generalError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md flex items-start gap-2">
              <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          {apiError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md">
              <div className="flex items-start gap-2 mb-2">
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                <span>{apiError.message}</span>
              </div>
              {apiError.details && (
                <details className="text-sm mt-1">
                  <summary className="cursor-pointer">Details</summary>
                  <pre className="bg-white p-2 mt-1 rounded overflow-auto">{apiError.details}</pre>
                </details>
              )}
            </div>
          )}

          {/* Result section */}
          {result && (
            <div className="bg-purple-50 border border-purple-300 rounded-md p-6 space-y-4">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-20 h-20"
                    aria-label="Match percentage"
                  >
                    <path
                      className="text-gray-300"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-600"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset={strokeDashoffset}
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text
                      x="18"
                      y="20.35"
                      className="fill-purple-700 text-lg font-bold"
                      textAnchor="middle"
                    >
                      {progress}%
                    </text>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-700">
                    CV Match Analysis
                  </h3>
                  <p className="text-gray-700">{result.summary}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <InfoList title="Missing Technical Skills" items={result.missing_technical_skills} />
                <InfoList title="Missing Soft Skills" items={result.missing_soft_skills} />
                <InfoList title="Suggested Courses/Training" items={result.suggested_courses} />
                <InfoList title="Suggested Alternative Jobs" items={result.suggested_jobs} />
                <InfoList title="Strengths" items={result.strengths} />
                <InfoList title="Weaknesses" items={result.weaknesses} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoList = ({ title, items }) => (
  <div>
    <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
      <FiClipboard /> {title}
    </h4>
    {items && items.length > 0 ? (
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-400 italic">None identified</p>
    )}
  </div>
);

export default CVAnalyzer;