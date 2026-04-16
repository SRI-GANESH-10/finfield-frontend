'use client'
import { useUserStore } from "@/store/user.store";
import { UserAvatar } from "./AvatarWithName";
import { Logo } from "./Logo"
import { useRouter } from "next/navigation";

const Navbar = () => {
    
    const user = useUserStore((state)=>state.user)

    const router = useRouter();
    const handleOnClick = () =>{    
        router.push('/product/profile')
    }
    return (
        <div className="bg-white border-b flex justify-between items-center px-4">
            <Logo />
            <UserAvatar name={user?.name || "Test Na"} onClick={handleOnClick}/>
        </div>
    )
}

export default Navbar;