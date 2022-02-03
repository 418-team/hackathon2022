export default function Button({ text = "Привет", onClick }) {
  return (
    <button type="button" className="mobile_header_button" onClick={onClick}>
      {text}
    </button>
  );
}
