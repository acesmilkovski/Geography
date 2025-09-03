async function fetchNames(){const response  = await fetch("https://restcountries.com/v3.1/all?fields=name");
response.json().then((data) => {
    const countryNames = data.map(country => country.name.common);
    const select = document.getElementById("country-select");
    countryNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        if(name === "North Macedonia"){
            option.textContent = "Македонија"
        }else{            
            option.textContent = name;            
        }
        select.appendChild(option);
    });
    function fetchCountryInfo() {
        const selectedCountry = select.value;
        if (!selectedCountry) {
            document.getElementById("country-info").innerHTML = "";
            return;
        }
        fetch(`https://restcountries.com/v3.1/name/${selectedCountry}?fullText=true`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const country = data[0];
                    let checkMKD = "";
                    if(country.name.common!=="North Macedonia"){
                        checkMKD = country.name.common;
                    }else{
                        checkMKD = "Македонија"
                    }
                    const countryInfoDiv = document.getElementById("country-info");
                    countryInfoDiv.style.border = "1px solid #ccc";
                    countryInfoDiv.style.padding = "15px";
                    countryInfoDiv.style.marginTop = "20px";
                    countryInfoDiv.style.borderRadius = "5px";  
                    countryInfoDiv.style.backgroundColor = "#f9f9f9";
                    countryInfoDiv.innerHTML = `
                        <h3>${checkMKD}</h3>
                        <p><strong>Главен град:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><strong>Регион:</strong> ${country.region}</p>
                        <p><strong>Популација:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Површина:</strong> ${country.area.toLocaleString()} km²</p>
                        <img src="${country.flags.png}" alt="Знаме на ${country.name.common}" style="width:100px; height:auto;"/>
                    `;
                } else {
                    document.getElementById("country-info").innerHTML = "<p>Информации за земјата не се достапни.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching country info:", error);
                document.getElementById("country-info").innerHTML = "<p>Грешка при вчитување на информациите за земјата.</p>";
            });
    }
    window.fetchCountryInfo = fetchCountryInfo;
}).catch((error) => {
    console.error("Error fetching country names:", error);
})};
fetchNames();
