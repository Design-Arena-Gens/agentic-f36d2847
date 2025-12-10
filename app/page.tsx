'use client';

import { useState, useEffect } from 'react';

interface DialogueLine {
  speaker: 'narrator' | 'listener';
  text: string;
  emotion?: string;
}

const storyDialogue: DialogueLine[] = [
  { speaker: 'narrator', text: 'आज मैं तुम्हें एक खबर नहीं… एक कहानी सुनाने वाला हूं।', emotion: 'गंभीर लेकिन सहज' },
  { speaker: 'listener', text: 'अरे, खबर नहीं? फिर क्या है?', emotion: 'हल्की जिज्ञासा' },
  { speaker: 'narrator', text: 'एक पिता की लड़ाई… अपनी ही सात साल की बेटी के लिए।', emotion: '' },
  { speaker: 'listener', text: 'सात साल? इतनी छोटी?', emotion: 'चौंकते हुए' },
  { speaker: 'narrator', text: 'हां… सूरत शहर का रहने वाला एक आम आदमी। उसका सपना था—बेटी पढ़े, खेले, हंसे… और एक दिन डॉक्टर बने।', emotion: '' },
  { speaker: 'listener', text: 'हर पिता का वही सपना होता है…', emotion: 'मुस्कुराकर' },
  { speaker: 'narrator', text: 'लेकिन सपना तब टूट गया, जब उसे पता चला कि बेटी को पढ़ाई से दूर… दीक्षा दिलाने की तैयारी हो चुकी है।', emotion: 'आवाज़ थोड़ी भारी' },
  { speaker: 'listener', text: 'दीक्षा? वो भी इतनी छोटी उम्र में?', emotion: 'सवालिया लहज़ा' },
  { speaker: 'narrator', text: 'हां… मां का फैसला था। मुंबई में सामूहिक दीक्षा समारोह। तारीख भी तय।', emotion: '' },
  { speaker: 'listener', text: 'और पिता?', emotion: 'धीमे स्वर में' },
  { speaker: 'narrator', text: 'वह चुप नहीं रहा। उसने कहा— "मेरी बेटी अभी बच्ची है… उसका बचपन मत छीनो।"', emotion: '' },
  { speaker: 'listener', text: 'लेकिन सुनी किसने?', emotion: '' },
  { speaker: 'narrator', text: 'यहां तक बात आ गई कि पत्नी ने कह दिया— "दीक्षा दिलाओगे तभी घर लौटूंगी।"', emotion: '' },
  { speaker: 'listener', text: 'ये तो बहुत मुश्किल हालात हैं…', emotion: 'आह भरते हुए' },
  { speaker: 'narrator', text: 'बेटी को पिता से दूर भेज दिया गया। मिलने तक नहीं दिया गया।', emotion: '' },
  { speaker: 'listener', text: 'फिर पिता ने क्या किया?', emotion: '' },
  { speaker: 'narrator', text: 'उसने कोर्ट का दरवाज़ा खटखटाया। अपनी बेटी के बचपन के लिए लड़ाई लड़ी।', emotion: '' },
  { speaker: 'listener', text: 'और फैसला?', emotion: '' },
  { speaker: 'narrator', text: 'कोर्ट ने कहा—बच्ची का हक है पढ़ने का, खेलने का। धर्म के नाम पर बचपन नहीं छीना जा सकता।', emotion: '' },
  { speaker: 'listener', text: 'तो बेटी को पिता के पास दे दिया?', emotion: '' },
  { speaker: 'narrator', text: 'हां… और ये फैसला सिर्फ एक पिता की जीत नहीं—हर बच्चे के अधिकार की जीत है।', emotion: '' },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<DialogueLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPlaying && !isPaused && currentIndex < storyDialogue.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, storyDialogue[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (currentIndex >= storyDialogue.length) {
      setIsPlaying(false);
    }
  }, [currentIndex, isPlaying, isPaused]);

  const handleStart = () => {
    if (currentIndex >= storyDialogue.length) {
      setCurrentIndex(0);
      setDisplayedLines([]);
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(0);
    setDisplayedLines([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-orange-900 dark:text-orange-100 mb-3 md:mb-4" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            एक पिता की लड़ाई
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            सूरत के एक पिता की अपनी बेटी के बचपन की लड़ाई
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 md:p-8 mb-6 md:mb-8 min-h-[400px] md:min-h-[500px] max-h-[600px] overflow-y-auto">
          {displayedLines.length === 0 && !isPlaying && (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-base md:text-lg" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              कहानी शुरू करने के लिए "शुरू करें" बटन दबाएं
            </div>
          )}

          <div className="space-y-4 md:space-y-6">
            {displayedLines.map((line, index) => (
              <div
                key={index}
                className={`animate-fade-in ${
                  line.speaker === 'narrator'
                    ? 'text-left'
                    : 'text-right'
                }`}
              >
                <div className={`inline-block max-w-[85%] md:max-w-[80%] ${
                  line.speaker === 'narrator'
                    ? 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                } rounded-2xl p-3 md:p-4 shadow-md`}>
                  <div className="font-semibold text-xs md:text-sm mb-1 md:mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {line.speaker === 'narrator' ? 'कथावाचक' : 'श्रोता'}
                    {line.emotion && (
                      <span className="ml-2 text-xs opacity-75">({line.emotion})</span>
                    )}
                  </div>
                  <div className="text-sm md:text-lg leading-relaxed" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {line.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
          {!isPlaying && (
            <button
              onClick={handleStart}
              className="px-6 md:px-8 py-3 md:py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all transform hover:scale-105"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              {currentIndex === 0 ? 'शुरू करें' : 'फिर से शुरू करें'}
            </button>
          )}

          {isPlaying && !isPaused && (
            <button
              onClick={handlePause}
              className="px-6 md:px-8 py-3 md:py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all transform hover:scale-105"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              रोकें
            </button>
          )}

          {isPaused && (
            <button
              onClick={handleResume}
              className="px-6 md:px-8 py-3 md:py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all transform hover:scale-105"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              जारी रखें
            </button>
          )}

          {displayedLines.length > 0 && (
            <button
              onClick={handleReset}
              className="px-6 md:px-8 py-3 md:py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all transform hover:scale-105"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              रीसेट करें
            </button>
          )}
        </div>

        <footer className="mt-8 md:mt-12 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          <p>एक सच्ची कहानी जो हर बच्चे के अधिकार की बात करती है</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}
