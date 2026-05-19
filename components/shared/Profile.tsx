'use client'

import { useUserStore } from "@/store/user.store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, User, Shield, Calendar } from "lucide-react"

const ProfilePage = () => {
  const user = useUserStore((state) => state.user)

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"

  return (
    <div className="bg-background p-6 md:p-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardContent className="px-6 py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarFallback className="bg-primary text-primary-foreground text-base font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h1 className="text-xl font-semibold tracking-tight">{user?.name ?? "—"}</h1>
                  <p className="text-sm text-muted-foreground">{user?.email ?? "—"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">
              Account Details
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <DetailRow icon={<User className="size-4 text-primary" />} label="Full Name" value={user?.name} />
            <Separator />
            <DetailRow icon={<Mail className="size-4 text-primary" />} label="Email Address" value={user?.email} />
            <Separator />
            <DetailRow icon={<Shield className="size-4 text-primary" />} label="Account ID" value={user?.id} mono />
            <Separator />
            <DetailRow icon={<Calendar className="size-4 text-primary" />} label="Member Since" value="April 2026" />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

type DetailRowProps = {
  icon: React.ReactNode
  label: string
  value?: string
  mono?: boolean
}

const DetailRow = ({ icon, label, value, mono }: DetailRowProps) => (
  <div className="flex items-center gap-3">
    <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-medium truncate ${mono ? "font-mono" : ""}`}>
        {value ?? "—"}
      </p>
    </div>
  </div>
)

export default ProfilePage;