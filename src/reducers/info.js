let defaultInfo = {
    version: '1.8.15',
    releasedate: new Date(2018,10,11,11,38,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
