import { type IconType } from 'react-icons';
import clsx from 'clsx';
import { logout } from '@/actions';
import { redirect } from 'next/navigation';

interface Props {
  Icon: IconType;
  action: 'login' | 'logout';
  redirectTo?: string;
  size?: number;
  onClick?: () => void;
}

export const AuthButton = ({
  Icon,
  size = 30,
  action,
  redirectTo,
  onClick = () => {},
}: Props) => {
  const authAction = () => {
    if (action === 'login') {
      logout();
      onClick();
    } else {
      onClick();
      logout();
      if(redirectTo) {
        redirect(redirectTo);
      }
    }
  };

  return (
    <button
      onClick={authAction}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
      <Icon color={action === 'login' ? 'blue' : 'red'} size={size} />
      <span
        className={clsx('ml-3 text-xl', {
          'text-blue-800': action === 'login',
          'text-red-500': action === 'logout',
        })}
      >
        {action.at(0)?.toUpperCase() + action.slice(1)}
      </span>
    </button>
  );
};
