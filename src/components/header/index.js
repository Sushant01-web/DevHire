'use client'

import { AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function Header({ user, profileInfo }) {

    // Importing theme
    const { theme, setTheme } = useTheme()

    const isLoaded = useUser()

    // Track previous state
    const prevUserRef = useRef(null);

    useEffect(() => {
        if (!isLoaded) return;

        // ✅ Show toast only when user changes from null → logged in
        if (!prevUserRef.current && user) {
            toast.success("Login Successful 🎉");
        }

        prevUserRef.current = user;
    }, [user, isLoaded]);


    // Collection of Menu Items to render in dialog
    const MenuItems = [
        {
            label: 'Home',
            path: '/',
            show: true
        },
        {
            label: 'Login',
            path: '/sign-in',
            show: !user,
        },
        {
            label: 'Register',
            path: '/sign-up',
            show: !user,
        },
        {
            label: 'Jobs',
            path: '/jobs',
            show: profileInfo,
        },
        {
            label: 'Feed',
            path: '/feed',
            show: true
        },
        {
            label: 'Activity',
            path: '/activities',
            show: profileInfo?.role === 'candidate',
        },
        {
            label: 'Company',
            path: '/companies',
            show: profileInfo?.role === 'candidate',
        },
        {
            label: 'Membership',
            path: '/membership',
            show: profileInfo,
        },
        {
            label: 'Account',
            path: '/account',
            show: profileInfo,
        },
    ]

    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='lg:hidden'>
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle</span>

                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link className="mr-6 hidden lg:flex" href={'#'}>
                            <h2 className="text-3xl flex justify-center font-bold">DevHire</h2>
                        </Link>

                        <div className="grid gap-2 py-6">
                            {/* Render Menu Items */}
                            {MenuItems.map(item => item?.show ?
                                <Link href={item.path} className="flex w-full items-center py-2 text-xl font-semibold">{item.label}</Link>
                                : null)}
                            <UserButton afterSignOutUrl='/' />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="lg:flex mr-6 text-3xl flex justify-center font-bold" href={'/'}>DevHire</Link>

                <nav className="ml-auto hidden lg:flex gap-6 items-center">
                    {/* Again Mapping Menu items in Navbar */}
                    {MenuItems.map(item => item?.show ?
                        <Link key={item.label}
                            href={item.path}
                            className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-xl font-medium"
                            onClick={() => sessionStorage.removeItem('filterParams')}>{item.label}</Link>
                        : null)}
                    <UserButton afterSignOutUrl='/' />
                </nav>
            </header>
        </div>
    )
}