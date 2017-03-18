let defaultInfo = {
    version: '1.7.1',
    releasedate: new Date(2017,2,18,10,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
