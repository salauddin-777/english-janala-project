const createElements = (arr)=>{
const htmlElements = arr.map((el)=>`<span class = "btn">${el}</span>`);
return htmlElements.join(" ");
}

const manageSpinner = (status) =>{
  if(status == true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }else{
    document.getElementById('word-container').classList.remove('hidden')
    document.getElementById('spinner').classList.add('hidden')
  }
}

const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive =()=>{
    const lessonBtn = document.querySelectorAll('.lesson-btn');
    // console.log(lessonBtn);
    lessonBtn.forEach(btn =>btn.classList.remove('active'))
}

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add('active')
        displayLevelWord(data.data)
    });
};

const loadWordDetail = async (id) =>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
}

const displayWordDetails = (word) =>{
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
      <div>
                <h2 class="font-bold text-2xl">
                  ${word.word} <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation}
                </h2>
              </div>
              <div>
                <h2 class="font-bold ">
                  Meaning 
                </h2>
                <p>${word.meaning}</p>
              </div>
              <div>
                <h2 class="font-bold ">
                  Example 
                </h2>
                <p>${word.sentence}</p>
              </div>
              <div>
                <h2 class="font-bold ">
                  Synonims 
                </h2>
                <div>${createElements(word.synonyms)}</div>
              </div>
  
  `;

  document.getElementById('word_modal').showModal();

  
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = '';

  if(words.length == 0){
    wordContainer.innerHTML = `
        <div class=" text-center col-span-full py-6 rounded-xl space-y-6 ">
          <img src="./assets/alert-error.png" class = "mx-auto" alt="">
          <p class="text-sm opacity-60 mb-4 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
          <h2 class="text-3xl font-bold f-bangla">নেক্সট Lesson এ যান</h2>
        </div>
    
    `
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-sm shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : 'শব্দ পাওয়া যায় নি '}</h2>
          <p class="font-semibold ">"${word.meaning? word.meaning : 'শব্দ পাওয়া যায় নি '} / ${word.pronunciation ? word.pronunciation : 'শব্দ পাওয়া যায় নি ' }"</p>
          <div class="text-2xl font-medium f-bangla mb-6"></div>
          <div class="flex justify-between items-center ">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info "></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high "></i></button>
          </div>
        </div>
        `;
    wordContainer.append(card);
  });
  manageSpinner(false)
};

const displayLessons = (lessons) => {
  // 1. get the container & empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get into every lessons and
  for (let lesson of lessons) {
    console.log(lesson);
    // 3.create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                </button>
    `;
    // 4. Append
    levelContainer.append(btnDiv);
  }
};
loadLesson();
