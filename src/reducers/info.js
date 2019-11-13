let defaultInfo = {
    version: '1.8.24',
    releasedate: new Date(2019,10,13,7,18,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
