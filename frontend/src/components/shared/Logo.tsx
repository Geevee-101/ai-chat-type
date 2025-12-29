import { Link } from "react-router-dom";

export function Logo() {
  return (
    <div className="flex mr-auto items-center gap-2">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="openai.png"
          alt="openai"
          width={30}
          height={30}
          className="image-inverted"
        />
        <span className="hidden md:block font-bold text-white">AI Chat</span>
      </Link>
    </div>
  );
}

export default Logo;
