let defaultInfo = {
    version: '1.8.7',
    releasedate: new Date(2018,0,25,6,44,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
