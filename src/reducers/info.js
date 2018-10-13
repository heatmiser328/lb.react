let defaultInfo = {
    version: '1.8.14',
    releasedate: new Date(2018,9,13,8,32,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
