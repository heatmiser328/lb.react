let defaultInfo = {
    version: '1.0.16',
    releasedate: new Date(2018,0,5,19,45,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
