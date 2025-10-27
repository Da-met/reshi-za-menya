import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }

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
          backgroundColor: 'black',
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          borderRadius: 4,
        }}
      >
        Р
      </div>
    ),
    { ...size }
  )
}