import { assets } from '@constants/assets';
import { useSearchContext } from '@hooks/useSearchContext';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

export default function Hero() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setSearchText } = useSearchContext();

    const { register, handleSubmit, getValues } = useForm({
        defaultValues: {
            searchText: ""
        }
    })


    function onSubmit() {
        setSearchText(getValues("searchText"));

        const currentParams = Object.fromEntries(searchParams.entries());
        const newParams = {
            ...currentParams,
            q: getValues("searchText")
        };
        setSearchParams(newParams);
    }


    return (
        <div className='relative mx-6 sm:mx-16 xl:mx-24'>

            <div className='mt-10 mb-4 text-center sm:mt-16 md:mt-20 sm:mb-8'>
                <div className='inline-flex items-center justify-center gap-4 px-6 py-2 mb-4 text-sm border border-gray-300 rounded-full bg-primary/10'>
                    <p>New: AI feature integrated</p>
                    <img
                        src={assets.star_icon}
                        alt="Star Icon"
                        className='w-2.5'
                    />
                </div>

                <div>
                    <h1 className='text-3xl font-semibold text-gray-700 sm:text-6xl sm:leading-tight'>Your own <span className='text-primary'>blogging</span>  <br />platform.</h1>
                    <p className='max-w-2xl mx-auto my-6 text-lg font-normal text-gray-500 sm:my-8 max-sm:text-base'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>

                    <form className='flex justify-between md:max-w-lg mx-auto bg-white border border-gray-300 rounded-md shadow-xs gap-x-1.5 p-1 sm:p-1.5' onSubmit={handleSubmit(onSubmit)}>

                        <input
                            type="text"
                            {...register("searchText")}
                            placeholder='Search for blogs'
                            className='w-full text-gray-500 px-4 py-2.5 sm:py-3 outline-none'
                        />
                        <button type="submit" className='p-2.5 sm:px-8 sm:py-3 text-white transition-all rounded-md cursor-pointer bg-primary hover:scale-105'>
                            <span className='hidden sm:inline'>Search</span>
                            <Search className='sm:hidden' />
                        </button>
                    </form>
                </div>
            </div>

            <img
                src={assets.gradientBackground}
                alt="Gradient Background"
                className='absolute opacity-50 -top-40 -z-1'
            />
        </div>
    )
}
