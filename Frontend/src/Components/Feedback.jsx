import React from 'react'
import { RxCross2 } from "react-icons/rx";

const Feedback = ({ Closeref, setOpenFeedback }) => {
  return (
    <>
        <div
      className="fixed inset-0 z-50 bg-black/20 bg-opacity-40 backdrop-blur-xs  flex justify-center items-center"
    >
      <div
        className="relative bg-green-100 w-96 rounded-xl shadow-2xl p-8 m-3 max-h-[80vh] overflow-y-auto"
      >
       
        <button
          className="absolute cursor-pointer top-5 right-5 text-gray-600 hover:text-red-500 transition-all"
          onClick={() => setOpenFeedback(false)}
            ref={Closeref}
        >
          <RxCross2 size={24} />
        </button>


        <h2 className="lg:text-xl text-[1.15rem]  lg:mt-3 mt-4 font-bold text-center lg:mb-5 mb-4 text-green-700">
          We’d Love Your Feedback 💬
        </h2>


        <form className="flex flex-col gap-4 text-black ">

          <input
            type="text"
            placeholder="Your Name"
            className="p-2 rounded-md border font-mono border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-2 rounded-md border font-mono  border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            rows="4"
            placeholder="Your Feedback..."
            className="p-2 rounded-md border font-mono  border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          ></textarea>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-all"
                onClick={() => setOpenFeedback(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Feedback