const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length){
  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';
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
                    <div class="card-body items-center text-center">
                      <h2 class="card-title text-[26px]">${phone.phone_name}</h2>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary mt-4">Show Details</button>
                      </div>
                    </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard);

    })

  }
  else{
    console.log(phones.length);
    phoneContainer.innerHTML=`<p class='text-4xl font-bold w-[96rem] mx-auto mt-48 text-center'>No phone available by this name ☹</p>`
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
  phoneName.innerHTML = `<h2 class='text-3xl my-4 text-center'> ${phone.name} </h2>`;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <div class="relative w-[25rem] h-[18rem] mx-auto bg-[#F3F7FF]">
    <img class="absolute top-[2.25rem] left-[7.25rem]" src="${phone.image}" alt= ""/>
    </div>
    <div class="mt-8">
    <p class="my-2"><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p class="my-2"><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p class="my-2"><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p class="my-2"><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p class="my-2"><span class="font-bold">Slug: </span>${phone?.slug}</p>
    <p class="my-2"><span class="font-bold">Release data: </span>${phone?.releaseDate || "Not found"}</p>
    <p class="my-2"><span class="font-bold">Brand: </span>${phone?. brand}</p>
    <p class="my-2"><span class="font-bold">GPS: </span>${phone?.others?.GPS || "Not available"}</p>
    </div>
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