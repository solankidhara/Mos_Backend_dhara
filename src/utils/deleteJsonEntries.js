const deleteJsonEntries =(obj ,listToBeDeleted) => { 
    listToBeDeleted.forEach(element => {delete obj[element]});
    return obj;
}

module.exports = deleteJsonEntries