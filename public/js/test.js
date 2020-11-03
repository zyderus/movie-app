const uls1 = document.querySelectorAll('.data-list1');
const uls2 = document.querySelectorAll('.data-list2');
const uls3 = document.querySelectorAll('.data-list3');
const uls4 = document.querySelectorAll('.data-list4');

const getData1 = async () => {
  try {
    const response = await fetch('/api/movies/trending');
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

const results = await getData1().results;

console.log(results);


uls1.innerHTML