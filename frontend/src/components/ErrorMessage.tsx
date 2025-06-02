import { type FC } from 'react';

type ErrorMessageProps = {
    title?: string;
    message?: string;
    className?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({
    title = 'Oops! Something went wrong.',
    message = 'Please try again later or check your connection.',
    className = '',
}) => {
    return (
        <div
            className={`max-w-xl mx-auto mt-16 px-6 py-8 bg-red-50 border border-red-200 rounded-lg shadow-sm text-center ${className}`}
        >
            <div className="flex flex-col items-center">
                <svg
                    className="w-10 h-10 text-red-500 mb-4 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h2 className="text-2xl font-semibold text-red-700">{title}</h2>
                <p className="mt-2 text-gray-700">{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;
