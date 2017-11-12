let defaultInfo = {
    version: '1.0.11',
    releasedate: new Date(2017,10,10,8,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
