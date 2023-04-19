injectedToHtml() {
  const myData = {planet: 'earth', galaxy: 'milkyway'};
  let injectedData = `document.getElementById('container').value = '${myData.planet+myData.galaxy}';`;
  return injectedData;
 }