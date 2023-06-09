import {
    movies
} from "../modules/db.js";

let header = document.querySelector('header')
let ul = document.querySelector('.promo__interactive-list')
let promo__bg = document.querySelector('.promo__bg')
let promo__genre_modal = document.querySelector(".promo__genre_modal");
let promo__title_modal = document.querySelector(".promo__title_modal");
let promo__descr_modal = document.querySelector(".promo__descr_modal")
let promo__genre = document.querySelector(".promo__genre");
let promo__title = document.querySelector(".promo__title");
let promo__descr = document.querySelector(".promo__descr")
let imdb = document.querySelector(".imdb");
let reserch = document.querySelector(".reserch");
let search = document.querySelector('#search')
let genUl = document.querySelector('.genresUl')
let genres_arr = ['All']

let form = document.forms.search
form.onsubmit = (event) => {
    event.preventDefault()

    let filtered = movies.filter(item => {
        let title = item.Title.toLowerCase()
        let value = search.value.toLowerCase().trim()

        if(title.includes(value)) {
            return item
        }
    })

    reload(filtered)
}

let modal = document.querySelector('.popup')


function reload(arr) {
    ul.innerHTML = ""
    changeFilm(arr[0])

    arr.forEach((movie, index) => {
        genres_arr.push(movie.Genre)

        let li = document.createElement('li')
        let del = document.createElement('div')

        li.innerHTML = (arr.indexOf(movie) + 1) + '. ' + movie.Title
        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            changeFilm(movie)
            modal.style.display = 'block'
            setTimeout(() => {
               modal.style.opacity = '1'
            }, 200)
        }
        header.onclick = () => {
            modal.style.opacity = '0'
            setTimeout(() => {
                modal.style.display = 'none'
            }, 200)
        }
        modal.onclick = () => {
            modal.style.opacity = '0'
            setTimeout(() => {
                modal.style.display = 'none'
            }, 200)
        }
       
        
    });

}
reload(movies)
let btns = document.querySelectorAll(".promo__menu-item")
function changeFilm(props) {
    promo__bg.style.backgroundImage = `url("${props.Poster}")`
    promo__genre.innerHTML = props.Genre
    promo__title.innerHTML = props.Title
    promo__descr.innerHTML = props.Plot
    imdb.innerHTML = "Year: "+ props.Year
    reserch.innerHTML = "Time: "+ props.Runtime
    modal.style.backgroundImage = `url(${props.Poster})`
    promo__genre_modal.innerHTML = props.Genre
    promo__title_modal.innerHTML = props.Title
    promo__descr_modal.innerHTML = props.Actors
}

btns.forEach(btn => {
    btn.onclick = () => {
        btns.forEach(btn => {
            btn.classList.remove('promo__menu-item_active')
        })
        btn.classList.add('promo__menu-item_active')
    }
    
})

genres_arr = [...new Set(genres_arr)]

generateGenres(genres_arr)
function generateGenres(arr) {
    genUl.innerHTML = ""

    for(let item of arr) {
        let li = document.createElement('li')
        let a = document.createElement('a')

        if(arr.indexOf(item) === 0 ) {
            a.classList.add('promo__menu-item_active')
        }

        a.classList.add('promo__menu-item')
        a.href = "#"
        a.innerHTML = item


        li.append(a)
        genUl.append(li)

        li.onclick = () => {
            genUl.childNodes.forEach(elem => elem.firstChild.classList.remove('promo__menu-item_active'))

            li.firstChild.classList.add('promo__menu-item_active')


            let filtered = movies.filter(elem => {
                let genre = elem.Genre.toLowerCase()
                if(item.toLowerCase() === genre) {
                    return elem
                } else if(item.toLowerCase() === 'all') {
                    reload(movies)
                }
            })


            if(filtered.length > 0) reload(filtered)
        }

    }
}

let addBlock = document.querySelector('.promo__adv')
addBlock.innerHTML = ' '

