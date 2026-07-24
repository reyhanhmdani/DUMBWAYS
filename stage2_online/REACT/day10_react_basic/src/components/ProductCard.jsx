import { useState } from "react";

export const ProductCard = ({ name, price, image, onAdd, onRemove }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [qty, setQty] = useState(0);

  const handleClickButton = () => {
    if (isAdded === false) {
      setIsAdded(true);
      setQty(1);
      onAdd();
    } else {
      setIsAdded(false);
      for (let i = 0; i < qty; i++) {
        onRemove();
      }
      setQty(0);
    }
  };

  const handleTambahQty = () => {
    setQty(qty + 1);
    onAdd();
  };

  const handleKurangiQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
      onRemove();
    } else {
      handleClickButton();
    }
  };

  return (
    <div className="card">
      <img
        src={image}
        alt={name}
        width={250}
        height={160}
      />
      <h3>{name}</h3>
      <p>Rp {price}</p>
      {isAdded ? (
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={handleKurangiQty}
            style={{
              width: "40px",
              backgroundColor: "#f3f4f6",
              color: "black",
            }}
          >
            -
          </button>
          <span style={{ fontWeight: "bold" }}>{qty}</span>
          <button
            onClick={handleTambahQty}
            style={{
              width: "40px",
              backgroundColor: "#f3f4f6",
              color: "black",
            }}
          >
            +
          </button>
        </div>
      ) : null}
      <button
        className={isAdded ? "btn-added" : "btn-normal"}
        onClick={handleClickButton}
      >
        {isAdded ? "Batal Beli ❌" : "Tambah ke Keranjang 🛒"}
      </button>
    </div>
  );
};
