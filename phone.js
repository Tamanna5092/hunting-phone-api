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

        // show all phone
        const showAllContainer = document.getElementById('show-all-container')
         if(phones.length > 12){
            showAllContainer.classList.remove('hidden');
         }
         else{
            showAllContainer.classList.add('hidden');
         }
        // display show first 9 phones
        phones = phones.slice(0,12);
    
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
    
        toggleLoadingDot(false);
}

const handleSearch = () =>{
    toggleLoadingDot(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);
}
const handleSearch2 = () =>{
    toggleLoadingDot(true);
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);
}

// loading Dot
const toggleLoadingDot = (isLoading) =>{
    const loadingDots = document.getElementById('loading-dots');
    if(isLoading){
        loadingDots.classList.remove('hidden');
    }
    else{
        
        loadingDots.classList.add('hidden');
    }
}

// loadPhone()