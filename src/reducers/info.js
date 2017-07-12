let defaultInfo = {
    version: '1.8.0',
    releasedate: new Date(2017,6,10,14,45,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
