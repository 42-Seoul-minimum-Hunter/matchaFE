function CheckBox({
  title,
  //   disabled,
  checked,
  onChange,
}: {
  //   title: React.ReactNode;
  title: string;
  //   disabled: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label>
      <input
        type="checkbox"
        // disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {title}
    </label>
  );
}

export default CheckBox;
