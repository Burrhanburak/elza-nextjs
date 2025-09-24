
'use client'
import { Logo } from '@/components/logo'
import { 
    Menu, 
    X, 
    Home, 
    Briefcase, 
    Users, 
    MessageCircle,
    Settings,
    Code,
    Palette,
    BookOpen,
    Trophy,
    Newspaper,
    Building,
    UserRoundCog
} from 'lucide-react'
import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/navigation'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { CaretDownIcon } from "@radix-ui/react-icons"
import { getCalApi } from "@calcom/embed-react"
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Button } from './ui/button'

type NavRoute = '/' | '/services' | '/about' | '/contact' | '/poems' | '/blog' | '/books';

const menuItems: { name: string; href: NavRoute }[] = [
    { name: 'home', href: '/' },
    { name: 'about', href: '/about' },
    { name: 'services', href: '/services' },
    { name: 'poems', href: '/poems' },
    { name: 'blogs', href: '/blog' },
   ,
    { name: 'books', href: '/books' },

    { name: 'contact', href: '/contact' },
]

export default function Header() {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const t = useTranslations('nav')
    const pathname = usePathname()


  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="fixed  top-0 left-0 right-0 z-50 border-b border-transparent transition duration-200 ease-in-out">
            
            <div className="mx-auto w-full max-w-7xl px-6 relative">
                <div 
                    className={cn(
                        "mx-auto backdrop-blur-[15px] bg-[#fef6f154] rounded-[20px] transition-all duration-300 mt-4 mb-4",
                        isScrolled 
                            ? "max-w-[650px] md:max-w-[800px]" 
                            : "max-w-[650px] md:max-w-[1140px]",
                        menuState 
                            ? "flex flex-col gap-5 px-5 py-3 md:px-5 md:py-3" 
                            : "flex items-center justify-between px-4 py-2 md:px-4 "
                    )}
                >
                    {/* Main Nav Content */}
                    <div className="flex items-center justify-between w-full">
                        {/* Logo */}
                        <Link href="/" aria-label="home" className="flex items-center">
                            <Logo className='text-[#006241]/80' />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center">
                            <NavigationMenu.Root className="relative">
                                <NavigationMenu.List className="flex items-center mx-1">
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link asChild>
                                            <Link
                                                href="/"
                                                className={cn(
                                                    "h-[58px] flex items-center mx-1 py-1 text-sm font-extralight text-[#006241]/80 hover:text-[#006241]/60 focus-visible:text-[#006241]/80 lg:mx-3",
                                                    pathname === "/" && "text-[#006241]/80 font-semibold"
                                                )}
                                            >
                                                {t('home')}
                                            </Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className="h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#006241]/80 hover:text-[#006241]/60 focus-visible:text-[#006241]/80 lg:mx-3 group select-none gap-[2px] outline-none transition duration-150 ease-in-out">
                                            {t('services')}
                                            <CaretDownIcon className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:rotate-180" aria-hidden />
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className="absolute p-2 left-1/2 -translate-x-1/2 top-full mt-2 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
                                            <ul className="one m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr] bg-[#006241] rounded-[20px] border border-white/10 shadow-xl">
                                                <li className="row-span-3 grid">
                                                    <NavigationMenu.Link asChild>
                                                        <Link
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-white/20 to-white/10 p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-white/50"
                                                            href="/services"
                                                        >
                                                            <svg
                                                                aria-hidden
                                                                width="38"
                                                                height="38"
                                                                viewBox="0 0 25 25"
                                                                fill="white"
                                                            >
                                                                <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                                                                <path d="M12 0H4V8H12V0Z"></path>
                                                                <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                                                            </svg>
                                                            <div className="mb-[7px] mt-4 text-[18px] font-medium leading-[1.2] text-white">
                                                                {t('services')}
                                                            </div>
                                                            <p className="text-[14px] leading-[1.3] text-white/70">
                                                                {t('servicesDropdown.description')}
                                                            </p>
                                                        </Link>
                                                    </NavigationMenu.Link>
                                                </li>

                                                <ListItem href="/services/bioenergy" title={t('servicesDropdown.bioenergy.title')}>
                                                    {t('servicesDropdown.bioenergy.description')}
                                                </ListItem>
                                                <ListItem href="/services/biotherapy" title={t('servicesDropdown.biotherapy.title')}>
                                                    {t('servicesDropdown.biotherapy.description')}
                                                </ListItem>
                                                <ListItem href="/services/life-coaching" title={t('servicesDropdown.life-coaching.title')}> 
                                                    {t('servicesDropdown.life-coaching.description')}
                                                </ListItem>
                                                {/* <ListItem href="/services/biotherapy" title="Design">
                                                    Modern UI/UX design services.
                                                </ListItem> */}
                                            </ul>
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className="h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#006241]/80 hover:text-[#006241]/60 focus-visible:text-[#006241]/80 lg:mx-3 group select-none gap-[2px] outline-none transition duration-150 ease-in-out">
                                            {t('about')}
                                            <CaretDownIcon className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:rotate-180" aria-hidden />
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className="absolute  p-2  left-1/2 -translate-x-1/2 top-full mt-2 w-full sm:w-auto">
                                            <ul className="m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[700px] sm:grid-flow-col sm:grid-rows-4 bg-[#006241] rounded-[20px] border border-white/10 shadow-xl">
                                                <ListItem title={t('aboutDropdown.story.title')} href="/about">
                                                    {t('aboutDropdown.story.description')}
                                                </ListItem>
                                                <ListItem title={t('aboutDropdown.certificates.title')} href="/about/certificates-and-diploma">
                                                    {t('aboutDropdown.certificates.description')}
                                                </ListItem>
                                                <ListItem title={t('aboutDropdown.biography.title')} href="/about/biography">
                                                    {t('aboutDropdown.biography.description')}
                                                </ListItem>
                                             
                                                <ListItem title={t('aboutDropdown.awards.title')} href="/about/awards-achievements">
                                                    {t('aboutDropdown.awards.description')}
                                                </ListItem>
                                                <ListItem title={t('aboutDropdown.poems.title')} href="/poems">
                                                    {t('aboutDropdown.poems.description')}
                                                </ListItem>
                                                <ListItem title={t('aboutDropdown.books.title')} href="/books">
                                                    {t('aboutDropdown.books.description')}
                                                </ListItem>
                                               
                                            </ul>
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link asChild>
                                            <Link
                                                href="/contact"
                                                className={cn(
                                                    "h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#006241]/80 hover:text-[#006241]/60 focus-visible:text-[#006241]/80 lg:mx-3",
                                                    pathname === "/contact" && "text-[#006241]/80 font-semibold"
                                                )}
                                            >
                                                {t('contact')}
                                            </Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                </NavigationMenu.List>

                            </NavigationMenu.Root>
                        </div>
                        {/* Desktop Right Side */}
                        <div className="hidden md:flex items-center gap-4">
                            <LocaleSwitcher isScrolled={isScrolled} />
                            <button
                                     data-cal-namespace="30min"
                                     data-cal-link="elza-darya/30min"
                                     data-cal-config='{"layout":"month_view"}'
                                className={cn(
                                    "bg-white text-[#006241]/80 border border-[#006241]/80 rounded-[20px] font-semibold hover:bg-white/90 transition-all duration-300",
                                    isScrolled 
                                        ? "px-5 py-2.5 text-xs" 
                                        : "px-6 py-3 text-sm"
                                )}
                            >
                                {t('consultation')}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="md:hidden p-2 text-white"
                        >
                            {menuState ? (
                                <X className="h-6 w-6 text-[#006241]/80" />
            ) : (
                                <Menu className="h-6 w-6 text-[#006241]/80" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    {menuState && (
                        <div className="md:hidden flex flex-col gap-3">
                            <Link
                                href="/"
                                onClick={() => setMenuState(false)}
                                className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 text-base font-semibold py-2 px-3 rounded-lg hover:bg-white/10 flex items-center gap-3"
                                )}
                            >
                                <Home className="w-5 h-5" />
                                {t('home')}
                            </Link>
                            
                            <MobileDropdown title={t('services')} isActive={pathname.startsWith('/services')}>
                                <Link href="/services" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    (pathname === "/services" || pathname.includes("/services") && pathname.split('/').length === 2) 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <Briefcase className="w-4 h-4" />
{t('services')}
                                </Link>
                                <Link href="/services/bioenergy" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/services/bioenergy") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <Settings className="w-4 h-4" />
                                    {t('servicesDropdown.bioenergy.title')}
                                </Link>
                                <Link href="/services/biotherapy" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/services/biotherapy") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <UserRoundCog className="w-4 h-4" />
                                    {t('servicesDropdown.biotherapy.title')}
                                </Link>
                                <Link href="/services/life-coaching" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/services/life-coaching") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <UserRoundCog className="w-4 h-4" />
                                    {t('servicesDropdown.life-coaching.title')}
                                </Link>
                            </MobileDropdown>
                            
                            <MobileDropdown title={t('about')} isActive={pathname.startsWith('/about')}>
                                <Link href="/about" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/about") && pathname.split('/').length === 2
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <BookOpen className="w-4 h-4" />
                                    {t('aboutDropdown.story.title')}
                                </Link>
                                <Link href="/about/certificates-and-diploma" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/about/certificates-and-diploma") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <Users className="w-4 h-4" />
                                    {t('aboutDropdown.certificates.title')}
                                </Link>
                                <Link href="/about/biography" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/about/biography") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <Briefcase className="w-4 h-4" />
                                    {t('aboutDropdown.biography.title')}
                                </Link>
                         
                                <Link href="/about/awards-achievements" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/about/awards-achievements") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <Trophy className="w-4 h-4" />
                                    {t('aboutDropdown.awards.title')}
                                </Link>
                                <Link href="/poems" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/poems") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <BookOpen className="w-4 h-4" />
                                    {t('aboutDropdown.poems.title')}
                                </Link>
                                <Link href="/books" onClick={() => setMenuState(false)} className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 py-2 px-4 rounded-lg flex items-center gap-3",
                                    pathname.includes("/books") 
                                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                                        : "hover:bg-white/10 active:bg-white/15 active:scale-95"
                                )}>
                                    <BookOpen className="w-4 h-4" />
                                    {t('aboutDropdown.books.title')}
                                </Link>
                            </MobileDropdown>
                            
                            <Link
                                href="/contact"
                                onClick={() => setMenuState(false)}
                                className={cn(
                                    "text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 flex items-center gap-3"
                                )}
                            >
                                <MessageCircle className="w-5 h-5" />
                                {t('contact')}
                            </Link>
                            
                            <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
                                <div className="flex items-center justify-center">
                                </div>
                                <LocaleSwitcher isScrolled={isScrolled} />
                                <button
                                   
                                    onClick={() => setMenuState(false)}
                                    data-cal-namespace="30min"
                                    data-cal-link="elza-darya/30min"
                                    data-cal-config='{"layout":"month_view"}'
                                    className="bg-white text-[#006241]/80 px-6 py-3 rounded-[60px] text-base font-semibold hover:bg-white/90 transition-colors duration-150 text-center"
                                >
                                    {t('consultation')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<HTMLAnchorElement, { href: string; title: string; className?: string; children?: React.ReactNode }>(
    ({ className, children, title, href, ...props }, forwardedRef) => (
        <li>
            <NavigationMenu.Link asChild>
                <Link
                    href={href as any}
                    className={cn(
                        "block select-none rounded-md p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:shadow-[0_0_0_2px] focus:shadow-white/20",
                        className
                    )}
                    {...props}
                    ref={forwardedRef}
                >
                    <div className="mb-[5px] font-medium leading-[1.2] text-white">
                        {title}
                    </div>
                    <p className="leading-[1.4] text-white/80">{children}</p>
                </Link>
            </NavigationMenu.Link>
        </li>
    ),
);

ListItem.displayName = "ListItem";

const MobileDropdown = ({ title, children, isActive }: { title: string; children: React.ReactNode; isActive: boolean }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between text-[#006241]/80 hover:text-[#006241]/60 transition-all duration-150 text-base font-medium py-2 px-3 rounded-lg",
                    (isActive || isOpen)
                        ? "bg-white/20 text-[#006241]/80 font-semibold backdrop-blur-sm" 
                        : "hover:bg-white/10"
                )}
            >
                {title}
                <CaretDownIcon className={cn(
                    "opacity-70 transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>
            {isOpen && (
                <div className="mt-2 pl-2 space-y-1">
                    {children}
                </div>
            )}
        </div>
    );
};
