import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
    region: process.env.NEXT_PUBLIC_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: process.env.NEXT_PUBLIC_AUTH_API_URL,
        region: process.env.NEXT_PUBLIC_REGION,
      },
    ],
  },
  Storage: {
    bucket: process.env.NEXT_PUBLIC_UPLOAD_BUCKET,
    region: process.env.NEXT_PUBLIC_REGION
}
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
