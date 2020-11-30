function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let lat = document.getElementById('lat').value;
  let lon = document.getElementById('lon').value;
  // Client.checkForName(zipCode);

  console.log('::: Form Submitted :::');
  postData('/coordinateData', {
    lat: lat,
    lon: lon,
  }).then(function (res) {
    console.log(res);
    var allData = JSON.stringify(res);
    console.log(allData);
    document.getElementById(
      'resultsTemp'
    ).innerHTML = `Temp: ${res.main.temp}<sup>o</sup> C`;
    document.getElementById('resultsName').innerHTML = res.name;
    document.getElementById('resultsCountry').innerHTML = res.sys.country;
  });
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
  console.log('postData', data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

export { handleSubmit };
