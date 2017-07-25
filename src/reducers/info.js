let defaultInfo = {
    version: '1.8.1',
    releasedate: new Date(2017,6,24,18,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
