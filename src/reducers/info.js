let defaultInfo = {
    version: '1.7.2',
    releasedate: new Date(2017,5,3,11,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
