let defaultInfo = {
    version: '1.0.17',
    releasedate: new Date(2018,1,10,8,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
