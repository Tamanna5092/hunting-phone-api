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
    console.log(data)
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