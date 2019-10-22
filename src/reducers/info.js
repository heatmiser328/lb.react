let defaultInfo = {
    version: '1.8.22',
    releasedate: new Date(2019,9,22,18,13,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
