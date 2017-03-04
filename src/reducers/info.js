let defaultInfo = {
    version: '1.7.0',
    releasedate: new Date(2017,2,4,9,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
