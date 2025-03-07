import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer
      className="footer"
      onClick={() => window.open("https://github.com/Artem-Brui", "_blank")}
    >
      <div className="github-link">
        <h2>My GitHub Account</h2>
      </div>
    </footer>
  );
};

export default Footer;
