type NavbarProps = {
  buttonName: string;
};

export default function Navbar({ buttonName }: NavbarProps) {
  return (
    <>
      <header>
        <nav>
          <img src="#" alt="Logo Here" />
          <ul>
            <li>Home</li>
            <li>About Me</li>
            <li>Socials</li>
          </ul>
          <button>{buttonName}</button>
        </nav>
      </header>
    </>
  );
}
