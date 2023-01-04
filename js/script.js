const gallery = document.querySelector('.galler');
const photoContainer = document.querySelector('.photoContainer');
const nextButton = document.querySelector('.next-button')
const sokButton = document.querySelector('.sokButton');
const inputText = document.querySelector('#sok');
const inputSize = document.querySelector('#size-options');
const inputSort = document.querySelector('#sort-options');
const inputNumber = document.querySelector('#number-options');


let optionSizeValue = '';
let sortValue = '';
let imgNumberValue
let textValue = '';


function showLoading() {
    document.querySelector('.item').classList.add('show');
    const firstTL = anime.timeline({
        duration: 1000 / 8,
        complete: function () { firstTL.restart(); },
        easing: "easeOutSine"
    });

    let elements = document.querySelectorAll(".first-circles");
    for (let el of elements) {
        firstTL.add({
            begin: () => {
                anime({
                    targets: el, strokeWidth: [10, 9, 9, 10],
                    r: [20, 0, 20],
                    opacity: [1, 0, 1],
                    delay: anime.stagger(1000 / 8),
                    duration: 1000, easing: "easeOutSine",
                });
            },
        });
    }
}

function hideLoading() {
    const firstTL = anime({
        opacity: 0,
    })
}

inputSize.addEventListener('change', function (e) {
    console.log(e.target.value);
    optionSizeValue = e.target.value;
})

inputSort.addEventListener('change', function (e) {
    console.log(e.target.value);
    sortValue = e.target.value;
})

inputNumber.addEventListener('change', function (e) {
    console.log(e.target.value);
    imgNumberValue = e.target.value;
})


inputText.addEventListener('blur', (e) => {
    textValue = e.target.value;
    console.log(textValue)

})


function fetchGetData() {
    if (!textValue || !imgNumberValue || !optionSizeValue || !sortValue) return;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=604a167b9ae642e16316ac7c47e6cec4&text=${textValue}&sort=${sortValue}&per_page=${imgNumberValue}&format=json&nojsoncallback=1`;
    showLoading();
    fetch(url)
        .then(response => {

            if (response.ok) {
                return response.json();
            }

            else { throw new Error('Network response was not ok'); }
        })

        .then((result) => {
            photoContainer.innerHTML = '';
            const photoarr = result.photos.photo;

            photoarr.forEach((result) => {
                console.log(result);
                const img = document.createElement('img');

                img.src = `https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_${optionSizeValue}.jpg`;

                photoContainer.appendChild(img);

            })
            hideLoading();
        })

        .catch((error) => {
            console.log(error.name);
            alert("please try it again!")
        })
}

sokButton.addEventListener('click', (e) => {
    e.preventDefault();
    inputText.value = '';
    inputSize.value = '';
    inputSort.value = '';
    inputNumber.value = '';
    photoContainer.innerHTML = '';
    fetchGetData();
});


