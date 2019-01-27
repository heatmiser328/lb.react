let defaultInfo = {
    version: '1.8.20',
    releasedate: new Date(2019,0,27,9,10,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
