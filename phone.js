const loadPhone = async(searchText)=>{
    console.log(searchText)
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    //  console.log(res)
    const data = await res.json();
    // console.log(data)
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
    
}

const displayPhones = phones =>{
      const phoneContainer = document.getElementById('phone-container');
        phoneContainer.textContent = '';
    
    phones.forEach(phone => {
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
     <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
       </div>
     </div>
        `;

        phoneContainer.appendChild(phoneCard)
    });
}

const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);
}
const handleSearch2 = () =>{
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText)
}

// loadPhone()