import styled from "styled-components";
import { useState } from "react";

const BarcodeForm = ({ setName, setCalories }) => {
  const [barcode, setBarcode] = useState("");
  const [servingSize, setServingSize] = useState("");

  const handleSubmitBarcode = (e, barcode, servingSize) => {
    e.preventDefault();

    servingSize = Number(servingSize);

    //Use https://openfoodfacts.github.io/api-documentation/ to get data on a product
    fetch(`https://world.openfoodfacts.org/api/v2/search?code=${barcode}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.products.length > 0) {
          setName(data.products[0].product_name);
          if (data.products[0].nutriments["energy-kcal_100g"]) {
            setCalories(
              Math.round(
                (servingSize / 100) *
                  data.products[0].nutriments["energy-kcal_100g"]
              )
            );
          }
        }
        setBarcode("");
        setServingSize("");
      });
  };

  return (
    <BarcodeFormWrapper
      onSubmit={(e) => handleSubmitBarcode(e, barcode, servingSize)}
    >
      <div className="barcodeContainer">
        <label htmlFor="barcode">Search By Barcode</label>
        <input
          type="text"
          id="barcode"
          required={true}
          onChange={(e) => {
            setBarcode(e.target.value);
          }}
          value={barcode}
        />
      </div>
      <div className="servingSizeContainer">
        <label htmlFor="servingSize">Serving Size (g)</label>
        <input
          type="number"
          id="servingSize"
          required={true}
          onChange={(e) => {
            setServingSize(e.target.value);
          }}
          value={servingSize}
        />
      </div>

      <input className="searchButton" type="submit" value="Search" />
    </BarcodeFormWrapper>
  );
};

const BarcodeFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .searchButton {
    background-color: white;
    border-radius: 5%;
    border-width: 1px;
    cursor: pointer;
  }

  .barcodeContainer {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .servingSizeContainer {
    display: flex;
    justify-content: space-between;
  }
`;
export default BarcodeForm;
