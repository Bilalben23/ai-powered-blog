import { assets } from "@constants/assets";
import { footerData } from "@constants/footerData";
import { Link } from "react-router-dom";

export default function Footer({ classes = "bg-primary/5" }: { classes?: string }) {
    const fullYear = new Date().getFullYear();

    return (
        <footer className={`px-6 text-gray-500 sm:px-10 md:px-16 lg:px-24 xl:px-32 mt-30 ${classes}`}>
            <div className="flex flex-col gap-10 py-10 md:flex-row md:justify-between md:items-start">
                {/* Logo + Description */}
                <div className="w-full md:w-1/2">
                    <img
                        src={assets.logo}
                        alt="QuickBlog Logo"
                        className='w-28 sm:w-36 md:w-40'
                    />
                    <p className="max-w-md mt-6 text-sm font-light leading-relaxed">
                        QuickBlog is your place to write, read, and discover. From tech insights to lifestyle tips, explore what matters to you.
                    </p>
                </div>

                {/* Link Columns */}
                <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 md:w-1/2">
                    {footerData.map((section, index) => (
                        <div key={index}>
                            <p className="mb-3 font-medium text-gray-900">{section.title}</p>
                            <ul className="space-y-2 text-sm">
                                {section.links.map((link, idx) => {
                                    const isExternal = link.href.startsWith("http");
                                    return (
                                        <li key={idx}>
                                            {isExternal ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="transition hover:underline hover:text-primary"
                                                    aria-label={link.label}
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={link.href}
                                                    className="transition hover:underline hover:text-primary"
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="py-5 border-t border-gray-300">
                <p className="text-sm text-center md:text-base">
                    &copy; {fullYear} QuickBlog. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
