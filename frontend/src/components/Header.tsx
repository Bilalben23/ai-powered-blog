import { useState, useRef, useEffect } from "react";
import { assets } from "@constants/assets";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@hooks/useAuth";
import useLogout from "@hooks/useLogout";

export default function Header({ classes = "" }: { classes?: string }) {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { mutate: signOut, isPending } = useLogout();

    // Dropdown open state
    const [menuOpen, setMenuOpen] = useState(false);

    // Ref for the dropdown container
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown on button click
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);


    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            signOut();
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 0);
        }
    };

    return (
        <header
            className={`flex w-full items-center justify-between py-3 md:py-5 px-4 sm:px-16 xl:px-28 ${classes}`}
        >
            <button
                type="button"
                className="transition-opacity cursor-pointer hover:opacity-95"
                onClick={() => navigate("/")}
            >
                <img src={assets.logo} alt="logo" className="w-28 sm:w-36 md:w-40" />
            </button>

            <div ref={dropdownRef} className="relative">
                {isAuthenticated ? (
                    <>
                        <button
                            onClick={toggleMenu}
                            aria-haspopup="true"
                            aria-expanded={menuOpen}
                            aria-controls="profile-menu"
                            className="flex items-center px-2 py-1 font-medium transition cursor-pointer gap-x-2 hover:opacity-90"
                            type="button"
                        >
                            <img
                                alt={`Profile picture of ${user?.name ?? "user"}`}
                                src={assets.user_icon}
                                className="relative inline-block object-cover object-center w-10 h-10 rounded-full cursor-pointer"
                            />
                            <p className="text-sm">{user?.name}</p>
                        </button>

                        {menuOpen && (
                            <ul
                                id="profile-menu"
                                role="menu"
                                className="absolute right-0 mt-2 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none"
                            >
                                <li
                                    role="menuitem"
                                    className="w-full p-3 text-sm transition-all rounded-md cursor-pointer text-slate-800 hover:bg-slate-100"
                                >
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-x-2"
                                        onClick={() => setMenuOpen(false)} // close menu on navigation
                                    >
                                        <LayoutDashboard className="w-5 h-5 text-slate-400" />
                                        <p className="font-medium text-slate-800">Dashboard</p>
                                    </Link>
                                </li>

                                <hr className="my-2 border-slate-200" role="menuitem" />

                                <li
                                    role="menuitem"
                                    className="w-full p-3 text-sm transition-all rounded-md cursor-pointer text-slate-800 hover:bg-slate-100"
                                >
                                    <button
                                        type="button"
                                        className="flex items-center w-full gap-x-2 disabled:opacity-50"
                                        disabled={isPending}
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false); // close menu after logout
                                        }}
                                    >
                                        <LogOut className="w-5 h-5 text-slate-400" />
                                        <p className="ml-2 font-medium text-slate-800">Sign Out</p>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </>
                ) : (
                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 sm:px-8 md:px-10 text-sm md:text-base py-2.5 text-white rounded-full bg-primary transition-opacity hover:opacity-95 shadow-xs hover:shadow-none cursor-pointer"
                        onClick={() => navigate("/admin")}
                    >
                        Login
                        <img src={assets.arrow} alt="arrow-right" className="w-3" />
                    </button>
                )}
            </div>
        </header>
    );
}
