import { User } from "next-auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";

export interface userAvatarProps {
  user: User;
}

export default function UserAvatar({ user }: userAvatarProps) {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="proflie image"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
