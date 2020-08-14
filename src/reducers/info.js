let defaultInfo = {
    version: '1.8.27',
    releasedate: new Date(2020,5,20,8,10,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
