type ButtonProps = {
  text: string;
  eventOnClick: () => void;
};

function Button({ text, eventOnClick }: ButtonProps) {
  return (
    <>
      <button onClick={eventOnClick} >{text}</button>
    </>
  );
}

export default Button;
