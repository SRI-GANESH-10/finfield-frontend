import { useUserStore } from "@/store/user.store"

const ProfilePage = () =>{
    const user = useUserStore((state)=>state.user);

    return (
        <div>
            {user?.name}
        </div>
    )
}

export default ProfilePage;