import { User } from "presentation/context/auth-context";
import { Avatar } from "./avatar-stack.styles";

const defaultProps = {
  maxAvatars: 2,
};
type Props = {
  users: User[];
  maxAvatars?: number;
} & typeof defaultProps;

export const AvatarStack: React.FC<Props> = ({ users, maxAvatars }) => {
  const remaining = users.length - maxAvatars;
  return (
    <div>
      {users.slice(0, maxAvatars).map((user, idx) => (
        <Avatar name={user.name} key={user.id} />
      ))}
      {remaining > 0 && <Avatar color="#f2f2f3" name={`+${remaining}`} />}
    </div>
  );
};
AvatarStack.defaultProps = defaultProps;
