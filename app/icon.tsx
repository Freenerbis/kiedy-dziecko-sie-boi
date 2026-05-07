import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#1a3a2a',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background: '#E8614A',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 10,
              height: 2,
              background: 'white',
              borderRadius: 1,
              boxShadow: '0 3px 0 white, 0 6px 0 white',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
