export default function SelectBtn({ optionName, optionValue, setFunc }) {
  return (
    <select
      className="select select-primary w-full max-w-xs"
      onChange={(e) => setFunc(e.target.value)}
    >
      <option disabled selected>
        {optionName}
      </option>
      {optionValue.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
}
