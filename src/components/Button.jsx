// src/components/Button.jsx

function Button() {
  function handleClick() {
    alert('Du klikket på knappen!');
  }

  return (
    <button onClick={handleClick}>
      Klikk meg
    </button>
  );
}

export default Button;