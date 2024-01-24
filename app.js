const BASE_URL =
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn =document.querySelector(".ok");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) { 
  for (currCode in countryList) {  // fetching all the currencies from countrylist  (codes.js file)
    let newOption = document.createElement("option");   // creating an option 
    newOption.innerText = currCode;      // updating the option one by one 
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {    // these lines are bascially used to set the default interface 
                                                         //whenever user opens the page they will find usd and inr default
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);  // here we have appended all the country codes and currency codes in select option
  }
  select.addEventListener("change",(evt)=>{   // when a user clicks on the dropdown option ,we will fire an event 

    updateFlag(evt.target);    // of 'change ' and pass its value to update flag func 

  });

}
const updateFlag= (element)=>{
  let currCode=element.value;    
  let countryCode= countryList[currCode];
  let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;  // in this code we are chainging the flags 
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
};

btn.addEventListener('click', async(evt)=>{
  evt.preventDefault();
  let amount=document.querySelector(".amount input");
  let amtVal=amount.value;
  if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value="1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let  data= await response.json();
  console.log(data);
  let rate= data[toCurr.value.toLowerCase()];
let finalAmount = Math.floor(amtVal*rate);
msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});


// fetching the currency codes and appending in select
//firing an event listener 