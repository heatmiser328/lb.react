let defaultInfo = {
    version: '1.8.21',
    releasedate: new Date(2019,9,10,18,4,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
