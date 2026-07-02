import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full min-h-[420px] flex items-center justify-center">
      <Image
        src="/Hero right image.jpg"
        alt="TVIBE platform ecosystem"
        width={1200}
        height={900}
        priority
        className="w-full max-w-[900px] h-auto object-contain rounded-[3rem] shadow-[0_30px_90px_rgba(178,44,255,0.22)]"
      />
    </div>
  );
}