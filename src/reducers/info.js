let defaultInfo = {
    version: '1.8.19',
    releasedate: new Date(2018,11,25,9,28,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
