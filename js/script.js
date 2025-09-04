const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = '';

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-sm shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p class="font-semibold ">"${word.meaning} / ${word.pronunciation}"</p>
          <div class="text-2xl font-medium f-bangla mb-6"></div>
          <div class="flex justify-between items-center ">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info "></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high "></i></button>
          </div>
        </div>
        `;
    wordContainer.append(card);
  });
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
                <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                </button>
    `;
    // 4. Append
    levelContainer.append(btnDiv);
  }
};
loadLesson();
