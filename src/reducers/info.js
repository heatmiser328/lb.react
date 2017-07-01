let defaultInfo = {
    version: '1.7.4',
    releasedate: new Date(2017,6,1,13,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
