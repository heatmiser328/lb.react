let defaultInfo = {
    version: '1.8.12',
    releasedate: new Date(2018,2,6,18,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
