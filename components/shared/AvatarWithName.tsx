"use client";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

type UserAvatarProps = {
  name: string;
  src?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  onClick?: () => void;
};

function getInitials(name: string) {
  if (!name) return "?";

  const parts = name
    .trim()
    .split(" ")
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return `${first}${last}`.toUpperCase();
}

export function UserAvatar({
  name,
  src,
  size = "default",
  className,
  onClick,
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className} onClick={onClick}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className="bg-primary/10 text-primary">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}