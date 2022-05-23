const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')

function navToggle() {
  btn.classList.toggle('open')
  nav.classList.toggle('hidden')
  document.body.classList.toggle('no-scroll')
}

btn.addEventListener('click', navToggle)

window.addEventListener('DOMContentLoaded', setup); 

function setup() {
    const options = {
        rootMargin: '0px 0px -200px 0px'
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            } else {
                return;
            }
        })
    }, options);

    const h1 = document.querySelector('h1');
    observer.observe(h1);

    const h2 = document.querySelectorAll('h2');
    h2.forEach(h2 => observer.observe(h2));

    const paras = document.querySelectorAll('p');
    paras.forEach(p => observer.observe(p));
}

    
const images = document.querySelectorAll('.anim');

observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
            entry.target.style.animation = `anim1 2s ${entry.target.dataset.delay} forwards ease-out`;
        }
        else {
            entry.target.style.animation = 'none';
        }
    })

})

images.forEach(image => {
    observer.observe(image)
})

/* Infinte scrolling */

const container = document.getElementById('container');
const loading = document.querySelector('.loading');

getPost();
getPost();
getPost();

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight });
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		// show the loading animation
		showLoading();
	}
});

function showLoading() {
	loading.classList.add('show');
	
	// load more data
	setTimeout(getPost, 1000)
}

async function getPost() {
	const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNr()}`);
	const postData = await postResponse.json();
	
	const userResponse = await fetch('https://randomuser.me/api');
	const userData = await userResponse.json();
	
	const data = { post: postData, user: userData.results[0] };
	
	addDataToDOM(data);
}

function getRandomNr() {
	return Math.floor(Math.random() * 100) + 1;
}

function addDataToDOM(data) {
	const postElement = document.createElement('div');
	postElement.classList.add('blog-post');
	postElement.innerHTML = `
		<h2 class="titleanim">${data.post.title}</h2>
		<p class="textanim">${data.post.body}</p>
		<div class="user-info">
			<img src="${data.user.picture.large}" alt="${data.user.name.first}" />
			<span>${data.user.name.first} ${data.user.name.last}</span>
		</div>
	`;
	container.appendChild(postElement);
	
	loading.classList.remove('show');
}

