"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { X, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QRScannerModal({ isOpen, onClose }) {
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    
    // Clear previous errors when opening
    setError(null);

    const scanner = new Html5QrcodeScanner(
      "reader", 
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        // Success callback
        scanner.clear();
        onClose();
        
        // Assuming the QR code is a valid path like /draws/123 or /vendors/abc
        if (decodedText.startsWith("/") || decodedText.startsWith("http")) {
          if (decodedText.startsWith("http")) {
            const url = new URL(decodedText);
            router.push(url.pathname);
          } else {
            router.push(decodedText);
          }
        } else {
           alert("Scanned Code: " + decodedText);
        }
      },
      (errorMessage) => {
        // Error callback (called very frequently on every failed frame)
        // We usually ignore this unless we want to show a specific UI element
      }
    );

    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] p-8 relative shadow-2xl overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-siri-gradient" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#666666] hover:text-[#ff6b00] transition-colors bg-[#ffffff] p-2 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-[#ff6b00]/10 flex items-center justify-center mx-auto mb-3">
            <QrCode strokeWidth={2} className="h-6 w-6 text-[#ff6b00]" />
          </div>
          <h2 className="text-lg font-black uppercase tracking-widest text-[#1a1a1a]">
            Scan Vendor Code
          </h2>
          <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest mt-1">
            Scan a QR code at any vendor booth to enter their exclusive draws
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border-2 border-[#1a1a1a] shadow-inner relative bg-black min-h-[300px]" id="reader">
           {/* html5-qrcode will mount video here */}
        </div>
        
        <div className="mt-6 text-center">
           <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-[#666666] hover:text-[#1a1a1a] transition-colors">
             Cancel Scanning
           </button>
        </div>
      </div>
    </div>
  );
}
