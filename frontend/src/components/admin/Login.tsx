import { useState, type ChangeEvent } from 'react'

const INITIAL_STATE = {
    email: "",
    password: ""
}


export default function Login() {
    const [credentials, setCredentials] = useState(INITIAL_STATE);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: send the credentials to backend
        console.log("Sending the credentials...", credentials);
    }


    return (
        <div className='grid h-screen border place-items-center p-2 md:p-0'>

            <div className='w-full max-w-sm p-6 border rounded-lg shadow-xl max-md:m-6 border-primary/30 shadow-primary/15'>
                <div className='text-center py-8'>
                    <h1 className='mb-1 text-4xl font-semibold'> <span className='text-primary'>Admin</span> Login</h1>
                    <p className='text-gray-600'>Enter your credentials to access the admin panel</p>
                </div>

                <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-gray-700'>Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Your email id'
                            className='py-3 transition-all border-b-2 border-gray-300 outline-none focus:border-primary/90 focus:caret-primary/90'
                            onChange={handleChange}
                            value={credentials.email}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='text-gray-700'>Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Your password'
                            className='py-3 transition-all border-b-2 border-gray-300 outline-none focus:border-primary/90 focus:caret-primary/90'
                            onChange={handleChange}
                            value={credentials.email}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full py-3.5 shadow-sm transition hover:opacity-95 cursor-pointer text-white rounded-md bg-primary'
                        >Login</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
