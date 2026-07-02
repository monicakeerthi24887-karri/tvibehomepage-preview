import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to right, #9b2cff, #ff4fa3, #ff6b00)',
          borderRadius: '50%',
          color: 'white',
          fontSize: '22px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        T
      </div>
    ),
    { ...size }
  );
}
