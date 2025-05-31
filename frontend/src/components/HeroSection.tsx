import { assets } from '@constants/assets';

export default function HeroSection() {
    return (
        <div className='relative mx-8 sm:mx-16 xl:mx-24'>

            <div className='mt-20 mb-8 text-center'>
                <div className='inline-flex items-center justify-center gap-4 px-6 py-2 mb-4 text-sm border border-gray-300 rounded-full bg-primary/10'>
                    <p>New: AI feature intergrated</p>
                    <img
                        src={assets.star_icon}
                        alt="Star Icon"
                        className='w-2.5'
                    />
                </div>

                <div>
                    <h1 className='text-3xl font-semibold text-gray-700 sm:text-6xl sm:leading-tight'>Your own <span className='text-primary'>blogging</span>  <br />platform.</h1>
                    <p className='max-w-2xl mx-auto my-6 text-lg font-normal text-gray-500 sm:my-8 max-sm:text-xs'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>

                    <form className='flex justify-between max-w-lg mx-auto overflow-hidden bg-white border border-gray-300 rounded-md shadow-xs max-sm:scale-75 gap-x-1.5 p-1.5'>

                        <input
                            type="text"
                            placeholder='Search for blogs'
                            className='flex-1 px-4 py-3 outline-none'
                            required
                        />
                        <button type="submit" className='px-8 py-3 text-white transition-all rounded-md cursor-pointer bg-primary hover:scale-105'>Search</button>
                    </form>
                </div>
            </div>

            <img
                src={assets.gradientBackground}
                alt="Gradient Background"
                className='absolute opacity-50 -top-50 -z-1'
            />
        </div>
    )
}
