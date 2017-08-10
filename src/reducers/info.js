let defaultInfo = {
    version: '1.8.2',
    releasedate: new Date(2017,7,10,17,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
