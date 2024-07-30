const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
  if(phones.length){
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }
    // console.log('is ShowAll: ',isShowAll);
    // display only first 12 phones if not show All
    if(!isShowAll){
      phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        // console.log(phone.slug);
        // console.log(phone);
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        // 3 set  innerHTML
        phoneCard.innerHTML = `
        <figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard);

    })

  }
  else{
    console.log(phones.length);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML=`<p class='text-6xl font-bold text-center flex justify-center items-center h-10'>No data found</p>`
    const showAllContainer = document.getElementById('show-all-container');
    showAllContainer.classList.add('hidden');
  }
  // hide loading spinner
  toggleLoadingSpinner(false);
}

// 
const handleShowDetail = async(id) => {
  // console.log('id ', id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = `${phone.name}`;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt= ""/>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span>Slug:</span>${phone?.slug}</p>
    <p><span>Release data:</span>${phone?.releaseDate}</p>
    <p><span>Brand:</span>${phone?.
      brand}</p>
    <p><span>GPS:</span>${phone?.others?.GPS}</p>
  `;
  // show the modal
  show_details_modal.showModal();
}


// handle search button 
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
  
}

document.getElementById('search-field').addEventListener('keyup', (event) => {
  if(event.key === 'Enter'){
    handleSearch();
  }
})

/* const handleSearch2 = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field2');
  const searchText  = searchField.value;
  loadPhone(searchText);
} */

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

// handle show all
const handleShowAll = () => {
  handleSearch(true)
}

loadPhone();