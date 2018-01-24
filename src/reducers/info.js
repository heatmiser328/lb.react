let defaultInfo = {
    version: '1.8.6',
    releasedate: new Date(2018,0,23,6,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
