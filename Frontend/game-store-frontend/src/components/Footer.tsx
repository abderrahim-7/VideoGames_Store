import type { IconType } from "react-icons";

interface Props {
  icons: IconType[];
  text: string;
  links: string[];
}

const Footer = ({ icons, text, links }: Props) => {
  return (
    <div className="relative bg-black text-white p-4 text-center gap-4 flex flex-col items-center after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-[#FFD700] after:to-[#C0C0C0]">
      <div className="flex">
        {icons.map((icon) => (
          <div key={icon.name}>
            {icon({
              className:
                "w-15 h-15 mx-2 cursor-pointer fill-[#C0C0C0] hover:fill-white transition-fill duration-300",
            })}
          </div>
        ))}
      </div>
      <div className="w-2/3 text-[#C0C0C0] ">
        <p>{text}</p>
      </div>
      <div className="flex gap-3 cursor-pointer text-[#C0C0C0] transition-fill duration-300">
        {links.map((link) => (
          <span key={link} className="hover:text-white">
            {link}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Footer;
