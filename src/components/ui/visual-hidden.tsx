import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface IProps {
  children: React.ReactNode;
}

const VisualHidden = ({ children }: IProps) => {
  return <VisuallyHidden.Root asChild>{children}</VisuallyHidden.Root>;
};

export default VisualHidden;
