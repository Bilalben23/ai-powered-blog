import useSubscribeNewsletter from "@hooks/useSubscribeNewsletter";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Newsletter() {
    const {
        register,
        handleSubmit,
        getValues,
        reset
    } = useForm({
        defaultValues: {
            email: ""
        }
    });

    const { mutate: subscribe, isPending } = useSubscribeNewsletter();

    function onSubmit() {
        subscribe(getValues(), {
            onSuccess: (data) => {
                toast.success(data.message);
                reset()
            },
            onError: (err) => {
                if (isAxiosError(err) && err.response) {
                    toast.error(err.response.data.message || "Subscription failed");
                } else {
                    toast.error("Something went wrong");
                }
            }
        })
    }


    return (
        <div className="px-2">
            <h2 className='mb-2 text-2xl font-medium text-center sm:text-3xl md:text-4xl'>Never Miss a Blog!</h2>
            <p className='text-center text-gray-500/70 md:text-lg'>Subscribe to get the latest blog, new tech, and exclusive news.</p>

            <form className="flex justify-center max-w-2xl mx-auto mt-6" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    {...register("email")}
                    placeholder='Enter your email id'
                    className='w-full px-4 py-2.5 sm:py-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md outline-none'
                    required
                />
                <button
                    type='submit'
                    className='px-3 sm:px-6 md:px-8 py-2.5 text-sm md:text-base disabled:opacity-75 sm:py-3 text-white rounded-r-md transition-all bg-primary/90 hover:bg-primary uppercase font-light cursor-pointer'
                    disabled={isPending}
                >
                    {
                        isPending ? "Subscribing..." : "Subscribe"
                    }
                </button>
            </form>

        </div>
    )
}
