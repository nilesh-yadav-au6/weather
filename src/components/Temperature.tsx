import useTemp from "../hooks/useTemp";

function Temperature({ temperature }: { temperature: number }) {
  const temp = useTemp(temperature);
  return temp;
}

export default Temperature;
