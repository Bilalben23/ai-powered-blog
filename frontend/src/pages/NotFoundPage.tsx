import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! The page you're looking for doesn't exist.</p>
            <p className="text-gray-500 mt-2">It might have been removed or you may have mistyped the URL.</p>
            <Link
                to="/"
                className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
            >
                Go back home
            </Link>
        </div>
    );
}
