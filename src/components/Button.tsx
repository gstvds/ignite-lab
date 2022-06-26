import { ExoticComponent } from 'react';
import { IconProps } from 'phosphor-react';

interface ButtonProps {
  to: string;
  variant: 'primary' | 'secondary';
  title: string;
  icon: ExoticComponent<IconProps>;
}

export function Button({
  to, variant, title, icon: Icon,
}: ButtonProps) {
  return (
    <a
      href={to}
      className={
        variant === 'primary'
          ? 'p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors'
          : 'p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors'
      }
    >
      <Icon size={24} />
      {title}
    </a>
  );
}
