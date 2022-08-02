import { createRef, useState } from 'react'
import { API } from '@aws-amplify/api'
import Image from 'next/image'
import * as EmailValidator from 'email-validator';


export default function LandingPage() {
  const [emailState, setEmailState] = useState("")
  const emailRef = createRef<HTMLInputElement>()

  const submitEmail = async () => {
    const emailAddress = emailRef.current?.value
    
    if (emailAddress && EmailValidator.validate(emailAddress)) {
      const emailAddressParams = {
        body: { emailAddress: emailRef.current.value }
      }
      if (!process.env.NEXT_PUBLIC_APIGATEWAY_NAME) {
        console.log('failed env')
        setEmailState("failed")
        return
      }
      const shit = await API.post(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, "/mailer", emailAddressParams)
      console.log(shit)
      setEmailState("succeeded")
    } else {
      console.log('failed vali')
      setEmailState("failed")
    }

  }

  return (
    <div className="h-full min-h-screen bg-gray-100 w-100">
      <div className="flex justify-center pt-4">
        <div className="absolute z-0 w-11/12 bg-blue-900 bg-opacity-20 md:w-screen 
    rounded-xl lg:w-10/12 xl:w-8/12 h-[25rem] md:mt-32"></div>
        <div className="z-10 mt-4 md:mt-0 w-96">
          <div className="px-4 pt-2">
            <div className="text-3xl md:mt-36">Make money with 1:1 communication</div>
            <div className="flex mt-5">
              <div className="">
                <div className="">Drop-in Talk is a simple direct messenger that you can add to any site.
                  Create your account to get your URL and add pay functionality through Stripe.</div>
                <div className="mt-4 mb-4 ">It&apos;s free to use</div>
                <input ref={emailRef} placeholder="Your email address" className="px-2 py-1 mb-2"></input>
                <div className="flex">
                <button
                  onClick={submitEmail}
                  className="flex items-center justify-center w-full px-5 py-3 mt-4 text-white transition bg-blue-500 rounded-md sm:mt-0 sm:w-auto group focus:outline-none focus:ring-1 focus:ring-yellow-400"
                >Join the Beta
                </button>
                <div className="m-3">{emailState === "failed" && '❌'}
                {emailState === "succeeded" && '✔️'}</div>
                </div>
                <div className="flex justify-center mt-14 md:hidden md:mt-0">
                  <Image alt="user website" width="307" height="615" src="/messagescreen.png"></Image>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="md:w-8 lg:w-10 xl:w-14 "></div>
        <div className="hidden mt-6 w-96 md:flex">
          <Image width="307" height="615" src="/messagescreen.png"></Image>
        </div>
      </div>
    </div>
  )
}