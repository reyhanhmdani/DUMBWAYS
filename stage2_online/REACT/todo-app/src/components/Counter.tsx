type CounterProps = {
  text: number;
};

export function Counter({ text }: CounterProps) {
  return <p>Nilai Counter: {text}</p>;
}

type counterProfileProps = {
  text: string;
};

export function CounterProfile({ text }: counterProfileProps) {
  return (
    <>
      <hr style={{ width: "10%" }} />
      <p>{text}</p>
    </>
  );
}
