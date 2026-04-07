// src/components/Button.jsx

function Button({ text = "Klikk meg" }) {
  function handleClick() {
    alert('Du klikket på knappen!');
  }

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;