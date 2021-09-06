const Input = ({ id, label, setValue, value, ...props }) => {
  return (
    <>
      <label htmlFor={ id }>{ label }</label>
      <input
        id={ id }
        name={ id }
        value={ value }
        onChange={({ target }) => setValue(target.value)}
        {...props}
      />
    </>
  );
}

export default Input;
