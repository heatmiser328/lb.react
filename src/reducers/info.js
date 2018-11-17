let defaultInfo = {
    version: '1.8.16',
    releasedate: new Date(2018,10,17,9,09,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
