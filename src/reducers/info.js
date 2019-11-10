let defaultInfo = {
    version: '1.8.23',
    releasedate: new Date(2019,10,6,17,54,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
