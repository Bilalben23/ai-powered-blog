import { useState, type ChangeEvent } from "react"

export default function Newsletter() {
    const [email, setEmail] = useState("");


    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: subscribe the email. send the email to the backend
        console.log("sending....", email)
    }

    return (
        <div>
            <h2 className='mb-2 text-2xl font-medium text-center sm:text-3xl md:text-4xl'>Never Miss a Blog!</h2>
            <p className='text-center text-gray-500/70 md:text-lg'>Subscribe to get the latest blog, new tech, and exclusive news.</p>

            <form className="flex justify-center max-w-2xl mx-auto mt-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Enter your email id'
                    className='w-full px-4 py-2.5 sm:py-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md outline-none'
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required

                />
                <button
                    type='submit'
                    className='px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-white rounded-r-md transition-all bg-primary/90 hover:bg-primary uppercase font-light cursor-pointer'
                >Subscribe</button>
            </form>

        </div>
    )
}
