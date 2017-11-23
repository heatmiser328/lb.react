let defaultInfo = {
    version: '1.0.15',
    releasedate: new Date(2017,10,23,8,45,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
