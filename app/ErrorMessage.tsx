import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ErrorMessage(props: Props) {
  return <div>{props.children}</div>;
}
