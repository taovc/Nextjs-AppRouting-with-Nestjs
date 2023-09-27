import cn from "classnames";
import Link from 'next/link'
// import { useSettings } from '@/framework/settings';

const useSettings = () => {
  return {
    settings: {
      logo: {
        original:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Allocin%C3%A9_Logo_%282019%29.svg/640px-Allocin%C3%A9_Logo_%282019%29.svg.png",
      },
      siteTitle: "My Allocine",
    },
  };
};

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  }: any = useSettings();
  return (
    <Link href="/" className={cn("inline-flex", className)} {...props}>
      <span className="relative h-10 w-32 overflow-hidden md:w-40">
        <img
          src={logo?.original}
          alt={siteTitle}
          loading="eager"
        />
      </span>
    </Link>
  );
};

export default Logo;
