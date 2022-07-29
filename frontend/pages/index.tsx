import type { NextPage } from 'next'
import Head from 'next/head'
import LandingPage from '../components/landingPage'
import '../configureAmplify'

const Home: NextPage = () => {
  console.log('process Index', process.env.NEXT_PUBLIC_REGION)
  return (
    <div>
      <Head>
        <title>Drop-in Talk</title>
        <meta name="description" content="html drop in messenger" />
        <link rel="icon" href="/chat.svg" />
      </Head>
      <LandingPage />
    </div>
  )
}

export default Home
