let defaultInfo = {
    version: '1.0.14',
    releasedate: new Date(2017,10,15,12,45,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
