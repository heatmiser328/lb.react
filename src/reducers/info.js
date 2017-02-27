let defaultInfo = {
    version: '1.6.0',
    releasedate: new Date(2017,1,25,16,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
