let defaultInfo = {
    version: '1.9.0',
    releasedate: new Date(2021,4,4,10,06,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
