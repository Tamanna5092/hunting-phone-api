const loadPhone = async(searchText=(13),isShowAll)=>{
    console.log(searchText)
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    //  console.log(res)
    const data = await res.json();
    // console.log(data)
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
    
}

const displayPhones = (phones,isShowAll) =>{
      const phoneContainer = document.getElementById('phone-container');
        phoneContainer.textContent = '';

        // show all phone
        const showAllContainer = document.getElementById('show-all-container')
         if(phones.length > 12 && !isShowAll){
            showAllContainer.classList.remove('hidden');
         }
         else{
            showAllContainer.classList.add('hidden');
         }
         console.log('is Show All', isShowAll)
        // display show first 9 phones
        if(!isShowAll){
            phones = phones.slice(0,12);
        }
    
    phones.forEach(phone => {
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="phone" /></figure>
     <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p></p>
        <div class="card-actions justify-center">
          <button onclick="showAllDetails('${phone.slug}');show_modal_details.showModal()" class="btn btn-primary">Show details</button>
       </div>
     </div>
        `;

        phoneContainer.appendChild(phoneCard)
    });
    
        toggleLoadingDot(false);
}

const showAllDetails = async (id)=>{
    // console.log('show all details',id);
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetail(phone);
}

const showPhoneDetail = (phone)=>{
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name

    const showDetailsContainer = document.getElementById('show=details-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span class="text-lg">${phone?.slug}</span></p>
    <p><span class="text-lg">${phone?.mainFeatures?.chipSet}</span></p>
    <p><span class="text-lg">${phone?.mainFeatures?.storage}</span></p>
    <p><span class="text-lg">${phone?.mainFeatures?.displaySize}</span></p>
    <p><span class="text-lg">${phone?.mainFeatures?.memory}</span></p>
    <p><span class="text-lg">${phone?.mainFeatures?.sensors}</span></p>
    <p><span class="text-lg">${phone?.others?.GPS || 'No GPS available'}</span></p>
    <p><span class="text-lg">${phone?.others?.WLAN || 'No WLAN'}</span></p>
    <p><span class="text-lg">${phone?.releaseDate}</span></p>
    `

    // show modal
    show_modal_details.showModal();
}
// handle Search button
const handleSearch = (isShowAll) =>{
    toggleLoadingDot(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText,isShowAll);
}
// const handleSearch2 = () =>{
//     toggleLoadingDot(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     // console.log(searchText);
//     loadPhone(searchText);
// }

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

const showAllContainer = ()=>{
    handleSearch(true)
}

loadPhone()