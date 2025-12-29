import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link px-4 py-2 rounded-md font-medium transition-colors hover:opacity-90"
      to={props.to}
      style={{
        background: props.bg,
        color: props.textColor,
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
