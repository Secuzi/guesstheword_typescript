import clsx from "clsx";

type ButtonProps = {
  letter: string;
};

export default function Button({ letter }: ButtonProps) {
  return <button className={clsx("letter-btn")}>{letter.toUpperCase()}</button>;
}
