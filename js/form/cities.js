
function request(url) {
    return fetch(url)
        .then(res => { return res.json() })
}

export function setCities() {

    let url = 'https://api.hh.ru/areas/113';
    return request(url)
        .then(country => {
            let cities = [];
            country.areas.forEach((region) => {
                if (region.name === 'Московская область') {
                    region.areas.forEach(city => cities.push({id: city.id, city: city.name}));
                } 
                else if (region.name === 'Москва') {
                    cities.push({id: region.id, city: region.name})
                }
            })
    
            let selectCities = '';
            cities.forEach((el) => {
                selectCities += `<option class="option" id="${el.id}" ${el.city === 'Москва' ? ' selected' : ''}>${el.city}</option>`;
            });

            document
            .querySelector(".js-select-cities").innerHTML = selectCities;
            }
        );
}