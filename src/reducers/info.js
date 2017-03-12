let defaultInfo = {
    version: '1.0.8',
    releasedate: new Date(2017,2,12,11,45,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
