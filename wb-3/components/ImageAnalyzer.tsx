import React, { useState, useRef } from 'react';
import { Upload, Loader2, Camera, Eye } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';

const ImageAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Extract base64 data without prefix
        const base64Data = result.split(',')[1];
        const type = result.split(';')[0].split(':')[1];
        
        setSelectedImage(result); // For display (includes prefix)
        setMimeType(type);
        setAnalysis(''); // Clear previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setAnalysis('');

    // Remove the data URL prefix for the API call
    const base64Content = selectedImage.split(',')[1];
    
    const result = await analyzeImage(base64Content, mimeType);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto border-t border-neutral-900">
      <div className="text-center mb-12 space-y-4">
        <div className="flex items-center justify-center gap-3 text-purple-400">
           <Eye className="w-6 h-6" />
           <span className="uppercase tracking-widest text-sm font-semibold">AI Vision Studio</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Visual Deconstruction</h2>
        <p className="text-neutral-400 max-w-lg mx-auto">
          Upload an image to see how my digital twin interprets visual art using Gemini 3 Pro Vision.
        </p>
      </div>

      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Upload Area */}
          <div className="w-full md:w-1/2">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`aspect-square w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group
                ${selectedImage ? 'border-neutral-700' : 'border-neutral-700 hover:border-purple-500 hover:bg-neutral-800/50'}`}
            >
              {selectedImage ? (
                <>
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <p className="text-white font-medium">Change Image</p>
                    </div>
                </>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <Upload className="w-10 h-10 text-neutral-500 mx-auto" />
                  <p className="text-neutral-400 font-medium">Click to upload</p>
                  <p className="text-neutral-600 text-xs">JPG, PNG supported</p>
                </div>
              )}
            </div>

            {selectedImage && (
                <button 
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Camera className="w-4 h-4" />}
                    {loading ? "Analyzing..." : "Analyze Image"}
                </button>
            )}
          </div>

          {/* Analysis Result */}
          <div className="w-full md:w-1/2 min-h-[300px] flex flex-col">
            <h3 className="text-neutral-300 font-semibold mb-4 flex items-center gap-2">
                Analysis Result
                {loading && <span className="text-xs text-purple-400 animate-pulse">Thinking...</span>}
            </h3>
            <div className="flex-1 bg-black/40 rounded-lg p-6 border border-neutral-800 text-sm leading-relaxed text-neutral-300 overflow-y-auto max-h-[400px]">
                {loading ? (
                    <div className="flex flex-col gap-3 animate-pulse">
                        <div className="h-2 bg-neutral-800 rounded w-3/4"></div>
                        <div className="h-2 bg-neutral-800 rounded w-full"></div>
                        <div className="h-2 bg-neutral-800 rounded w-5/6"></div>
                        <div className="h-2 bg-neutral-800 rounded w-1/2"></div>
                    </div>
                ) : analysis ? (
                    <div className="prose prose-invert prose-sm">
                        {analysis}
                    </div>
                ) : (
                    <p className="text-neutral-600 italic">Analysis will appear here after you upload an image.</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageAnalyzer;
