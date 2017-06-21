let defaultInfo = {
    version: '1.7.3',
    releasedate: new Date(2017,5,20,19,45,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
