export default function Display(props) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-600 text-sm">{props.label}</p>
      <p className="text-2xl md:text-5xl font-bold">{props.value}</p>
    </div>
  );
}
