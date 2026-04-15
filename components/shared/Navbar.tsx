'use client'
import { useUserStore } from "@/store/user.store";
import { UserAvatar } from "./AvatarWithName";
import { Logo, LogoWithName } from "./Logo"

const Navbar = () => {
    
    const user = useUserStore((state)=>state.user)
    return (
        <div className="bg-white border-b flex justify-between items-center px-4">
            <Logo />
            <UserAvatar name={user?.name || "Test Na"}/>
        </div>
    )
}

export default Navbar;