function DisplayData(inputValue) {
  const unitCount = 8;
  const fixedCharg = 120;
  var BillAmount = 0;

  if (inputValue <= 30) {
    BillAmount = inputValue * unitCount + fixedCharg;
    console.log(BillAmount);
    const div = document.getElementById("val");
    div.innerHTML += BillAmount;
  } else if (inputValue > 30 && inputValue <= 60) {
    BillAmount = inputValue * unitCount + fixedCharg;
    console.log(BillAmount);
    const div = document.getElementById("val");
    div.innerHTML += BillAmount;
  } else if (inputValue > 60 && inputValue <= 90) {
    BillAmount = inputValue * unitCount + fixedCharg;
    console.log(BillAmount);
    const div = document.getElementById("val");
    div.innerHTML += BillAmount;
  } else if (inputValue > 90 && inputValue <= 120) {
    BillAmount = inputValue * unitCount + fixedCharg;
    console.log(BillAmount);
    const div = document.getElementById("val");
    div.innerHTML += BillAmount;
  } else if (inputValue > 120 && inputValue <= 180) {
    BillAmount = inputValue * unitCount + fixedCharg;
    console.log(BillAmount);
    const div = document.getElementById("val");
    div.innerHTML += BillAmount;
  } else if (inputValue > 180) {
    BillAmount = inputValue * unitCount + fixedCharg;
    console.log(BillAmount);
    const div = document.getElementById("val");
    div.innerHTML += BillAmount;
  }
}
